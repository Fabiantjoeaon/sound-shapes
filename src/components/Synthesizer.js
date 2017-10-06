import React, { Component } from 'react';
import {connect} from 'react-redux';
import {initSynth} from '../actions';
import Keyboard from './Keyboard';
import EnvelopeGenerator from './EnvelopeGenerator';
import {updateAmpEnvelope} from '../actions';

const Synthesizer = (props) => (
    <div>
        <EnvelopeGenerator {...props}/>
        <Keyboard {...props}/>
    </div>
);

const mapStateToProps = (state) => ({...state});
const mapDispatchToProps = (dispatch) => ({
    updateAmpEnvelope(value, envelope) {
        dispatch(updateAmpEnvelope(value, envelope))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Synthesizer);