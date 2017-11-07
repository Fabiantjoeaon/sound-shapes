import React, { Component } from 'react';
import * as d3 from 'd3';
import {
    saturateZeroOne,
    saturatePercentage
} from '../../helpers/saturateValue';

import calculateAngle from '../../helpers/calculateAngle';

export default class KnobParameter extends Component {
    constructor() {
        super();
        this.sensitivity = 1;
        this.tau = 2 * Math.PI;
        this.center = {};
        this.foreGroundColor = '247, 182, 136';
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

        // If min is under 100 it should be added from there and not from zero
        const calculatedValueFromPercentage =
            percentageFromAngle * (total / 100);

        const value = this.props.min + calculatedValueFromPercentage;

        this.props.setParameter(this.props.module, this.props.param, value);
    };

    handleContainerMouseMoveDrag = () => {
        d3.event.preventDefault();
        const {
            sensitivity,
            max,
            min,
            value,
            setParameter,
            module,
            param
        } = this.props;
        const percentage = saturatePercentage(min, max, value);
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
        const innerRadius = 24;
        const outerRadius = 34;
        this.arc = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0);

        // CONTAINER
        const container = d3.select(this.node);
        // container.style('background-color', '#585858');
        const width = container.attr('width');
        const height = container.attr('height');

        // DONUT
        // const handleDonutMouseMove = this.handleDonutMouseMove;
        const handleDonutMouseClick = this.handleDonutMouseClick;
        const donut = container
            .append('g')
            .attr('transform', `translate(${width / 2}, 46)`)
            .on('mouseover', function(data, i) {
                d3.select(this).style('cursor', 'pointer');
            })
            .on('mouseout', function(data, i) {
                d3.select(this).style('cursor', 'pointer');
                parameter.transition().style('fill', '#7f7f7f');
            })
            .on('click', function() {
                handleDonutMouseClick(d3.mouse(this));
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
            .on('mouseover', () => {
                this.valueEl.transition().style('fill', '#f79139');
                parameter.transition().style('fill', '#f79139');
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
                parameter.transition().style('fill', '#7f7f7f');
                this.valueEl.transition().style('fill', '#7f7f7f');
                this.setState({
                    isDragging: false
                });
            });

        // BACKGROUND
        const background = donut
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
            .style('fill', `rgba(${this.foreGroundColor}, 1)`)
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
            .attr('fill', '#7f7f7f')
            .style('text-anchor', 'middle')
            .attr('y', 98)
            .attr('font-family', 'Rubik Medium')
            .style('text-transform', 'uppercase')
            .style('letter-spacing', '1px')
            .style('font-size', '0.7em')
            .text(() => (this.props.name ? this.props.name : this.props.param));
        parameter.attr('x', width / 2 - parameter.attr('width') / 2);

        // VALUE TEXT
        this.valueEl = container
            .append('text')
            .attr('fill', '#7f7f7f')
            .style('text-anchor', 'middle')
            .text(
                () =>
                    this.props.value % 1 == 0
                        ? this.props.value
                        : parseFloat(this.props.value).toFixed(2)
            )
            .attr('font-family', 'Rubik Light')
            .style('font-size', '0.6em');

        this.valueEl.attr(
            'y',
            donut.node().getBBox().height / 2 +
                this.valueEl.node().getBBox().height / 0.8
        );
        this.valueEl.attr('x', width / 2 - this.valueEl.attr('width') / 2);
    }

    updateKnob(saturatedValue, { value }) {
        this.foreground
            .transition()
            .duration(350)
            .ease(d3.easeSinOut)
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
        this.valueEl.text(
            () => (value % 1 == 0 ? value : parseFloat(value).toFixed(2))
        );
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
            <svg width={100} height={110} ref={node => (this.node = node)} />
        );
    }
}
