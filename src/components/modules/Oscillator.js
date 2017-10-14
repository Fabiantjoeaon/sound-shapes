import React from 'react';
import { KnobParameter, SwitchParameter } from '../Parameters';

const Oscillator = ({ oscillator, oscillatorId, setParameter }) => (
    <div>
        <h2>Oscillator {oscillatorId}</h2>
        <SwitchParameter
            param="type"
            value={oscillator.type}
            module={`oscillator${oscillatorId}`}
            setParameter={setParameter}
            options={['sine', 'triangle', 'sawtooth', 'square', 'pulse', 'pwm']}
        />
        <KnobParameter
            param="detune"
            setParameter={setParameter}
            value={oscillator.detune.value}
            module={`oscillator${oscillatorId}`}
            min={-100}
            max={100}
            step={1}
        />
        <SwitchParameter
            param="phase"
            setParameter={setParameter}
            value={oscillator.phase.value}
            module={`oscillator${oscillatorId}`}
            options={['180', '90', '45', '0']}
        />
    </div>
);

export default Oscillator;
