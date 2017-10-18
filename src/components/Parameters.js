import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

import withParameter from './HOC/withParameter';

const StyledKnobParameter = styled.input`
    -webkit-appearance: none;
    width: 200px;
    background-color: red;

    &::-webkit-slider-thumb {
    }

    &:focus {
        outline: none;
    }

    &::-ms-track {
        cursor: pointer;

        /* Hides the slider so custom styles can be added */
        background: transparent;
        border-color: transparent;
        color: transparent;
    }
`;

const KnobParameter = withParameter(({ ...props }) => (
    <input type="range" {...props} />
));

const SwitchParameter = withParameter(({ ...props }) => <select {...props} />);

const NumberParameter = withParameter(({ ...props }) => (
    <input type="number" {...props} />
));

class TestParameter extends Component {
    state = {
        isDragging: false
    };

    componentDidMount() {
        //TODO: Use scales ? https://www.dashingd3js.com/d3js-scales
        //HINT: // http://tauday.com/tau-manifesto
        const saturatedValue =
            (this.props.value - this.props.min) *
            100 /
            (this.props.max - this.props.min) /
            100;

        const tau = 2 * Math.PI;
        const arc = d3
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
            })
            .on('mousedown', () => {
                d3.event.preventDefault();
                this.setState({
                    isDragging: true
                });
            });

        let prevMouse = 0;
        container
            .on('mouseover', () => {
                value.transition().style('fill', '#fff');
                parameter.transition().style('fill', '#fff');
            })
            .on('mousemove', () => {
                d3.event.preventDefault();
                if (!this.state.isDragging) return;
                const mouse = d3.mouse(container.node());
                //TODO: Add (or dispatch param action)
                // with 1 / 100th of circle value times movementX ?
                console.log(d3.event.movementX);

                // console.log(mouse[0] - prevMouse);
            })
            .on('mouseup', () => {
                this.setState({
                    isDragging: false
                });
            })
            .on('mouseout', () => {
                parameter.transition().style('fill', '#7f7f7f');
                value.transition().style('fill', '#7f7f7f');
            });

        const background = donut
            .append('path')
            .datum({
                endAngle: tau
            })
            .style('fill', '#142c37')
            .attr('d', arc);

        const foreground = donut
            .append('path')
            .datum({
                endAngle: saturatedValue * tau
            })
            .style('fill', '#3b819f')
            .attr('d', arc);

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

        const value = container
            .append('text')
            .attr('fill', '#7f7f7f')
            .style('text-anchor', 'middle')
            .text(() => parseFloat(this.props.value).toFixed(2))
            .attr('font-family', 'Rubik Light')
            .style('font-size', '0.6em');

        value.attr(
            'y',
            donut.node().getBBox().height / 2 +
                value.node().getBBox().height / 1.3
        );
        value.attr('x', width / 2 - value.attr('width') / 2);
    }

    componentDidUpdate() {
        //TODO: Reset arc
    }

    render() {
        return (
            <svg width={100} height={110} ref={node => (this.node = node)} />
        );
    }
}

export { KnobParameter, SwitchParameter, NumberParameter, TestParameter };
