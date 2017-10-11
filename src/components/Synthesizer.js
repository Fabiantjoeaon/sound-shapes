import React from 'react';
import { connect } from 'react-redux';
import Keyboard from './Keyboard';
import AmpEnvelopeGenerator from './AmpEnvelopeGenerator';
import { updateParameter } from '../actions';
import Oscillator from './Oscillator';

const Synthesizer = ({ synth, updateParameter }) => (
    <div>
        <AmpEnvelopeGenerator
            ampEnvelope={synth.ampEnvelope}
            updateParameter={updateParameter}
        />
        <Keyboard synth={synth} />
    </div>
);

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
    updateParameter(module, parameter, value) {
        dispatch(updateParameter(module, parameter, value));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Synthesizer);
