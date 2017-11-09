import React, { Component } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

import {
    saturateZeroOne,
    saturatePercentage
} from '../../helpers/saturateValue';
import config from '../../synth/config';
import calculateAngle from '../../helpers/calculateAngle';

const { colors } = config;
const StyledSVG = styled.svg`
    width: ${props => props.styledWidth}%;
    height: ${props => props.styledHeight}%;
`;

export default class KnobParameter extends Component {
    constructor() {
        super();
        this.tau = 2 * Math.PI;
        this.center = {};
    }

    state = {
        isDragging: false
    };

    calculateMouseAngle(mouse) {
        return calculateAngle(
            mouse[0] - this.center.x,
            this.center.y - mouse[1]
        );
    }

    fixFloatValue(val) {
        return val % 1 === 0 ? val : parseFloat(val).toFixed(2);
    }

    handleDonutMouseClick = mouse => {
        // Calculate angle clicked
        const angle = this.calculateMouseAngle(mouse);
        const percentageFromAngle = saturatePercentage(0, 360, angle);
        /**
         * Calculate the total available values going 
         * from min to max (for -100 to 100 this would be 200)
         */
        const total =
            this.props.min < 0
                ? this.props.max + Math.abs(this.props.min)
                : this.props.max - this.props.min;

        const calculatedValueFromPercentage =
            percentageFromAngle * (total / 100);

        // If min is under 100 it should be added from there and not from zero
        const value = this.props.min + calculatedValueFromPercentage;

        this.props.setParameter(this.props.module, this.props.param, value);
    };

    handleContainerMouseMoveDrag = () => {
        d3.event.preventDefault();
        const { max, min, value, setParameter, module, param } = this.props;
        // const percentage = saturatePercentage(min, max, value);
        const oneth = max / 100;

        /**
         * HINT: If there is pos or neg movement and if the current value
         * is within the parameter boundaries (min/max)
         * FIXME: Param freezes when on min or max value
         */
        const isBelowMax = value <= max;
        const isAboveMin = value >= min;
        const isInsideParameterBoundaries = isBelowMax && isAboveMin;

        if (!isInsideParameterBoundaries)
            setParameter(module, param, !isBelowMax ? max : min);

        const hasMovedVertically =
            d3.event.movementY < 0 || d3.event.movementY > 0;
        const hasMovedHorizontally =
            d3.event.movementX < 0 || d3.event.movementX > 0;

        if (
            isInsideParameterBoundaries &&
            (hasMovedHorizontally || hasMovedVertically)
        ) {
            const movement = hasMovedHorizontally
                ? d3.event.movementX * -1
                : hasMovedVertically ? d3.event.movementY : 0;

            // HINT: 1 / 100th of circle value (min and max) times movementY (times step prop?)
            const addToValue = oneth * movement;

            setParameter(module, param, value + addToValue);
        }
    };

    /**
     * HINT: The following method (renderKnob) lets D3
     * do all the rendering, so that transforms and such are
     * still available. The preffered way however is to let React take over the
     * rendering, inside of the render method, with some of the svg already 
     * typed out.
     */
    renderKnob(saturatedValue) {
        const self = this;
        const innerRadius = 19;
        const outerRadius = 26;
        this.arc = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0);

        // CONTAINER
        const container = d3.select(this.node);
        const width = parseFloat(container.style('width'));
        // DONUT
        const donut = container
            .append('g')
            .attr('transform', `translate(${width / 2}, 40)`)
            .on('mouseover', function(data, i) {
                d3.select(this).style('cursor', 'crosshair');
            })
            .on('mouseout', function(data, i) {
                d3.select(this).style('cursor', 'pointer');
                parameter.transition().style('fill', colors.darkGray);
            })
            .on('click', function() {
                self.handleDonutMouseClick(d3.mouse(this));
            });

        this.center = {
            x: donut.attr('width') / 2,
            y: donut.attr('height') / 2
        };

