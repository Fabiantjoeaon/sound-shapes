import {combineReducers} from 'redux';
import synthReducer from './synthReducer';

export default combineReducers({
    synth: synthReducer
});