import cloneDeep from 'lodash/cloneDeep';
import initSynth from '../synth';

const synthReducer = (state = initSynth(), action) => {
    switch (action.type) {
        case 'UPDATE_AMP_ENVELOPE':
            const newState = { ...state };

            newState.ampEnvelope.set({
                [action.envelope]: action.value
            });

            return newState;
            break;

        default:
            return state;
    }
};

export default synthReducer;
