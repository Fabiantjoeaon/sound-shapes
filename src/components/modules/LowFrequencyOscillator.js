import React from 'react';
// import { SwitchParameter } from '../Parameters/index';
import SwitchParameter from '../Parameters/SwitchParameter';
import KnobParameter from '../Parameters/KnobParameter';

const LowFrequencyOscillator = ({
    lowFrequencyOscillator,
    setParameter,
    settings
}) => {
    return (
        <div>
            <h2>LFO</h2>
            <SwitchParameter
                param="type"
                value={lowFrequencyOscillator.type}
                module={'lowFrequencyOscillator'}
                setParameter={setParameter}
                options={settings.type.options}
            />
            <KnobParameter
                param="frequency"
                setParameter={setParameter}
                value={lowFrequencyOscillator.frequency.value}
                module={'lowFrequencyOscillator'}
                min={settings.frequency.min}
                max={settings.frequency.max}
            />
            <KnobParameter
                param="depth"
                setParameter={setParameter}
                value={lowFrequencyOscillator.depth.value}
                module={'lowFrequencyOscillator'}
                min={settings.depth.min}
                max={settings.depth.max}
            />
        </div>
    );
};

export default LowFrequencyOscillator;
