import React, { Component } from 'react';
import styled from 'styled-components';

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

// HINT: You can pass multiple arguments to a HOC as its just a function
const withParameter = WrappedInput =>
    class Parameter extends Component {
        render() {
            const {
                setParameter,
                param,
                options,
                value,
                module,
                name,
                ...rest
            } = this.props;

            const showValue = !isNaN(parseFloat(value))
                ? parseFloat(value).toFixed(2)
                : value;

            return (
                <div>
                    <label>
                        {name ? name : param} {options ? null : showValue}
                    </label>
                    <WrappedInput
                        value={value}
                        {...rest}
                        onChange={e =>
                            setParameter(module, param, e.target.value)}
                    >
                        {options &&
                            options.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                    </WrappedInput>
                </div>
            );
        }
    };

const KnobParameter = withParameter(({ ...props }) => (
    <input type="range" {...props} />
));

const SwitchParameter = withParameter(({ ...props }) => <select {...props} />);

const NumberParameter = withParameter(({ ...props }) => (
    <input type="number" {...props} />
));

export { KnobParameter, SwitchParameter, NumberParameter };
