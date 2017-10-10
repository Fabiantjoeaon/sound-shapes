import React, { Component } from 'react';
import bindAll from 'lodash/bindAll';

export default class Parameter extends Component {
    constructor(props) {
        super(props);

        bindAll(this, 'handleChange');
    }

    handleChange(e) {
        e.preventDefault();
        this.props.updateSynth(e.target.value, this.props.param);
    }

    render() {
        return (
            <div>
                <label>
                    {this.props.param} {this.props.value}
                </label>
                <input
                    type="range"
                    step="0.001"
                    value={this.props.value}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}
