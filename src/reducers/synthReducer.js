import initSynth from '../synth';

const synthReducer = (state = initSynth(), action) => {
    switch (action.type) {
        case 'UPDATE_PARAMETER':
            const newState = { ...state };

            newState[action.module].set({
                [action.parameter]: action.value
            });

            return newState;

        default:
            return state;
    }
};

export default synthReducer;
