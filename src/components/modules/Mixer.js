import React from 'react';
import KnobParameter from '../Parameters/KnobParameter';

const Mixer = ({ oscillatorA, oscillatorB, noise, setParameter }) => (
    <div>
        <h2>Master</h2>
        <KnobParameter
            param="volume"
            name="oscillator A volume"
            setParameter={setParameter}
            value={oscillatorA.volume.value}
            module="oscillatorA"
            min={-6}
            max={24}
            step={1}
        />
        <KnobParameter
            param="volume"
            name="oscillator B volume"
            setParameter={setParameter}
            value={oscillatorB.volume.value}
            module="oscillatorB"
            min={-6}
            max={24}
            step={1}
        />
        <KnobParameter
            param="volume"
            name="noise volume"
            setParameter={setParameter}
            value={noise.volume.value}
            module="noise"
            min={-40}
            max={24}
            step={1}
        />
    </div>
);

export default Mixer;
