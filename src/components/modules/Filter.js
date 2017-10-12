import React from 'react';
import { KnobParameter, SwitchParameter } from '../Parameters';

const Filter = ({ filter, updateParameter }) => (
    <div>
        <h2>Filter</h2>
        <SwitchParameter
            param="type"
            value={filter.type}
            module="filter"
            updateParameter={updateParameter}
            options={['highpass', 'lowpass', 'bandpass']}
        />
        <SwitchParameter
            param="rolloff"
            value={filter.rolloff.value}
            module="filter"
            updateParameter={updateParameter}
            options={['-24', '-48']}
        />
        <KnobParameter
            param="frequency"
            updateParameter={updateParameter}
            value={filter.frequency.value}
            module="filter"
            step={100}
            min={-5000}
            max={5000}
        />
        <KnobParameter
            param="Q"
            name="resonance"
            updateParameter={updateParameter}
            value={filter.Q.value}
            module="filter"
            step={1}
            min={0}
            max={70}
        />
        <KnobParameter
            param="gain"
            updateParameter={updateParameter}
            value={filter.gain.value}
            module="filter"
            step={1}
        />
    </div>
);

export default Filter;
