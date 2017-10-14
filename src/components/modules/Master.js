import React from 'react';
import { KnobParameter } from '../Parameters';

const Master = ({ master, setParameter }) => (
    <div>
        <h2>Master</h2>
        <KnobParameter
            param="volume"
            setParameter={setParameter}
            value={master.volume.value}
            module="master"
            step={1}
            min={-60}
            max={18}
        />
    </div>
);

export default Master;
