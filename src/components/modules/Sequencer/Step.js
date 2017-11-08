import React from 'react';
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
