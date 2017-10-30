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

const initialOctave = 3;
const initialState = {
    allNotes,
    currentPos: 0
};

const octaveReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_OCTAVE':
            const { octave } = action;
            // TODO: Only set when in range??
            return {
                ...state,
                currentPos: octave * notes.length
            };

        case 'SLIDE_OCTAVE':
            const { slide } = action;
            // const nextPosition = slide < 0 ? state.currentPos - slide : state.currentPos + slide;
            const nextPos = state.currentPos + slide;
            return { ...state, currentPos: nextPos };

        default:
            return state;
    }
};

/**
 * Get a single octave of notes from all available notes
 */
const getNotesAsOctave = (allNotes, pos, octave) => {
    // Slice full notes from position
    const fromPosition = allNotes.slice(pos, allNotes.length);
    // Then slice octave from position
    return fromPosition.slice(0, octave * notes.length);
};

/**
 * Get an amount of octaves from all available notes
 */
export const getNotesAsOctaves = (state, octave) =>
    getNotesAsOctave(state.allNotes, state.currentPos, octave);

/**
 * Detect current octave by checking 
 * which number appears most in current octave slice
 */
export const getCurrentOctave = (state, previousOctave) => {
    const currentNoteSlice = getNotesAsOctave(
        state.allNotes,
        state.currentPos,
        1
    );

    // currentNoteSlice = empty??? als 1 wordt meegegevn
    const currentOctaves = currentNoteSlice.map(note => note.match(/\d+/g)[0]);

    return mode(currentOctaves);
};

export default octaveReducer;
