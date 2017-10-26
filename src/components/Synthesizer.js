import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

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
        <Master master={synth.master} setParameter={setParameter} />
        <PitchTempo
            transport={synth.transport}
            octave={octave}
            setOctave={setOctave}
            setParameter={setParameter}
        />
        <Oscillator
            oscillator={synth.oscillatorA}
            setParameter={setParameter}
            oscillatorId="A"
        />
        <Oscillator
            oscillator={synth.oscillatorB}
            setParameter={setParameter}
            oscillatorId="B"
        />
        <Mixer
            oscillatorA={synth.oscillatorA}
            oscillatorB={synth.oscillatorB}
            noise={synth.noise}
            setParameter={setParameter}
        />
        <AmpEnvelope
            ampEnvelope={synth.ampEnvelope}
            setParameter={setParameter}
        />
        <FilterEnvelope
            filterEnvelope={synth.filterEnvelope}
            setParameter={setParameter}
        />
        <Filter filter={synth.filter} setParameter={setParameter} />
        <LowFrequencyOscillator
            lowFrequencyOscillator={synth.lowFrequencyOscillator}
            setParameter={setParameter}
        />
        <Delay delay={synth.delay} setParameter={setParameter} />
        <Reverb reverb={synth.reverb} setParameter={setParameter} />
        <Keyboard
            notes={octave.notes}
            currentOctave={octave.currentOctave}
            synth={synth}
        />
        <Sequencer
            octave={octave}
            currentOctave={octave.currentOctave}
            synth={synth}
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
