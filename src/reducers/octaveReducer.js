import '../helpers/range';
import mode from '../helpers/mode';
import flattenDeep from 'lodash/flattenDeep';
import chunk from 'lodash/chunk';

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const mapNotesToOctave = octave => notes.map(note => `${note}${octave}`);
//HINT: Range https://twitter.com/hwk73/status/922009762988003329
const octavesRange = [...5];
const allNotes = flattenDeep(
    octavesRange.map(octave => mapNotesToOctave(octave))
);

const initialState = {
    allNotes,
    currentPos: 0
};

const octaveReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_OCTAVE':
            const { octave } = action;

            return {
                ...state,
                currentPos: octave * notes.length
            };

        case 'SLIDE_OCTAVE':
            const { movement } = action;
            // const nextPosition = slide < 0 ? state.currentPos - slide : state.currentPos + slide;
            const nextPos = state.currentPos + movement;
            console.log(nextPos);
            return { ...state, currentPos: nextPos };

        default:
            return state;
    }
};

const getNotesAsSingleOctave = (allNotes, pos, octave) => {
    // Slice full notes from position
    const fromPosition = allNotes.slice(pos, allNotes.length);
    // Then slice octave from position
    return fromPosition.slice(0, octave * notes.length);
};

/**
 * Get an amount of octaves from all available notes
 */
export const getNotesAsOctaves = (state, octave) =>
    getNotesAsSingleOctave(state.allNotes, state.currentPos, octave);

/**
 * Detect current octave by checking 
 * which number appears most in current octave slice
 */
export const getCurrentOctave = (state, previousOctave) => {
    const currentNoteSlice = getNotesAsSingleOctave(
        state.allNotes,
        state.currentPos,
        1
    );

    const currentOctaves = currentNoteSlice.map(note => note.match(/\d+/g)[0]);

    return mode(currentOctaves);
};

export default octaveReducer;
