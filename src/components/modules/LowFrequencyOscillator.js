import React from 'react';
import { SwitchParameter } from '../Parameters/index';
import KnobParameter from '../Parameters/KnobParameter';

const LowFrequencyOscillator = ({ lowFrequencyOscillator, setParameter }) => {
    return (
        <div>
            <h2>LFO</h2>
            <SwitchParameter
                param="type"
                value={lowFrequencyOscillator.type}
                module={'lowFrequencyOscillator'}
                setParameter={setParameter}
                options={['sine', 'triangle', 'sawtooth', 'square']}
            />
            <KnobParameter
                param="frequency"
                setParameter={setParameter}
                value={lowFrequencyOscillator.frequency.value}
                module={'lowFrequencyOscillator'}
                min={0.1}
                max={10}
                step={0.1}
            />
            <KnobParameter
                param="depth"
                setParameter={setParameter}
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
