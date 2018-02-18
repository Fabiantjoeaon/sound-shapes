import initSynth from '../synth';

const synthReducer = (state = initSynth(), action) => {
    switch (action.type) {
        case 'SET_PARAMETER':
            // if (state[action.module][action.parameter] === action.value) return;

            const newState = { ...state };

            newState[action.module].set({
                [action.parameter]: action.value
            });

            return newState;

        case 'TOGGLE_VISIBILITY':
            const { isVisible } = action;

            return { ...state, isVisible };

        default:
            return state;
    }
};

export default synthReducer;
