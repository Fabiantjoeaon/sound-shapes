import React from 'react';
import KnobParameter from '../Parameters/KnobParameter';
import StyledModule from '../styled/StyledModule';

const AmpEnvelope = ({
    ampEnvelope,
    setParameter,
    settings,
    gridColumns,
    gridRows
}) => (
    <StyledModule flexDir="row" gridColumns={gridColumns} gridRows={gridRows}>
        <KnobParameter
            module="ampEnvelope"
            param="attack"
            value={ampEnvelope.attack}
            setParameter={setParameter}
            step={settings.ADSR.step}
            min={settings.ADSR.min}
            max={settings.ADSR.max}
        />
        <KnobParameter
            module="ampEnvelope"
            param="release"
            value={ampEnvelope.release}
            setParameter={setParameter}
            step={settings.ADSR.step}
            min={settings.ADSR.min}
            max={settings.ADSR.max}
        />
        <KnobParameter
            module="ampEnvelope"
            param="sustain"
            value={ampEnvelope.sustain}
            setParameter={setParameter}
            min={settings.ADSR.min}
            max={settings.ADSR.max}
        />
        <KnobParameter
            module="ampEnvelope"
            param="decay"
            value={ampEnvelope.decay}
            setParameter={setParameter}
            min={settings.ADSR.min}
            max={settings.ADSR.max}
        />
    </StyledModule>
);

export default AmpEnvelope;
