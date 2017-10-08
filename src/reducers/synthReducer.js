import {Synth} from 'tone';
import cloneDeep from 'lodash/cloneDeep';

//TODO: initial state is function that returns synth setup (diff file) with filters attached etc
const synthReducer = (state = {
    instance: new Synth().toMaster()
}, action) => {
    switch(action.type) {
        case 'UPDATE_AMP_ENVELOPE':
            const newState = {...state}
            newState.instance.set({
                'envelope': {
                    [action.envelope]: action.value
                }
            })
            
            return newState;
        break;

        default:
            return state;
    }   
}

export default synthReducer;