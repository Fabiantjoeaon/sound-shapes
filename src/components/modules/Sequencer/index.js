import React, {Component} from 'react';
import styled from 'styled-components';

import StepSequencer from './StepSequencer';
import StyledModule from '../../styled/StyledModule';

const StyledControls = styled.div `
    display: flex;
    flex-flow: row nowrap;
    justify-content: start;
`;

const StyledSequencerModule = styled(StyledModule)`
    justify-content: start;
    padding-top: 10px;
`;
export default class Sequencer extends Component {
    state = {
        bars: 2,
        steps: 8,
        currentStep: 0,
        isPlaying: true,
        activeNotes: []
    };

    activateNote = note => this.setState({
        activeNotes: [
            ...this.state.activeNotes,
            note
        ]
    });

    deactivateNote = ({note, column}) => {
        const index = this
            .state
            .activeNotes
            .findIndex(n => n.note === note && n.column === column);

        const activeNotes = this.state.activeNotes;
        activeNotes.splice(index, 1);
        this.setState({activeNotes});
    };

    playNote(note) {
        const {synth} = this.props;
        synth.oscillatorA.frequency.value = note;
        synth.oscillatorB.frequency.value = note;
        synth
            .ampEnvelope
            .triggerAttackRelease('16n');
        synth
            .filterEnvelope
            .triggerAttackRelease('16n');
        synth
            .noise
            .start();
    }

    componentDidMount() {
        let stepCounter = 0;

        this
            .props
            .synth
            .transport
            .scheduleRepeat(time => {
                const currentStep = stepCounter++ % (this.state.steps * this.state.bars);
                this.setState({currentStep});
            }, '0:0:1');
        this
            .props
            .synth
            .transport
            .start();
    }

    componentWillUnmount() {
        this
            .props
            .synth
            .transport
            .stop();
    }

    componentWillUpdate(nextProps, nextState) {
        const {synth} = this.props;
        const {activeNotes, currentStep} = this.state;
        nextState.isPlaying
            ? synth
                .transport
                .start()
            : synth
                .transport
                .stop();

        activeNotes.map(({note, column}) => currentStep === column && this.playNote(note));
    }

    render() {
        const {notes, synth} = this.props;

        return (
            <StyledSequencerModule
                flexDir="column"
                gridColumns={this.props.gridColumns}
                gridRows={this.props.gridRows}>

                <StepSequencer
                    steps={this.state.steps * this.state.bars}
                    notes={notes}
                    cellSize={16}
                    synth={synth}
                    currentStep={this.state.currentStep}
                    activateNote={this.activateNote}
                    deactivateNote={this.deactivateNote}
                    activeNotes={this.state.activeNotes}/>{' '}
            </StyledSequencerModule>
        );
    }
}
