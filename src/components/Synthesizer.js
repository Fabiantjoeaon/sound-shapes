import React from 'react';
import { connect } from 'react-redux';

import Keyboard from './Keyboard';
import Oscillator from './Oscillator';
import AmpEnvelope from './AmpEnvelope';
import FilterEnvelope from './FilterEnvelope';
import Filter from './Filter';
import Reverb from './Reverb';
import { updateParameter } from '../actions';

const Synthesizer = ({ synth, updateParameter }) => {
    return (
        <div>
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
            <AmpEnvelope
                ampEnvelope={synth.ampEnvelope}
                updateParameter={updateParameter}
            />
            <FilterEnvelope
                filterEnvelope={synth.filterEnvelope}
                updateParameter={updateParameter}
            />
            <Filter filter={synth.filter} updateParameter={updateParameter} />
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
