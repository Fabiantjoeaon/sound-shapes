import React from 'react';
import { KnobParameter } from './Parameters';

const Oscillator = ({ oscillator, oscillatorId, updateParameter }) => {
    return (
        <div>
            <h2>Oscillator {oscillatorId}</h2>
            <KnobParameter
                param="detune"
                updateParameter={updateParameter}
                value={oscillator.detune.value}
                module={`oscillator${oscillatorId}`}
            />
        </div>
    );
};

export default Oscillator;
