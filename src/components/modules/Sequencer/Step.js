import React from 'react';
import styled from 'styled-components';

import config from '../../../synth/config';

const { colors } = config;

const StyledStep = styled.div`
    background-color: ${props =>
        props.column === props.stepAhead ? '#d7d7d7' : '#efefef'};

    cursor: pointer;

    &:hover {
        background-color: rgba(${colors.primary}, 0.7);
    }

    &.active {
        background-color: rgb(${colors.primary});
    }
`;

const Step = ({
    currentStep,
    note,
    column,
    addToSequence,
    steps,
    activateNote,
    activeNotes,
    deactivateNote
}) => {
    const active = activeNotes.find(
        activeNote => activeNote.note === note && activeNote.column === column
    );

    return (
        <StyledStep
            column={column}
            stepAhead={currentStep - 1 === -1 ? steps - 1 : currentStep - 1}
            onClick={e =>
                active
                    ? deactivateNote({ note, column })
                    : activateNote({
                          note,
                          column
                      })}
            className={active ? 'active' : null}
        />
    );
};

export default Step;
