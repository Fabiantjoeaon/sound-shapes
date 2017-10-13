import React from 'react';
import { connect } from 'react-redux';

import Master from './modules/Master';
import Mixer from './modules/Mixer';
import Keyboard from './modules/Keyboard';
import Oscillator from './modules/Oscillator';
import AmpEnvelope from './modules/AmpEnvelope';
import FilterEnvelope from './modules/FilterEnvelope';
import Filter from './modules/Filter';
import LowFrequencyOscillator from './modules/LowFrequencyOscillator';
import Reverb from './modules/Reverb';
import Delay from './modules/Delay';
import { updateParameter } from '../actions';

const Synthesizer = ({ synth, updateParameter }) => {
    return (
        <div>
            <Master master={synth.master} updateParameter={updateParameter} />
            <Oscillator
                oscillator={synth.oscillatorA}
                updateParameter={updateParameter}
                oscillatorId="A"
            />
            <Oscillator
                oscillator={synth.oscillatorB}
                updateParameter={updateParameter}
                oscillatorId="B"
            />
            <Mixer
                oscillatorA={synth.oscillatorA}
                oscillatorB={synth.oscillatorB}
                noise={synth.noise}
                updateParameter={updateParameter}
            />
            <AmpEnvelope
                ampEnvelope={synth.ampEnvelope}
                updateParameter={updateParameter}
            />
            <FilterEnvelope
                filterEnvelope={synth.filterEnvelope}
                updateParameter={updateParameter}
            />
            <Filter filter={synth.filter} updateParameter={updateParameter} />
            <LowFrequencyOscillator
                lowFrequencyOscillator={synth.lowFrequencyOscillator}
                updateParameter={updateParameter}
            />
            <Delay delay={synth.delay} updateParameter={updateParameter} />
            <Reverb reverb={synth.reverb} updateParameter={updateParameter} />
            <Keyboard synth={synth} />
        </div>
    );
};

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
    updateParameter(module, parameter, value) {
        dispatch(updateParameter(module, parameter, value));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Synthesizer);
