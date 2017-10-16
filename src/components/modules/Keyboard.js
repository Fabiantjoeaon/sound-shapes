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

        const { octave: { notes } } = this.props;
        //TODO: Maak dit dynamisch
        this.keyMap = {
            65: `${notes[0]}`,
            87: `${notes[1]}`,
            83: `${notes[2]}`,
            69: `${notes[3]}`,
            68: `${notes[4]}`,
            70: `${notes[5]}`,
            84: `${notes[6]}`,
            71: `${notes[7]}`,
            89: `${notes[8]}`,
            90: `${notes[9]}`,
            72: `${notes[10]}`,
            85: `${notes[11]}`,
            74: `${notes[12]}`
        };

        this.state = { down: null };
    }

    onKeyDownHandler = e => {
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

        const note = this.props.octave.notes[key];
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
        this.props.synth.ampEnvelope.triggerAttack('+0.05');
        this.props.synth.filterEnvelope.triggerAttack('+0.05');
        this.props.synth.noise.start();
    }

    releaseNote() {
        this.setState({ down: null });
        this.props.synth.ampEnvelope.triggerRelease();
        this.props.synth.filterEnvelope.triggerRelease();
        this.props.synth.noise.stop();
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
        const { octave: { notes } } = this.props;
        return (
            <div>
                <h2>Keyboard</h2>
                <StyledKeyboard>
                    {notes.map((note, i) => (
                        <Note
                            i={i}
                            key={i}
                            note={note}
                            onMouseDownHandler={this.onMouseDownHandler}
                            onMouseUpHandler={this.onMouseUpHandler}
                            noteAmount={notes.length}
                            isPressed={note === this.state.down}
                        />
                    ))}
                </StyledKeyboard>
            </div>
        );
    }
}
