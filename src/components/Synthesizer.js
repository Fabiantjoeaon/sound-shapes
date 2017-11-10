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
import ModulationFrequency from './modules/ModulationFrequency';
import Sequencer from './modules/Sequencer/index';
import { setParameter, setOctave, slideOctave } from '../actions';
import { getNotesAsOctaves, getCurrentOctave } from '../reducers/octaveReducer';

const { colors } = config;

const StyledWrapper = styled.div`
    height: calc(450px + (5px * 9));
    width: 100%;
    position: absolute;
    bottom: 0px;
`;

const StyledWrapperInner = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;
const StyledSynthesizer = styled(StyledWrapperInner)`
    display: grid;
    // background-color: ${colors.background};
    background-color: rgba(52,70,122, 0.8);
    grid-gap: 5px;
    grid-template-columns: repeat(4, minmax(calc((100% - (4 * 5px)) / 4), 1fr));
    grid-template-rows: repeat(10, calc(450px / 10));
    z-index: 2;
`;

const StyledBackground = styled(StyledWrapperInner)`
    z-index: 0;
    background-image: -webkit-repeating-radial-gradient(
        center center,
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.7) 1px,
        transparent 1px,
        transparent 100%
    );
    background-size: 2px 2px;
    transition: background-size 0.3s ease-out;
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
            <StyledWrapper>
                <StyledBackground />
                <StyledSynthesizer>
                    <Oscillator
                        gridColumns="1 / span 1"
                        gridRows="2 / span 2"
                        oscillator={synth.oscillatorA}
                        setParameter={setParameter}
                        oscillatorId="A"
                        settings={config.oscillators}
                    />
                    <Oscillator
                        gridColumns="1 / span 1"
                        gridRows="4 / span 2"
                        oscillator={synth.oscillatorB}
                        setParameter={setParameter}
                        oscillatorId="B"
                        settings={config.oscillators}
                    />
                    <ModulationFrequency
                        gridColumns="1 / span 1"
                        gridRows="6 / span 2"
                        oscillatorAWaveShape={synth.oscillatorA.type.value}
                        oscillatorBWaveShape={synth.oscillatorB.type.value}
                        setParameter={setParameter}
                    />
                    <Mixer
                        gridColumns="1 / span 1"
                        gridRows="8 / span 2"
                        oscillatorA={synth.oscillatorA}
                        oscillatorB={synth.oscillatorB}
                        noise={synth.noise}
                        setParameter={setParameter}
                        settings={config.mixer}
                    />
                    <Keyboard
                        gridColumns="1 / span 2"
                        gridRows="10 / span 1"
                        notes={keyboardNotes}
                        currentOctave={currentOctave}
                        synth={synth}
                        settings={config.keyboard}
                    />
                    <AmpEnvelope
                        gridColumns="2 / span 1"
                        gridRows="2 / span 2"
                        ampEnvelope={synth.ampEnvelope}
                        setParameter={setParameter}
                        settings={config.envelopes}
                    />
                    <FilterEnvelope
                        gridColumns="2 / span 1"
                        gridRows="4 / span 2"
                        filterEnvelope={synth.filterEnvelope}
                        setParameter={setParameter}
                        settings={config.envelopes}
                    />
                    <Filter
                        gridColumns="2 / span 1"
                        gridRows="6 / span 4"
                        filter={synth.filter}
                        setParameter={setParameter}
                        settings={config.filter}
                    />
                    <LowFrequencyOscillator
                        gridColumns="3 / span 1"
                        gridRows="2 / span 2"
                        lowFrequencyOscillator={synth.lowFrequencyOscillator}
                        setParameter={setParameter}
                        settings={config.lowFrequencyOscillator}
                    />
                    <Delay
                        gridColumns="3 / span 1"
                        gridRows="4 / span 2"
                        delay={synth.delay}
                        setParameter={setParameter}
                        settings={config.delay}
                    />
                    <Reverb
                        gridColumns="3 / span 1"
                        gridRows="6 / span 2"
                        reverb={synth.reverb}
                        setParameter={setParameter}
                        settings={config.reverb}
                    />
                    <PitchTempo
                        gridColumns="3 / span 1"
                        gridRows="8 / span 2"
                        transport={synth.transport}
                        currentOctave={currentOctave}
                        setOctave={setOctave}
                        slideOctave={slideOctave}
                        setParameter={setParameter}
                        settings={config.pitchTempo}
                    />
                    <Master
                        gridColumns="4 / span 1"
                        gridRows="2 / span 2"
                        master={synth.master}
                        setParameter={setParameter}
                        settings={config.master}
                    />
                    <Sequencer
                        gridRows="6 / span 5"
                        gridColumns="4 / span 1"
                        notes={sequencerNotes}
                        octave={octave}
                        currentOctave={currentOctave}
                        synth={synth}
                        settings={config.sequencer}
                    />
                </StyledSynthesizer>
            </StyledWrapper>
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
