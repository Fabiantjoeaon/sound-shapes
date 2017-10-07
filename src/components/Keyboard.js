import React, { Component } from 'react';
import styled from 'styled-components';
import bindAll from 'lodash/bindAll';

const StyledKeyboard = styled.div`
    display: flex;
    flex-flow: row nowrap;
    height: 300px;
    width: 500px;
`;

const StyledNote = styled.div`
    width: calc(100% / ${props => props.noteAmount});
    height: 100%;
    background-color: red;
    border: 1px solid black;
`;  

class Note extends Component {
    constructor(props) {
        super(props);
        bindAll(this, 'onMouseDownHandler')
    }

    onMouseDownHandler(e) {
        e.preventDefault();
        this.props.onMouseDownHandler(this.props.i)
    }

    render() {
        return (
            <StyledNote 
                noteAmount={this.props.noteAmount}
                onMouseDown={this.onMouseDownHandler}
                onMouseUp={this.props.onMouseUpHandler}
            />
        )
    }
} 

export default class Keyboard extends Component {
    constructor(props) {
        super(props);

        this.keyMap = {
            65: 'C5',
            87: 'C#5',
            83: 'D5',
            69: 'D#5',
            68: 'E5',
            70: 'F5',
            84: 'F#5',
            71: 'G5',
            89: 'G#5',
            90: 'G#5',
            72: 'A5',
            85: 'A#5',
            74: 'B5'
        }

        this.state =  {
            notes: Object.values(this.keyMap),
            down: null
        }

        bindAll(this, 'onKeyUpHandler', 'onKeyDownHandler', 'onMouseDownHandler', 'onMouseUpHandler');
    }

    componentDidMount() {
        
    }

    onKeyDownHandler(e) {
        e.preventDefault();
        if(this.state.down) return;

        const note = this.keyMap[e.which];
        this.setState({down: note});
        this.props.synth.instance.triggerAttack(
            note
        );
    }

    onKeyUpHandler(e) {
        e.preventDefault();
        this.setState({down: null});
        this.props.synth.instance.triggerRelease();
    }

    onMouseDownHandler(key) {
        if(this.state.down) return;

        const note = this.state.notes[key];
        this.setState({down: note});
        this.props.synth.instance.triggerAttack(
            note
        );
    }

    onMouseUpHandler(e) {
        e.preventDefault();
        this.setState({down: null});
        this.props.synth.instance.triggerRelease();
    }

    componentWillMount() {
        document.addEventListener('keydown', this.onKeyDownHandler);
        document.addEventListener('keyup', this.onKeyUpHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDownHandler);
        document.removeEventListener('keyup', this.onKeyUpHandler);
    }

    render() {
        return (
            <StyledKeyboard>
                {this.state.notes.map((note, i) => 
                    <Note 
                        i={i}
                        key={i} 
                        onMouseDownHandler={this.onMouseDownHandler} 
                        onMouseUpHandler={this.onMouseUpHandler} 
                        noteAmount={this.state.notes.length} 
                    />
                )}
            </StyledKeyboard>
        )
    }
}