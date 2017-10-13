import React from 'react';
import { KnobParameter } from '../Parameters';

const Mixer = ({ oscillatorA, oscillatorB, noise, updateParameter }) => (
    <div>
        <h2>Master</h2>
        <KnobParameter
            param="volume"
            name="oscillator A volume"
            updateParameter={updateParameter}
            value={oscillatorA.volume.value}
            module="oscillatorA"
            min={-6}
            max={24}
            step={1}
        />
        <KnobParameter
            param="volume"
            name="oscillator B volume"
            updateParameter={updateParameter}
            value={oscillatorB.volume.value}
            module="oscillatorB"
            min={-6}
            max={24}
            step={1}
        />
        <KnobParameter
            param="volume"
            name="noise volume"
            updateParameter={updateParameter}
            value={noise.volume.value}
            module="noise"
            min={-40}
            max={24}
            step={1}
        />
    </div>
);

export default Mixer;
