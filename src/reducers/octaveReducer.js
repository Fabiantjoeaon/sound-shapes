const octaveReducer = (state = 3, action) => {
    switch (action.type) {
        case 'SET_OCTAVE':

        default:
            return state;
    }
};

module.exports = octaveReducer;
