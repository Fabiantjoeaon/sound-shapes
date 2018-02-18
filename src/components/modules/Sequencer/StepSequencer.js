import React from 'react';
import styled from 'styled-components';
import times from 'lodash/times';

import Step from './Step';
import config from '../../../synth/config';

const {colors} = config;

const StyledWrapper = styled.div `
    display: flex;
    justify-content: center;
`;

const SequencerGrid = styled.div `
    display: inline-grid;
    grid-gap: 1px;

    grid-template-columns: repeat(
        ${props => props.steps},
        ${props => props.cellSize + 3}px
    );

    grid-template-rows: repeat(
        ${props => props.notesAmount},
        ${props => props.cellSize}px
    );
`;

const StepSequencer = ({
    steps,
    notes,
    ...rest
}) => {
    let stepRenderCounter = 0;
    let row = 0;
    return (
        <StyledWrapper>
            <SequencerGrid steps={steps} notesAmount={notes.length} {...rest}>
                {times(steps * notes.length, i => {
                    const column = i % steps;
                    if (stepRenderCounter === steps) {
                        row++;
                        stepRenderCounter = 0;
                    }
                    const note = notes[row];
                    stepRenderCounter++;

                    return (<Step
                        key={i}
                        note={note}
                        synth={rest.synth}
                        column={column}
                        steps={steps}
                        {...rest}/>);
                })}{' '}
            </SequencerGrid>{' '}
        </StyledWrapper>
    );
};

export default StepSequencer;
