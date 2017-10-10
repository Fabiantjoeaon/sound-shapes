import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initSynth } from '../actions';
import Keyboard from './Keyboard';
import AmpEnvelopeGenerator from './AmpEnvelopeGenerator';
import { updateAmpEnvelope } from '../actions';
import Oscillator from './Oscillator';

const Synthesizer = ({ synth, updateAmpEnvelope }) => (
    <div>
        <AmpEnvelopeGenerator
            ampEnvelope={synth.ampEnvelope}
            updateAmpEnvelope={updateAmpEnvelope}
        />
        <Keyboard synth={synth} />
    </div>
);

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
    updateAmpEnvelope(value, envelope) {
        dispatch(updateAmpEnvelope(value, envelope));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Synthesizer);
