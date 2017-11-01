import React, { Component } from 'react';
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

export default class Step extends Component {
    //FIXME: for performance win, only the next column should be updated, and the one before
    // shouldComponentUpdate(nextProps, nextState) {
    //     return (
    //         !(nextProps.currentStep === this.props.column) ||
    //         !(nextProps.currentStep + 1 === this.props.column) ||
    //         nextProps.currentStep - 1 === this.props.column ||
    //         !(nextState.active === this.state.active)
    //     );
    // }

    // componentDidUpdate() {
    //     console.log('did update', this.props.column);
    // }

    componentWillUpdate() {
        const { synth, currentStep, column, note, activeNotes } = this.props;
        if (activeNotes.includes(note) && currentStep === column) {
            synth.oscillatorA.frequency.value = note;
            synth.oscillatorB.frequency.value = note;
            synth.ampEnvelope.triggerAttackRelease('16n');
            synth.filterEnvelope.triggerAttackRelease('16n');
            synth.noise.start();
        }
    }

    render() {
        const {
            currentStep,
            note,
            column,
            addToSequence,
            steps,
            activateNote,
            activeNotes,
            deactivateNote
        } = this.props;

        const active = activeNotes.find(
            activeNote => activeNote.note == note && activeNote.column == column
        );

        const stepAhead = currentStep - 1 === -1 ? steps - 1 : currentStep - 1;

        return (
            <StyledStep
                column={column}
                stepAhead={stepAhead}
                onClick={e =>
                    active
                        ? deactivateNote({ note, column })
                        : activateNote({ note, column })}
                className={active ? 'active' : null}
            />
        );
    }
}
