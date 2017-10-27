import React from 'react';
import KnobParameter from '../Parameters/KnobParameter';

const Mixer = ({ oscillatorA, oscillatorB, noise, setParameter, settings }) => (
    <div>
        <h2>Master</h2>
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
    </div>
);

export default Mixer;
