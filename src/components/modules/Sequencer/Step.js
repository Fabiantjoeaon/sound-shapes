import React from 'react';
import styled from 'styled-components';

import config from '../../../synth/config';

const {colors} = config;

const StyledStep = styled.div `
    background-color: ${props => props.column === props.stepAhead
    ? 'rgba(199,199,199,0.5)'
    : 'rgba(255,255,255,0.7)'};

    cursor: pointer;
    text-align: center;
    display: flex;
    flex-flow: column;
    justify-content: center;

    &:hover {
        // background-color: rgba(${colors.primary}, 0.7);
        span {
            opacity: 1;
        }
    }

    &.active {
        background-color: rgb(${colors.primary});

        span {
            opacity: 1;
        }
    }

    span {
        transition: opacity 0.2s ease-out;
        color: #fff;
        font-size: 0.3em;
        opacity: 0;
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
    const active = activeNotes.find(activeNote => activeNote.note === note && activeNote.column === column);

    return (
        <StyledStep
            column={column}
            stepAhead={currentStep - 1 === -1
            ? steps - 1
            : currentStep - 1}
            onClick={e => active
            ? deactivateNote({note, column})
            : activateNote({note, column})}
            className={active
            ? 'active'
            : null}>
            <span>{note}</span>
        </StyledStep>
    );
};

export default Step;
