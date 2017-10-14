import React, { Component } from 'react';
import styled from 'styled-components';

const StyledStep = styled.div`
    border: 1px solid #000;

    background-color: ${props =>
        props.column === props.currentStep ? 'rgba(0,0,0,0.3)' : 'white'};

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.6);
    }

    &.active {
        background-color: rgba(0, 0, 255, 0.6);
    }
`;

export default class Step extends Component {
    state = {
        active: 0
    };

    componentWillReceiveProps() {
        const { active } = this.state;
        const { synth, currentStep, column, note } = this.props;
        if (active && currentStep === column) {
            synth.oscillatorA.frequency.value = note;
            synth.oscillatorB.frequency.value = note;
            synth.ampEnvelope.triggerAttackRelease('16n');
            synth.filterEnvelope.triggerAttackRelease('16n');
            synth.noise.start();
        }
    }

    render() {
        const { currentStep, note, column, addToSequence } = this.props;
        const { active } = this.state;

        return (
            <StyledStep
                column={column}
                currentStep={currentStep}
                onClick={e => this.setState({ active: !active })}
                className={active ? 'active' : null}
            />
        );
    }
}
