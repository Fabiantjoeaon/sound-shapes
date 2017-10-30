import '../helpers/range';
import flattenDeep from 'lodash/flattenDeep';

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
//HINT: Range https://twitter.com/hwk73/status/922009762988003329
const octavesRange = [...5];
const mapNotesToOctave = octave => notes.map(note => `${note}${octave}`);
const allOctaves = flattenDeep(
    octavesRange.map(octave => mapNotesToOctave(octave))
);

const zoom = (start, end) => allOctaves.slice(start, end);
const zoomOctave = octave =>
    zoom(octave * notes.length, octave * notes.length + notes.length);

const initialState = {
    currentOctave: 3,
    notes: zoomOctave(3)
};
initialState.notes = mapNotesToOctave(initialState.currentOctave);

const octaveReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_OCTAVE':
            const { octave } = action;
            return {
                ...state,
                currentOctave: octave,
                notes: zoomOctave(octave)
            };

        case 'SLIDE_OCTAVE':
            return { ...state };

        default:
            return state;
    }
};

export default octaveReducer;
