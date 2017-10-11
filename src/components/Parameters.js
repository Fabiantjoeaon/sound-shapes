import React, { Component } from 'react';

// HINT: You can pass multiple arguments to a HOC as its just a function
const withParameter = WrappedInput =>
    class extends Component {
        render() {
            return (
                <div>
                    <label>
                        {this.props.param}{' '}
                        {parseFloat(this.props.value).toFixed(2)}
                    </label>
                    <WrappedInput
                        value={this.props.value}
                        onChange={e =>
                            this.props.updateParameter(
                                this.props.module,
                                this.props.param,
                                e.target.value
                            )}
                    />
                </div>
            );
        }
    };

const Knob = ({ ...props }) => <input type="range" {...props} />;
const KnobParameter = withParameter(Knob);

export { KnobParameter };
