import React, { Component } from 'react';
import {Synth} from 'tone';
import {connect} from 'react-redux';
import {initSynth} from '../actions';

class Keyboard extends Component {
    constructor(props) {
        super(props);

        this.keyMap = {
            65: 'C3',
            87: 'C#3',
            83: 'D3',
            69: 'D#3',
            68: 'E3',
            70: 'F3',
            84: 'F#3',
            71: 'G3',
            89: 'G#3',
            90: 'G#3',
            72: 'A3',
            85: 'A#3',
            74: 'B3'
        }

        this.notes = Object.values(this.keyMap);
    }

    onKeyUp(e) {

    }

    onKeyDown(e) {

    }

    onMouseDown(e) {

    }

    onMouseUp(e) {
        
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('keyup', this.onKeyUp);
        document.addEventListener('mousedown', this.onMouseDown);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown);
        document.removeEventListener('keyup', this.onKeyUp);
        document.removeEventListener('mousedown', this.onMouseDown);
        document.removeEventListener('mouseup', this.onMouseUp);
    }

    render() {
        return (
            <p>keyboard</p>
        )
    }
}

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