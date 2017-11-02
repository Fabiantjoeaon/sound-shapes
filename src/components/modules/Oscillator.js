import React from 'react';
// import { SwitchParameter } from '../Parameters/index';
import SwitchParameter from '../Parameters/SwitchParameter';
import KnobParameter from '../Parameters/KnobParameter';

const Oscillator = ({ oscillator, oscillatorId, setParameter, settings }) => (
    <div>
        <h2>Oscillator {oscillatorId}</h2>
        <SwitchParameter
            param="type"
            value={oscillator.type}
            module={`oscillator${oscillatorId}`}
            setParameter={setParameter}
            options={settings.type.options}
        />
        <KnobParameter
            param="detune"
            setParameter={setParameter}
            value={oscillator.detune.value}
            module={`oscillator${oscillatorId}`}
            min={settings.detune.min}
            max={settings.detune.max}
        />
        <SwitchParameter
            param="phase"
            setParameter={setParameter}
            value={oscillator.phase}
            module={`oscillator${oscillatorId}`}
            options={settings.phase.options}
        />
    </div>
);

export default Oscillator;
