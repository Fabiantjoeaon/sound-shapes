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
        props.row === props.currentStep ? 'rgba(0,0,0,0.3)' : 'white'};

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.6);
    }

    &.active {
        background-color: rgba(0, 0, 255, 0.6);
    }
`;

const StepSequencer = ({ steps, notes, ...rest }) => (
    <StyledStepSequencer steps={steps} notes={notes} {...rest}>
        {times(steps * notes, i => (
            <Step key={i} steps={steps} i={i} {...rest} />
        ))}
    </StyledStepSequencer>
);

class Step extends Component {
    state = {
        active: 0
    };

    render() {
        const { i, steps, currentStep } = this.props;
        const { active } = this.state;
        return (
            <StyledStep
                row={i % steps}
                currentStep={currentStep}
                onClick={e => this.setState({ active: !active })}
                className={active ? 'active' : null}
            />
        );
    }
}

export default class Sequencer extends Component {
    state = {
        steps: 16,
        currentStep: 0
    };

    componentDidMount() {
        let stepCounter = 0;
        this.props.transport.schedule(time => {
            const currentStep = stepCounter++ % this.state.steps;
            this.setState({ currentStep });
        }, '0:0:1');

        this.props.transport.start();
    }

    componentWillUnmount() {
        this.props.transport.stop();
    }

    render() {
        // TODO: This must become array with notes, based on octave,
        // fetched from big multidimensional array (octave 1> note, note, octave 2> etc)
        // TODO: Maybe octave reducer and master octave switch that controls keyboard as well as sequencer
        // TODO: If switching both at the same time is cumbersome try having 2 octave states for keyboard
        // and sequencer, and fetch notes from one big array
        //TODO: pass current notes array as prop to <Note/>, and then find key by modulo?
        //TODO: Then play the note in <Note /> when active
        //TODO: Also try not to render new notes but switch the props when switching octaves
        const { transport, updateParameter } = this.props;
        return (
            <div>
                <h2>Sequencer</h2>
                <NumberParameter
                    param="bpm"
                    module="transport"
                    value={transport.bpm.value}
                    updateParameter={updateParameter}
                    step={1}
                    min={60}
                    max={260}
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
