import React, { Component } from 'react';
import { NumberParameter } from '../Parameters';
import styled from 'styled-components';
import times from 'lodash/times';

const StyledStepSequencer = styled.div`
    width: calc(${props => props.steps} * ${props => props.cellSize}px);
    height: calc(${props => props.notes} * ${props => props.cellSize}px);
    display: grid;
    grid-gap: 1px;

    grid-template-columns: repeat(
        ${props => props.steps},
        ${props => props.cellSize}px
    );

    grid-template-rows: repeat(
        ${props => props.notes},
        ${props => props.cellSize}px
    );
`;

const StyledNote = styled.div`border: 1px solid #000;`;

const StepSequencer = ({ steps, notes, cellSize }) => (
    <StyledStepSequencer steps={steps} notes={notes} cellSize={cellSize}>
        {times(steps * notes, i => <Note key={i} />)}
    </StyledStepSequencer>
);

const Note = ({ ...props }) => <StyledNote />;

export default class Sequencer extends Component {
    componentDidMount() {
        const steps = 16;
        let stepCounter = 0;
        this.props.transport.schedule(time => {
            stepCounter++;
            stepCounter = stepCounter % steps;
            console.log(stepCounter);
        }, 0);

        this.props.transport.start();
    }

    componentWillUnmount() {
        this.props.transport.stop();
    }

    render() {
        const { transport, updateParameter } = this.props;
        return (
            <div>
                <h2>Sequencer</h2>
                <NumberParameter
                    param="bpm"
                    module="transport"
                    value={transport.bpm.value}
                    updateParameter={updateParameter}
                    step={0.01}
                />
                <StepSequencer steps={16} notes={8} cellSize={30} />
            </div>
        );
    }
}
