export const setParameter = (module, parameter, value) => ({
    type: 'SET_PARAMETER',
    module,
    parameter,
    value
});

export const setOctave = octave => ({
    type: 'SET_OCTAVE',
    octave
});

export const slideOctave = movement => ({ type: 'SLIDE_OCTAVE', movement });

export const toggleSynthVisibility = isVisible => ({
    type: 'TOGGLE_VISIBILITY',
    isVisible
});
