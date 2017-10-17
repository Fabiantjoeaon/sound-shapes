const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const mapNotesToOctave = octave => notes.map(note => `${note}${octave}`);

const initialState = {
    currentOctave: 3
};
initialState.notes = mapNotesToOctave(initialState.currentOctave);

const octaveReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_OCTAVE':
            const { octave } = action;
            return {
                ...state,
                currentOctave: octave,
                notes: mapNotesToOctave(octave)
            };

        default:
            return state;
    }
};

module.exports = octaveReducer;
