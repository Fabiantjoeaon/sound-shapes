import React, { Component } from 'react';
import {Synth} from 'tone';
import {connect} from 'react-redux';
import {initSynth} from '../actions';
import Keyboard from './Keyboard';

class Synthesizer extends Component {
    componentDidMount() {
        this.props.initSynth(new Synth().toMaster())
    }

    render() {
        return (
            <Keyboard {...this.props}/>
        );
    }
}

const mapStateToProps = (state) => ({...state});
const mapDispatchToProps = (dispatch) => ({
    initSynth(synth) {
        dispatch(initSynth(synth))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Synthesizer);