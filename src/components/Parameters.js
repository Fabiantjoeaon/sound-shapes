import React, { Component } from 'react';
import styled from 'styled-components';

const StyledKnobParameter = styled.input`
    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    width: 200px; /* Specific width is required for Firefox. */
    background-color: red; /* Otherwise white in Chrome */

    &::-webkit-slider-thumb {
    }

    &:focus {
        outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
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
                updateParameter,
                param,
                options,
                value,
                step,
                module,
                min,
                max,
                name
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
                        step={step}
                        min={min ? min : null}
                        max={max ? max : null}
                        onChange={e =>
                            updateParameter(module, param, e.target.value)}
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

export { KnobParameter, SwitchParameter };
