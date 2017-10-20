import React from 'react';
import KnobParameter from '../Parameters/KnobParameter';

const Delay = ({ delay, setParameter }) => (
    <div>
        <h2>Delay</h2>
        <KnobParameter
            param="delayTime"
            setParameter={setParameter}
            value={delay.delayTime.value}
            module="delay"
            step={0.01}
            min={0.01}
            max={1}
        />
        <KnobParameter
            param="feedback"
            setParameter={setParameter}
            value={delay.feedback.value}
            module="delay"
            step={0.01}
            min={0}
            max={1}
        />
        <KnobParameter
            param="wet"
            setParameter={setParameter}
            value={delay.wet.value}
            module="delay"
            step={0.01}
            min={0.01}
            max={1}
        />
    </div>
);

export default Delay;
