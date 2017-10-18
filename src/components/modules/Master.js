import React from 'react';
import { KnobParameter, TestParameter } from '../Parameters';

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
        <TestParameter
            param="volume"
            value={master.volume.value}
            setParameter={setParameter}
            min={-60}
            max={18}
        />
    </div>
);

export default Master;
