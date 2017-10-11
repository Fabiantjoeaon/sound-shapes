import React, { Component } from 'react';

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
                max
            } = this.props;

            const showValue = !isNaN(parseFloat(value))
                ? parseFloat(value).toFixed(2)
                : value;

            return (
                <div>
                    <label>
                        {param} {options ? null : showValue}
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
