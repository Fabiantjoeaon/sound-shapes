import React from 'react';
import { KnobParameter, SwitchParameter } from '../Parameters';

const Reverb = ({ reverb, updateParameter }) => (
    <div>
        <h2>Reverb</h2>
        <KnobParameter
            param="roomSize"
            updateParameter={updateParameter}
            value={reverb.roomSize.value}
            module="reverb"
            step={0.01}
            min={0.01}
            max={1}
        />
        <KnobParameter
            param="dampening"
            updateParameter={updateParameter}
            value={reverb.dampening.value}
            module="reverb"
            step={50}
            min={0}
            max={5000}
        />
        <KnobParameter
            param="wet"
            updateParameter={updateParameter}
            value={reverb.wet.value}
            module="reverb"
            step={0.01}
            min={0.01}
            max={1}
        />
    </div>
);

export default Reverb;
