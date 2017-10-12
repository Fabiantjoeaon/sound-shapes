import React from 'react';
import { KnobParameter, SwitchParameter } from '../Parameters';

const LowFrequencyOscillator = ({
    lowFrequencyOscillator,
    updateParameter
}) => {
    return (
        <div>
            <h2>LFO</h2>
            <SwitchParameter
                param="type"
                value={lowFrequencyOscillator.type}
                module={'lowFrequencyOscillator'}
                updateParameter={updateParameter}
                options={['sine', 'triangle', 'sawtooth', 'square']}
            />
            <KnobParameter
                param="frequency"
                updateParameter={updateParameter}
                value={lowFrequencyOscillator.frequency.value}
                module={'lowFrequencyOscillator'}
                min={0.1}
                max={10}
                step={0.1}
            />
            <KnobParameter
                param="depth"
                updateParameter={updateParameter}
                value={lowFrequencyOscillator.depth.value}
                module={'lowFrequencyOscillator'}
                min={0.01}
                max={1}
                step={0.01}
            />
        </div>
    );
};

export default LowFrequencyOscillator;
