import React from 'react';
import KnobParameter from '../Parameters/KnobParameter';

const Delay = ({ delay, setParameter, settings }) => (
    <div>
        <h2>Delay</h2>
        <KnobParameter
            param="delayTime"
            setParameter={setParameter}
            value={delay.delayTime.value}
            module="delay"
            min={settings.delayTime.min}
            max={settings.delayTime.max}
        />
        <KnobParameter
            param="feedback"
            setParameter={setParameter}
            value={delay.feedback.value}
            module="delay"
            step={0.01}
            max={settings.feedback.max}
            min={settings.feedback.min}
        />
        <KnobParameter
            param="wet"
            setParameter={setParameter}
            value={delay.wet.value}
            module="delay"
            max={settings.wet.max}
            min={settings.wet.min}
        />
    </div>
);

export default Delay;
