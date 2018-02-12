import { combineReducers } from 'redux';
import synthReducer from './synthReducer';
import octaveReducer from './octaveReducer';

const lastAction = (state = null, action) => action;

export default combineReducers({
    synth: synthReducer,
    octave: octaveReducer,
    lastAction
});
