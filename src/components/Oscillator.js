import React from 'react';
import { KnobParameter, SwitchParameter } from './Parameters';

const Oscillator = ({ oscillator, oscillatorId, updateParameter }) => (
    <div>
        <h2>Oscillator {oscillatorId}</h2>
        <SwitchParameter
            param="type"
            value={oscillator.type}
            module={`oscillator${oscillatorId}`}
            updateParameter={updateParameter}
            options={['sine', 'triangle', 'sawtooth', 'square', 'pulse', 'pwm']}
        />
        <KnobParameter
            param="volume"
            updateParameter={updateParameter}
            value={oscillator.volume.value}
            module={`oscillator${oscillatorId}`}
            min={-6}
            max={24}
            step={1}
        />
        <KnobParameter
            param="detune"
            updateParameter={updateParameter}
            value={oscillator.detune.value}
            module={`oscillator${oscillatorId}`}
            min={-100}
            max={100}
            step={1}
        />
        <KnobParameter
            param="phase"
            updateParameter={updateParameter}
            value={oscillator.phase.value}
            module={`oscillator${oscillatorId}`}
            step={1}
        />
    </div>
);

export default Oscillator;
