import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import config from '../synth/config';
import Master from './modules/Master';
import PitchTempo from './modules/PitchTempo';
import Mixer from './modules/Mixer';
import Oscillator from './modules/Oscillator';
import AmpEnvelope from './modules/AmpEnvelope';
import FilterEnvelope from './modules/FilterEnvelope';
import Filter from './modules/Filter';
import LowFrequencyOscillator from './modules/LowFrequencyOscillator';
import Reverb from './modules/Reverb';
import Delay from './modules/Delay';
import Keyboard from './modules/Keyboard';
import Sequencer from './modules/Sequencer/index';
import { setParameter, setOctave } from '../actions';

const StyledSynthesizer = styled.div`display: grid;`;

const Synthesizer = ({ synth, octave, setParameter, setOctave }) => (
    <StyledSynthesizer>
        <Master
            master={synth.master}
            setParameter={setParameter}
            settings={config.master}
        />
        <PitchTempo
            transport={synth.transport}
            octave={octave}
            setOctave={setOctave}
            setParameter={setParameter}
            settings={config.pitchTempo}
        />
        <Oscillator
            oscillator={synth.oscillatorA}
            setParameter={setParameter}
            oscillatorId="A"
            settings={config.oscillators}
        />
        <Oscillator
            oscillator={synth.oscillatorB}
            setParameter={setParameter}
            oscillatorId="B"
            settings={config.oscillators}
        />
        <Mixer
            oscillatorA={synth.oscillatorA}
            oscillatorB={synth.oscillatorB}
            noise={synth.noise}
            setParameter={setParameter}
            settings={config.mixer}
        />
        <AmpEnvelope
            ampEnvelope={synth.ampEnvelope}
            setParameter={setParameter}
            settings={config.envelopes}
        />
        <FilterEnvelope
            filterEnvelope={synth.filterEnvelope}
            setParameter={setParameter}
            settings={config.envelopes}
        />
        <Filter
            filter={synth.filter}
            setParameter={setParameter}
            settings={config.filter}
        />
        <LowFrequencyOscillator
            lowFrequencyOscillator={synth.lowFrequencyOscillator}
            setParameter={setParameter}
            settings={config.lowFrequencyOscillator}
        />
        <Delay
            delay={synth.delay}
            setParameter={setParameter}
            settings={config.delay}
        />
        <Reverb
            reverb={synth.reverb}
            setParameter={setParameter}
            settings={config.reverb}
        />
        <Keyboard
            notes={octave.notes}
            currentOctave={octave.currentOctave}
            synth={synth}
            settings={config.keyboard}
        />
        <Sequencer
            octave={octave}
            currentOctave={octave.currentOctave}
            synth={synth}
            settings={config.sequencer}
        />
    </StyledSynthesizer>
);

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
    setParameter(...args) {
        dispatch(setParameter(...args));
    },
    setOctave(octave) {
        dispatch(setOctave(octave));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Synthesizer);
