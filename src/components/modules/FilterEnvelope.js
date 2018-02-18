import React from 'react';
import KnobParameter from '../Parameters/KnobParameter';
import StyledModule from '../styled/StyledModule';
import StyledTitle from '../styled/StyledTitle';

const FilterEnvelope = ({
    filterEnvelope,
    setParameter,
    settings,
    gridColumns,
    gridRows
}) => (
    <StyledModule flexDir="row" gridColumns={gridColumns} gridRows={gridRows}>
        <StyledTitle>Filter envelope</StyledTitle>
        <KnobParameter
            module="filterEnvelope"
            param="attack"
            value={filterEnvelope.attack}
            setParameter={setParameter}
            sensitivity={1}
            min={settings.ADSR.min}
            max={settings.ADSR.max}
        />
        <KnobParameter
            module="filterEnvelope"
            param="decay"
            value={filterEnvelope.decay}
            setParameter={setParameter}
            sensitivity={1}
            min={settings.ADSR.min}
            max={settings.ADSR.max}
        />
        <KnobParameter
            module="filterEnvelope"
            param="sustain"
            value={filterEnvelope.sustain}
            setParameter={setParameter}
            sensitivity={1}
            min={settings.ADSR.min}
            max={settings.ADSR.max}
        />
        <KnobParameter
            module="filterEnvelope"
            param="release"
            value={filterEnvelope.release}
            setParameter={setParameter}
            sensitivity={1}
            min={settings.ADSR.min}
            max={settings.ADSR.max}
        />
    </StyledModule>
);

export default FilterEnvelope;
