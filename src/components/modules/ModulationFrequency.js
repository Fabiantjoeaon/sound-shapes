import React from 'react';
import KnobParameter from '../Parameters/KnobParameter';
import SwitchParameter from '../Parameters/KnobParameter';
import StyledModule from '../styled/StyledModule';

const ModulationFrequency = ({
    oscillatorA,
    oscillatorB,
    modulationFrequency,
    setParameter,
    settings,
    gridColumns,
    gridRows
}) => (
    <StyledModule flexDir="row" gridColumns={gridColumns} gridRows={gridRows}>
        {oscillatorA.type.value == 'pwm' && (
            <KnobParameter
                param="modulationFrequency"
                name="mod freq"
                setParameter={setParameter}
                value={oscillatorA.modulationFrequency.value}
                module={'oscillatorA'}
                min={settings.modulationFrequency.min}
                max={settings.modulationFrequency.max}
                width={100}
                height={100}
            />
        )}{' '}
    </StyledModule>
);

export default ModulationFrequency;
