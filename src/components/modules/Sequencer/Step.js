import React, { PureComponent, Component } from 'react';
import styled from 'styled-components';

const StyledStep = styled.div`
    border: 1px solid #000;

    background-color: ${props =>
        props.column === props.stepAhead ? 'rgba(0,0,0,0.3)' : 'white'};

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.6);
    }

    &.active {
        background-color: rgba(0, 0, 255, 0.6);
    }
`;

export default class Step extends Component {
    state = {
        active: 0
    };

    //FIXME: for performance win, only the next column should be updated, and the one before
    // shouldComponentUpdate(nextProps, nextState) {
    //     return (
    //         !(nextProps.currentStep === this.props.column) ||
    //         !(nextProps.currentStep + 1 === this.props.column) ||
    //         nextProps.currentStep - 1 === this.props.column ||
    //         !(nextState.active === this.state.active)
    //     );
    // }

    // componentDidUpdate() {
    //     console.log('did update', this.props.column);
    // }

    componentWillUpdate() {
        const { active } = this.state;
        const { synth, currentStep, column, note } = this.props;
        if (active && currentStep === column) {
            synth.oscillatorA.frequency.value = note;
            synth.oscillatorB.frequency.value = note;
            synth.ampEnvelope.triggerAttackRelease('16n');
            synth.filterEnvelope.triggerAttackRelease('16n');
            synth.noise.start();
        }
    }

    render() {
        const { currentStep, note, column, addToSequence, steps } = this.props;
        const { active } = this.state;

        const stepAhead = currentStep - 1 === -1 ? steps - 1 : currentStep - 1;

        return (
            <StyledStep
                column={column}
                stepAhead={stepAhead}
                onClick={e => this.setState({ active: !active })}
                className={active ? 'active' : null}
            />
        );
    }
}
