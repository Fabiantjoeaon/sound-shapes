import React from 'react';
import styled from 'styled-components';
import d3 from 'd3';

import withParameter from './HOC/withParameter';

const StyledKnobParameter = styled.input`
    -webkit-appearance: none;
    width: 200px;
    background-color: red;

    &::-webkit-slider-thumb {
    }

    &:focus {
        outline: none;
    }

    &::-ms-track {
        cursor: pointer;

        /* Hides the slider so custom styles can be added */
        background: transparent;
        border-color: transparent;
        color: transparent;
    }
`;

const KnobParameter = withParameter(({ ...props }) => (
    <input type="range" {...props} />
));

const SwitchParameter = withParameter(({ ...props }) => <select {...props} />);

const NumberParameter = withParameter(({ ...props }) => (
    <input type="number" {...props} />
));

export { KnobParameter, SwitchParameter, NumberParameter };
