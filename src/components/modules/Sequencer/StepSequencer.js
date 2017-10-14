import React from 'react';
import styled from 'styled-components';
import times from 'lodash/times';

import Step from './Step';

const SequencerGrid = styled.div`
    display: inline-grid;
    grid-gap: 1px;
    width: calc(
        ${props => props.steps} *
            ${props => (props.cellWidth ? props.cellWidth : props.cellSize)}px
    );
    height: calc(${props => props.notesAmount} * ${props => props.cellSize}px);

    grid-template-columns: repeat(
        ${props => props.steps},
        ${props => props.cellSize}px
    );

    grid-template-rows: repeat(
        ${props => props.notesAmount},
        ${props => props.cellSize}px
    );
`;

const StyledNote = styled.div``;

const StepSequencer = ({ steps, notes, ...rest }) => {
    const notesCellWidth = rest.cellSize + 10;
    let stepRenderCounter = 0;
    let row = 0;
    return (
        <div>
            <SequencerGrid
                steps={1}
                notesAmount={notes.length}
                cellWidth={notesCellWidth}
                cellSize={rest.cellSize}
            >
                {notes.map((note, i) => (
                    <StyledNote
                        key={i}
                        note={note}
                        cellWidth={notesCellWidth}
                        isNote={true}
                    >
                        {note}
                    </StyledNote>
                ))}
            </SequencerGrid>

            <SequencerGrid steps={steps} notesAmount={notes.length} {...rest}>
                {times(steps * notes.length, i => {
                    const column = i % steps;
                    if (stepRenderCounter === steps) {
                        row++;
                        stepRenderCounter = 0;
                    }
                    const note = notes[row];
                    stepRenderCounter++;

                    return (
                        <Step
                            key={i}
                            note={note}
                            synth={rest.synth}
                            column={column}
                            {...rest}
                        />
                    );
                })}
            </SequencerGrid>
        </div>
    );
};

export default StepSequencer;