        container
            .on('mousedown', () => {
                d3.event.preventDefault();
                this.setState({
                    isDragging: true
                });
            })
            .on('mouseover', function() {
                d3.select(this).style('cursor', 'all-scroll');
                self.valueEl.transition().style('fill', colors.lightGray);
                parameter.transition().style('fill', colors.lightGray);
            })
            .on('mousemove', () => {
                if (!this.state.isDragging) return;

                this.handleContainerMouseMoveDrag();
            })
            .on('mouseup', () => {
                this.setState({
                    isDragging: false
                });
            })
            .on('mouseleave', () => {
                d3.event.stopPropagation();
                parameter.transition().style('fill', colors.darkGray);
                this.valueEl.transition().style('fill', colors.darkGray);
                this.setState({
                    isDragging: false
                });
            });

        // BACKGROUND
        donut
            .append('path')
            .datum({
                endAngle: this.tau
            })
            .style('fill', 'rgba(0,0,0,0.2)')
            .attr('d', this.arc);

        // FOREGROUND
        this.foreground = donut
            .append('path')
            .datum({
                endAngle: saturatedValue * this.tau
            })
            .style('fill', `rgba(${colors.primary}, 1)`)
            .attr('d', this.arc);

        // DONUT LINE
        this.lineArc = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle((saturatedValue - 0.003) * this.tau);

        // PARAMETER TEXT
        const parameter = container
            .append('text')
            .attr('fill', colors.darkGray)
            .style('text-anchor', 'middle')
            .attr('y', 81)
            .attr('font-family', 'Rubik Light')
            .style('letter-spacing', '1px')
            .style('font-size', '0.55em')
            .text(() => (this.props.name ? this.props.name : this.props.param));
        parameter.attr('x', width / 2 - parameter.attr('width') / 2);

        // VALUE TEXT
        this.valueEl = container
            .append('text')
            .attr('fill', colors.darkGray)
            .style('text-anchor', 'middle')
            .text(() => this.fixFloatValue(this.props.value))
            .attr('font-family', 'Rubik Light')
            .style('font-size', '0.45em');

        this.valueEl.attr(
            'y',
            donut.node().getBBox().height / 2 +
                this.valueEl.node().getBBox().height / 0.55
        );
        this.valueEl.attr('x', width / 2 - this.valueEl.attr('width') / 2);
    }

    updateKnob(saturatedValue, { value }) {
        const self = this;
        this.foreground
            .transition()
            .duration(900)
            .ease(d3.easePolyOut)
            .attrTween('d', d => {
                const interpolate = d3.interpolate(
                    d.endAngle,
                    saturatedValue * this.tau
                );

                return t => {
                    d.endAngle = interpolate(t);
                    return this.arc(d);
                };
            });

        this.valueEl
            .transition()
            .duration(850)
            .ease(d3.easeSinOut)
            .tween('text', function() {
                const nextValue = self.fixFloatValue(value);
                const interpolate = d3.interpolate(this.textContent, nextValue);
                const prec = (nextValue + '').split('.');
                const round =
                    prec.length > 1 ? Math.pow(10, prec[1].length) : 1;

                return t => {
                    this.textContent =
                        Math.round(interpolate(t) * round) / round;
                };
            });
    }

    componentDidMount() {
        const saturatedValue = saturateZeroOne(
            this.props.min,
            this.props.max,
            this.props.value
        );

        this.renderKnob(saturatedValue);
    }

    componentWillUpdate(nextProps, nextState) {
        const saturatedValue = saturateZeroOne(
            this.props.min,
            this.props.max,
            nextProps.value
        );
        this.updateKnob(saturatedValue, nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.value !== this.props.value;
    }

    render() {
        return (
            <StyledSVG
                styledWidth={this.props.width}
                styledHeight={this.props.height}
                innerRef={node => (this.node = node)}
            />
        );
    }
}
