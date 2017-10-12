import React from 'react';
import { KnobParameter, SwitchParameter } from '../Parameters';

const Delay = ({ delay, updateParameter }) => (
    <div>
        <h2>Delay</h2>
        <KnobParameter
            param="delayTime"
            updateParameter={updateParameter}
            value={delay.delayTime.value}
            module="delay"
            step={0.01}
            min={0.01}
            max={1}
        />
        <KnobParameter
            param="feedback"
            updateParameter={updateParameter}
            value={delay.feedback.value}
            module="delay"
            step={0.01}
            min={0}
            max={1}
        />
        <KnobParameter
            param="wet"
            updateParameter={updateParameter}
            value={delay.wet.value}
            module="delay"
            step={0.01}
            min={0.01}
            max={1}
        />
    </div>
);

export default Delay;
