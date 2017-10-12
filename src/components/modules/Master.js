import React from 'react';
import { KnobParameter } from '../Parameters';

const Master = ({ master, updateParameter }) => (
    <div>
        <h2>Master</h2>
        <KnobParameter
            param="volume"
            updateParameter={updateParameter}
            value={master.volume.value}
            module="master"
            step={1}
            min={-60}
            max={18}
        />
    </div>
);

export default Master;
