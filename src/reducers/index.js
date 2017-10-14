import { combineReducers } from 'redux';
import synthReducer from './synthReducer';
import octaveReducer from './octaveReducer';

export default combineReducers({
    synth: synthReducer,
    octave: octaveReducer
});
