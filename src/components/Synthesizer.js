import React from 'react';
import { connect } from 'react-redux';

import Master from './modules/Master';
import Mixer from './modules/Mixer';
import Oscillator from './modules/Oscillator';
import AmpEnvelope from './modules/AmpEnvelope';
import FilterEnvelope from './modules/FilterEnvelope';
import Filter from './modules/Filter';
import LowFrequencyOscillator from './modules/LowFrequencyOscillator';
import Reverb from './modules/Reverb';
import Delay from './modules/Delay';
import Keyboard from './modules/Keyboard';
import Sequencer from './modules/Sequencer';
import { setParameter } from '../actions';

const Synthesizer = ({ synth, setParameter }) => (
    <div>
        <Master master={synth.master} setParameter={setParameter} />
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
        <Keyboard synth={synth} />
        <Sequencer transport={synth.transport} setParameter={setParameter} />
    </div>
);

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
    setParameter(module, parameter, value) {
        dispatch(setParameter(module, parameter, value));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Synthesizer);
