import React, { Component } from 'react';

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

export default withParameter;
