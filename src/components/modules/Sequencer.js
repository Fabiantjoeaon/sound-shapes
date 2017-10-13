import React, { Component } from 'react';
import { NumberParameter } from '../Parameters';
import styled from 'styled-components';
import times from 'lodash/times';

const StyledStepSequencer = styled.div`
    //FIXME: width + gap??
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

const StyledStep = styled.div`
    border: 1px solid #000;

    background-color: ${props =>
        props.row === props.currentStep ? 'rgba(0,0,0,0.6)' : 'white'};
`;

const StepSequencer = ({ steps, notes, cellSize, currentStep }) => {
    const total = steps * notes;
    return (
        <StyledStepSequencer steps={steps} notes={notes} cellSize={cellSize}>
            {times(total, i => (
                <StyledStep
                    step={i}
                    row={i % steps}
                    currentStep={currentStep}
                    key={i}
                />
            ))}
        </StyledStepSequencer>
    );
};

const Step = ({ ...props }) => <StyledStep />;

export default class Sequencer extends Component {
    state = {
        steps: 16,
        currentStep: 0
    };

    componentDidMount() {
        let stepCounter = 0;
        this.props.transport.schedule(time => {
            stepCounter++;
            stepCounter = stepCounter % this.state.steps;
            this.setState({ currentStep: stepCounter });
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
                <StepSequencer
                    steps={this.state.steps}
                    notes={8}
                    cellSize={30}
                    currentStep={this.state.currentStep}
                />
            </div>
        );
    }
}
