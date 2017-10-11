import React, { Component } from 'react';
import styled from 'styled-components';

const StyledKeyboard = styled.div`
    display: flex;
    flex-flow: row nowrap;
    height: 300px;
    width: 500px;
`;

//TODO: Is black prop? then render in between two
const StyledNote = styled.div`
    width: calc(100% / ${props => props.noteAmount});
    height: 100%;
    border: 1px solid black;
    background-color: ${props =>
        props.isPressed ? 'red' : props.isBlackKey ? 'black' : 'white'};

    span {
        color: green;
    }
`;

class Note extends Component {
    constructor(props) {
        super(props);
    }

    onMouseDownHandler = e => {
        e.preventDefault();
        this.props.onMouseDownHandler(this.props.i);
    };

    render() {
        return (
            <StyledNote
                noteAmount={this.props.noteAmount}
                onMouseDown={this.onMouseDownHandler}
                onMouseUp={this.props.onMouseUpHandler}
                isBlackKey={this.props.note.includes('#')}
                isPressed={this.props.isPressed}
            >
                <span>{this.props.note}</span>
            </StyledNote>
        );
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
        };

        this.state = {
            notes: Object.values(this.keyMap),
            down: null
        };
    }

    onKeyDownHandler = e => {
        e.preventDefault();
        if (this.state.down) return;

        const note = this.keyMap[e.which];
        if (!note) return;

        this.setState({ down: note });
        this.props.synth.oscillator.frequency.value = note;
        this.props.synth.ampEnvelope.triggerAttack();
    };

    onKeyUpHandler = e => {
        e.preventDefault();
        this.setState({ down: null });
        this.props.synth.ampEnvelope.triggerRelease();
    };

    onMouseDownHandler = key => {
        if (this.state.down) return;

        const note = this.state.notes[key];
        this.setState({ down: note });
        this.props.synth.oscillator.frequency.value = note;
        this.props.synth.ampEnvelope.triggerAttack();
    };

    onMouseUpHandler = e => {
        e.preventDefault();
        this.setState({ down: null });
        this.props.synth.ampEnvelope.triggerRelease();
    };

    componentDidMount() {
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
                {this.state.notes.map((note, i) => (
                    <Note
                        i={i}
                        key={i}
                        note={note}
                        onMouseDownHandler={this.onMouseDownHandler}
                        onMouseUpHandler={this.onMouseUpHandler}
                        noteAmount={this.state.notes.length}
                        isPressed={note === this.state.down}
                    />
                ))}
            </StyledKeyboard>
        );
    }
}
