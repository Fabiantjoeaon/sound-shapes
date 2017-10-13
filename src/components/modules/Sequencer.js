import React, { Component } from 'react';

export default class Sequencer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const steps = 16;
        let stepCounter = 0;
        this.props.transport.schedule(time => {
            stepCounter++;
            stepCounter = stepCounter % steps;
            console.log(stepCounter);
        }, 0);

        this.props.transport.start();
    }

    componentWillUnMount() {
        this.props.transport.stop();
    }

    render() {
        return <div />;
    }
}
