import React from 'react';
import KnobParameter from '../Parameters/KnobParameter';

const Master = ({ master, setParameter, settings }) => (
    <div>
        <KnobParameter
            param="volume"
            setParameter={setParameter}
            value={master.volume.value}
            module="master"
            min={settings.volume.min}
            max={settings.volume.max}
        />
    </div>
);

export default Master;
