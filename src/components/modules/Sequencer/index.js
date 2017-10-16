import React, { Component } from 'react';
import { Sequence } from 'tone';

import StepSequencer from './StepSequencer';
import { NumberParameter } from '../../Parameters';

export default class Sequencer extends Component {
    state = {
        bars: 2,
        steps: 8,
        currentStep: 0,
        isPlaying: true
    };

    componentDidMount() {
        let stepCounter = 0;

        this.props.synth.transport.schedule(time => {
            const currentStep =
                stepCounter++ % (this.state.steps * this.state.bars);
            this.setState({ currentStep });
        }, '16n');
        this.props.synth.transport.start();
    }

    componentWillUnmount() {
        this.props.synth.transport.stop();
    }

    render() {
        // TODO: If switching both at the same time is cumbersome try having 2 octave states for keyboard
        // and sequencer, and fetch notes from one big array
        //TODO: pass current notes array as prop to <Note/>, and then find key by modulo?
        //TODO: Then play the note in <Note /> when active
        //TODO: Also try not to render new notes but switch the props when switching octaves
        const {
            octave: { currentOctave, notes },
            synth: { transport },
            synth
        } = this.props;

        return (
            <div>
                <h2>Sequencer</h2>
                <div>
                    <label>bars</label>
                    <select
                        onChange={e =>
                            this.setState({
                                bars: e.target.value
                            })}
                        value={this.state.bars}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                    </select>
                </div>
                <StepSequencer
                    steps={this.state.steps * this.state.bars}
                    notes={notes}
                    cellSize={30}
                    synth={synth}
                    currentStep={this.state.currentStep}
                />
            </div>
        );
    }
}
