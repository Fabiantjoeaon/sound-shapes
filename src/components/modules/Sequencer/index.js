import React, { Component } from 'react';
import { Sequence } from 'tone';

import StepSequencer from './StepSequencer';
import { NumberParameter } from '../../Parameters/index';

export default class Sequencer extends Component {
    state = {
        bars: 2,
        steps: 8,
        currentStep: 0,
        isPlaying: true,
        activeNotes: []
    };

    activateNote = note =>
        this.setState({
            activeNotes: [...this.state.activeNotes, note]
        });

    deactivateNote = ({ note, column }) => {
        const index = this.state.activeNotes.findIndex(
            n => n.note == note && n.column == column
        );

        const activeNotes = this.state.activeNotes;
        activeNotes.splice(index, 1);
        this.setState({ activeNotes });
    };

    componentDidMount() {
        let stepCounter = 0;

        this.props.synth.transport.schedule(time => {
            const currentStep =
                stepCounter++ % (this.state.steps * this.state.bars);
            this.setState({
                currentStep
            });
        }, '16n');
        this.props.synth.transport.start();
    }

    componentWillUnmount() {
        this.props.synth.transport.stop();
    }

    componentWillUpdate(nextProps, nextState) {
        const { transport } = this.props.synth;
        nextState.isPlaying ? transport.start() : transport.stop();
    }

    render() {
        const {
            notes,
            octave: { currentOctave },
            synth: { transport },
            synth
        } = this.props;

        return (
            <div>
                <h2> Sequencer </h2>{' '}
                <div>
                    <label> bars </label>{' '}
                    <select
                        onChange={e =>
                            this.setState({
                                bars: e.target.value
                            })}
                        value={this.state.bars}
                    >
                        <option value={1}> 1 </option>{' '}
                        <option value={2}> 2 </option>{' '}
                    </select>{' '}
                </div>{' '}
                <div>
                    <label> Play / pause </label>{' '}
                    <button
                        onClick={() =>
                            this.setState({
                                isPlaying: !this.state.isPlaying
                            })}
                    >
                        {this.state.isPlaying ? '❚❚' : '►'}{' '}
                    </button>{' '}
                </div>{' '}
                <StepSequencer
                    steps={this.state.steps * this.state.bars}
                    notes={notes}
                    cellSize={30}
                    synth={synth}
                    currentStep={this.state.currentStep}
                    activateNote={this.activateNote}
                    deactivateNote={this.deactivateNote}
                    activeNotes={this.state.activeNotes}
                />{' '}
            </div>
        );
    }
}
