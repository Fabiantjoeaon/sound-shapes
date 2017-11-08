import React from 'react';
import KnobParameter from '../Parameters/KnobParameter';
import StyledModule from '../styled/StyledModule';

const Mixer = ({
    oscillatorA,
    oscillatorB,
    noise,
    setParameter,
    settings,
    gridColumns,
    gridRows
}) => (
    <StyledModule flexDir="row" gridColumns={gridColumns} gridRows={gridRows}>
        <KnobParameter
            param="volume"
            name="osc a"
            setParameter={setParameter}
            value={oscillatorA.volume.value}
            module="oscillatorA"
            min={settings.oscillatorVolume.min}
            max={settings.oscillatorVolume.max}
        />
        <KnobParameter
            param="volume"
            name="osc b"
            setParameter={setParameter}
            value={oscillatorB.volume.value}
            module="oscillatorB"
            min={settings.oscillatorVolume.min}
            max={settings.oscillatorVolume.max}
        />
        <KnobParameter
            param="volume"
            name="noise"
            setParameter={setParameter}
            value={noise.volume.value}
            module="noise"
            min={settings.noiseVolume.min}
            max={settings.noiseVolume.max}
        />
    </StyledModule>
);

export default Mixer;
