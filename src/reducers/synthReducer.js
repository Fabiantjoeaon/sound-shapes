import initSynth from '../synth';

const synthReducer = (state = initSynth(), action) => {
    switch (action.type) {
        case 'SET_PARAMETER':
            const newState = { ...state };

            newState[action.module].set({
                [action.parameter]: action.value
            });

            return newState;
            break;

        case 'TOGGLE_VISIBILITY':
            const { isVisible } = action;

            return { ...state, isVisible };
            break;

        default:
            return state;
    }
};

export default synthReducer;
