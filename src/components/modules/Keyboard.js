import React, { Component } from 'react';
import styled from 'styled-components';

const StyledKeyboard = styled.div`
    display: flex;
    flex-flow: row nowrap;
    height: 300px;
    width: 500px;
`;

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

const Note = ({
    i,
    noteAmount,
    onMouseDownHandler,
    onMouseUpHandler,
    note,
    isPressed
}) => (
    <StyledNote
        noteAmount={noteAmount}
        onMouseDown={e => onMouseDownHandler(i)}
        onMouseUp={onMouseUpHandler}
        isBlackKey={note.includes('#')}
        isPressed={isPressed}
    >
        <span>{note}</span>
    </StyledNote>
);

export default class Keyboard extends Component {
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
        };

        this.state = { notes: Object.values(this.keyMap), down: null };
    }

    onKeyDownHandler = e => {
        e.preventDefault();
        if (this.state.down) return;

        const note = this.keyMap[e.which];
        if (!note) return;

        this.playNote(note);
    };

    onKeyUpHandler = e => {
        e.preventDefault();
        this.releaseNote();
    };

    onMouseDownHandler = key => {
        if (this.state.down) return;

        const note = this.state.notes[key];
        this.playNote(note);
    };

    onMouseUpHandler = e => {
        e.preventDefault();
        this.releaseNote();
    };

    playNote(note) {
        this.setState({ down: note });
        this.props.synth.oscillatorA.frequency.value = note;
        this.props.synth.oscillatorB.frequency.value = note;
        this.props.synth.ampEnvelope.triggerAttack();
        this.props.synth.filterEnvelope.triggerAttack();
    }

    releaseNote() {
        this.setState({ down: null });
        this.props.synth.ampEnvelope.triggerRelease();
        this.props.synth.filterEnvelope.triggerRelease();
    }

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