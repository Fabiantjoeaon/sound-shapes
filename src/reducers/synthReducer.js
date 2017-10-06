const synthReducer = (state = {}, action) => {
    switch(action.type) {
        case 'INIT_SYNTH':
            return {...state, instance: action.synth}

        default:
            return state;
    }   
}

export default synthReducer;