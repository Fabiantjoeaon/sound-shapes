import React, { Component } from 'react';

export default class Parameter extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = e => {
        e.preventDefault();
        this.props.updateSynth(
            this.props.module,
            this.props.param,
            e.target.value
        );
    };

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
