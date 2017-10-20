import React, { Component } from 'react';
import * as d3 from 'd3';
import {
    saturateZeroOne,
    saturatePercentage
} from '../../helpers/saturateValue';

export default class KnobParameter extends Component {
    state = {
        isDragging: false
    };

    /**
     * HINT: The following method (renderKnob) lets D3
     * do all the rendering, so that transforms and such are
     * still available. The preffered way however is to let React take over the
     * rendering, inside of the render method, with some of the svg already 
     * handwritten.
     */
    renderKnob(saturatedValue) {
        //HINT: // http://tauday.com/tau-manifesto
        const tau = 2 * Math.PI;
        this.arc = d3
            .arc()
            .innerRadius(24)
            .outerRadius(34)
            .startAngle(0);

        const container = d3.select(this.node);
        container.style('background-color', '#585858');
        const width = container.attr('width');
        const height = container.attr('height');

        const donut = container
            .append('g')
            .attr('transform', `translate(${width / 2}, 40)`)
            .on('mouseover', function(data, i) {
                d3.select(this).style('cursor', 'pointer');
            })
            .on('mouseout', function(data, i) {
                d3.select(this).style('cursor', 'pointer');
                parameter.transition().style('fill', '#7f7f7f');
            });

        //TODO: KILL EVENT ON MOUSE OUT CONTAINER
        let prevMouse = 0;
        container
            .on('mousedown', () => {
                d3.event.preventDefault();
                this.setState({
                    isDragging: true
                });
            })
            .on('mouseover', () => {
                this.valueEl.transition().style('fill', '#fff');
                parameter.transition().style('fill', '#fff');
            })
            .on('mousemove', () => {
                if (!this.state.isDragging) return;
                d3.event.preventDefault();
                const percentage = saturatePercentage(
                    this.props.min,
                    this.props.max,
                    this.props.value
                );
                const oneth = this.props.max / 100;

                /**
                 * HINT: If there is pos or neg movement and if the current value
                 * is within the parameter boundaries (min/max)
                 * FIXME: Param freezes when on min or max value
                 */
                const isInsideParameterBoundaries =
                    this.props.value < this.props.max &&
                    this.props.value > this.props.min;
                const hasMovedVertical =
                    d3.event.movementY < 0 || d3.event.movementY > 0;
                if (isInsideParameterBoundaries && hasMovedVertical) {
                    // HINT: 1 / 100th of circle value (min and max) times movementY (times step prop?)
                    const addToValue = oneth * d3.event.movementY * 1;
                    this.props.setParameter(
                        this.props.module,
                        this.props.param,
                        this.props.value + addToValue
                    );
                }

                // console.log(mouse[0] - prevMouse);
            })
            .on('mouseup', () => {
                this.setState({
                    isDragging: false
                });
            })
            .on('mouseout', () => {
                d3.event.stopPropagation();
                parameter.transition().style('fill', '#7f7f7f');
                this.valueEl.transition().style('fill', '#7f7f7f');
            });

        const background = donut
            .append('path')
            .datum({ endAngle: tau })
            .style('fill', '#142c37')
            .attr('d', this.arc);

        this.foreground = donut
            .append('path')
            .datum({
                endAngle: saturatedValue * tau
            })
            .style('fill', '#3b819f')
            .attr('d', this.arc);

        const parameter = container
            .append('text')
            .attr('fill', '#7f7f7f')
            .style('text-anchor', 'middle')
            .attr('y', 90)
            .attr('font-family', 'Rubik Medium')
            .style('text-transform', 'uppercase')
            .style('letter-spacing', '1px')
            .style('font-size', '0.7em')
            .text(() => this.props.param);
        parameter.attr('x', width / 2 - parameter.attr('width') / 2);

        this.valueEl = container
            .append('text')
            .attr('fill', '#7f7f7f')
            .style('text-anchor', 'middle')
            .text(() => parseFloat(this.props.value).toFixed(2))
            .attr('font-family', 'Rubik Light')
            .style('font-size', '0.6em');

        this.valueEl.attr(
            'y',
            donut.node().getBBox().height / 2 +
                this.valueEl.node().getBBox().height / 1.3
        );
        this.valueEl.attr('x', width / 2 - this.valueEl.attr('width') / 2);
    }

    updateKnob(saturatedValue, { value }) {
        const tau = 2 * Math.PI;
        this.foreground
            .transition()
            .duration(350)
            .ease(d3.easeSinOut)
            .attrTween('d', d => {
                const interpolate = d3.interpolate(
                    d.endAngle,
                    saturatedValue * tau
                );

                return t => {
                    d.endAngle = interpolate(t);
                    return this.arc(d);
                };
            });
        this.valueEl.text(() => parseFloat(value).toFixed(2));
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

    render() {
        return (
            <svg width={100} height={110} ref={node => (this.node = node)} />
        );
    }
}
