import React from 'react';
import SwitchParameter from '../Parameters/SwitchParameter';
import KnobParameter from '../Parameters/KnobParameter';
import StyledModule from '../styled/StyledModule';

const Filter = ({ filter, setParameter, settings, gridColumns, gridRows }) => {
    return (
        <StyledModule
            flexDir="row"
            gridColumns={gridColumns}
            gridRows={gridRows}
        >
            <SwitchParameter
                param="type"
                value={filter.type}
                module="filter"
                setParameter={setParameter}
                options={settings.type.options}
            />
            <SwitchParameter
                param="rolloff"
                value={filter._rolloff}
                module="filter"
                setParameter={setParameter}
                options={settings.rolloff.options}
            />
            <KnobParameter
                param="frequency"
                setParameter={setParameter}
                value={filter.frequency.value}
                module="filter"
                min={settings.frequency.min}
                max={settings.frequency.max}
            />
            <KnobParameter
                param="Q"
                name="resonance"
                setParameter={setParameter}
                value={filter.Q.value}
                module="filter"
                min={settings.Q.min}
                max={settings.Q.max}
            />
            <KnobParameter
                param="gain"
                setParameter={setParameter}
                value={filter.gain.value}
                module="filter"
                min={settings.gain.min}
                max={settings.gain.max}
            />
        </StyledModule>
    );
};

export default Filter;
