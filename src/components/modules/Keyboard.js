import React, { Component } from 'react';
import styled from 'styled-components';

const StyledKeyboard = styled.div`
    display: flex;
    flex-flow: row nowrap;
    height: 300px;
    width: 1000px;
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

        this.keyMap = this.createKeyMap(this.props.notes);
    }

    state = {
        down: null
    };

    createKeyMap(notes) {
        const keys = [65, 87, 83, 69, 68, 70, 84, 71, 89, 90, 72, 85, 74];
        const keyMap = {};
        notes.map((note, i) => {
            keyMap[keys[i]] = note;
        });

        return keyMap;
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

        const note = this.props.notes[key];
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

    componentWillUpdate(nextProps, nextState) {
        if (!(this.props.currentOctave === nextProps.currentOctave)) {
            this.keyMap = this.createKeyMap(nextProps.notes);
        }
    }

    render() {
        const { notes } = this.props;
        console.log(notes.length);
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
