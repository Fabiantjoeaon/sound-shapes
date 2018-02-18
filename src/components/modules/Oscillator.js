import React from 'react';
import SwitchParameter from '../Parameters/SwitchParameter';
import KnobParameter from '../Parameters/KnobParameter';
import StyledModule from '../styled/StyledModule';
import StyledTitle from '../styled/StyledTitle';

const Oscillator = ({
    oscillator,
    oscillatorId,
    setParameter,
    settings,
    gridColumns,
    gridRows,
    ...props
}) => (
    <StyledModule flexDir="row" gridColumns={gridColumns} gridRows={gridRows}>
        <StyledTitle>{`Oscillator ${oscillatorId}`}</StyledTitle>
        <SwitchParameter
            param="type"
            value={oscillator.type}
            module={`oscillator${oscillatorId}`}
            setParameter={setParameter}
            options={settings.type.options}
            width={100 / 3}
            height={100}
        />
        <KnobParameter
            param="detune"
            setParameter={setParameter}
            value={oscillator.detune.value}
            module={`oscillator${oscillatorId}`}
            min={settings.detune.min}
            max={settings.detune.max}
            width={100 / 3}
            height={100}
        />
        <SwitchParameter
            param="phase"
            setParameter={setParameter}
            value={oscillator.phase}
            module={`oscillator${oscillatorId}`}
            options={settings.phase.options}
            width={100 / 3}
            height={100}
        />
    </StyledModule>
);

export default Oscillator;
