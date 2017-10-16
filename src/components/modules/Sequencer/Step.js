import React, { PureComponent } from 'react';
import styled from 'styled-components';

const StyledStep = styled.div`
    border: 1px solid #000;

    background-color: ${props =>
        props.column === props.stepAhead ? 'rgba(0,0,0,0.3)' : 'white'};

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.6);
    }

    &.active {
        background-color: rgba(0, 0, 255, 0.6);
    }
`;

/**
 * HINT: PureComponent is a component that implements
 * componentShouldUpdate() with a shallow
 * prop and state comparison
 */
export default class Step extends PureComponent {
    state = {
        active: 0
    };

    componentWillUpdate() {
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
        const { currentStep, note, column, addToSequence, steps } = this.props;
        const { active } = this.state;
        //FIXME: step ahead should be last index of array
        const stepAhead = currentStep - 1;

        return (
            <StyledStep
                column={column}
                stepAhead={stepAhead}
                onClick={e => this.setState({ active: !active })}
                className={active ? 'active' : null}
            />
        );
    }
}
