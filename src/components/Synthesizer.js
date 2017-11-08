import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import WebMidi from 'webmidi';

import config from '../synth/config';
import Master from './modules/Master';
import Mixer from './modules/Mixer';
import Oscillator from './modules/Oscillator';
import AmpEnvelope from './modules/AmpEnvelope';
import FilterEnvelope from './modules/FilterEnvelope';
import Filter from './modules/Filter';
import LowFrequencyOscillator from './modules/LowFrequencyOscillator';
import Reverb from './modules/Reverb';
import Delay from './modules/Delay';
import PitchTempo from './modules/PitchTempo';
import Keyboard from './modules/Keyboard';
import Sequencer from './modules/Sequencer/index';
import { setParameter, setOctave, slideOctave } from '../actions';
import { getNotesAsOctaves, getCurrentOctave } from '../reducers/octaveReducer';

const StyledSynthesizer = styled.div`
    display: grid;
    width: calc(100% - (4 * (5px * 2)));
    height: 475px;
    grid-gap: 5px;
    grid-template-columns: repeat(4, minmax(calc(100% / 4), 1fr));
    grid-template-rows: repeat(10, calc(475px / 10));
`;

class Synthesizer extends Component {
    componentDidMount() {
        WebMidi.enable(err => {
            if (err) {
                console.log('WebMidi could not be enabled.', err);
                return;
            }
        });
    }

    render() {
        const {
            synth,
            octave,
            setParameter,
            setOctave,
            slideOctave,
            keyboardNotes,
            sequencerNotes,
            currentOctave
        } = this.props;
        return (
            <StyledSynthesizer>
                <Oscillator
                    gridColumns="1 / span 1"
                    gridRows="1 / span 2"
                    oscillator={synth.oscillatorA}
                    setParameter={setParameter}
                    oscillatorId="A"
                    settings={config.oscillators}
                />
                <Oscillator
                    gridColumns="1 / span 1"
                    gridRows="3 / span 4"
                    oscillator={synth.oscillatorB}
                    setParameter={setParameter}
                    oscillatorId="B"
                    settings={config.oscillators}
                />
                <Mixer
                    gridColumns="1 / span 1"
                    gridRows="7 / span 2"
                    oscillatorA={synth.oscillatorA}
                    oscillatorB={synth.oscillatorB}
                    noise={synth.noise}
                    setParameter={setParameter}
                    settings={config.mixer}
                />
                <Keyboard
                    gridColumns="1 / span 2"
                    gridRows="9 / span 1"
                    notes={keyboardNotes}
                    currentOctave={currentOctave}
                    synth={synth}
                    settings={config.keyboard}
                />
                <AmpEnvelope
                    gridColumns="2 / span 1"
                    gridRows="1 / span 2"
                    ampEnvelope={synth.ampEnvelope}
                    setParameter={setParameter}
                    settings={config.envelopes}
                />
                <FilterEnvelope
                    gridColumns="2 / span 1"
                    gridRows="3 / span 2"
                    filterEnvelope={synth.filterEnvelope}
                    setParameter={setParameter}
                    settings={config.envelopes}
                />
                <Filter
                    gridColumns="2 / span 1"
                    gridRows="5 / span 4"
                    filter={synth.filter}
                    setParameter={setParameter}
                    settings={config.filter}
                />
                <LowFrequencyOscillator
                    gridColumns="3 / span 1"
                    gridRows="1 / span 2"
                    lowFrequencyOscillator={synth.lowFrequencyOscillator}
                    setParameter={setParameter}
                    settings={config.lowFrequencyOscillator}
                />
                <Delay
                    gridColumns="3 / span 1"
                    gridRows="3 / span 2"
                    delay={synth.delay}
                    setParameter={setParameter}
                    settings={config.delay}
                />
                <Reverb
                    gridColumns="3 / span 1"
                    gridRows="5 / span 2"
                    reverb={synth.reverb}
                    setParameter={setParameter}
                    settings={config.reverb}
                />
                <Master
                    gridColumns="4 / span 1"
                    gridRows="1 / span 2"
                    master={synth.master}
                    setParameter={setParameter}
                    settings={config.master}
                />
                <PitchTempo
                    gridColumns="4 / span 1"
                    gridRows="3 / span 2"
                    transport={synth.transport}
                    currentOctave={currentOctave}
                    setOctave={setOctave}
                    slideOctave={slideOctave}
                    setParameter={setParameter}
                    settings={config.pitchTempo}
                />
                <Sequencer
                    gridRows="5 / span 5"
                    gridColumns="4 / span 1"
                    notes={sequencerNotes}
                    octave={octave}
                    currentOctave={currentOctave}
                    synth={synth}
                    settings={config.sequencer}
                />
            </StyledSynthesizer>
        );
    }
}

const mapStateToProps = state => ({
    sequencerNotes: getNotesAsOctaves(state.octave, 1),
    keyboardNotes: getNotesAsOctaves(state.octave, 2),
    currentOctave: getCurrentOctave(state.octave),
    ...state
});

const mapDispatchToProps = dispatch => ({
    setParameter(...args) {
        dispatch(setParameter(...args));
    },
    setOctave(octave) {
        dispatch(setOctave(octave));
    },
    slideOctave(movement) {
        dispatch(slideOctave(movement));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Synthesizer);
