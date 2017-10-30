import React from 'react';
import KnobParameter from '../Parameters/KnobParameter';

const Reverb = ({ reverb, setParameter, settings }) => (
    <div>
        <h2>Reverb</h2>
        <KnobParameter
            param="roomSize"
            setParameter={setParameter}
            value={reverb.roomSize.value}
            module="reverb"
            min={settings.roomSize.min}
            max={settings.roomSize.max}
        />
        <KnobParameter
            param="dampening"
            setParameter={setParameter}
            value={reverb.dampening.value}
            module="reverb"
            min={settings.dampening.min}
            max={settings.dampening.max}
        />
        <KnobParameter
            param="wet"
            setParameter={setParameter}
            value={reverb.wet.value}
            module="reverb"
            max={settings.wet.max}
            min={settings.wet.min}
        />
    </div>
);

export default Reverb;
