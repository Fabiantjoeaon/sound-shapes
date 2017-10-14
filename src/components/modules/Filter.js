import React from 'react';
import { KnobParameter, SwitchParameter } from '../Parameters';

const Filter = ({ filter, setParameter }) => (
    <div>
        <h2>Filter</h2>
        <SwitchParameter
            param="type"
            value={filter.type}
            module="filter"
            setParameter={setParameter}
            options={['highpass', 'lowpass', 'bandpass']}
        />
        <SwitchParameter
            param="rolloff"
            value={filter.rolloff.value}
            module="filter"
            setParameter={setParameter}
            options={['-24', '-48']}
        />
        <KnobParameter
            param="frequency"
            setParameter={setParameter}
            value={filter.frequency.value}
            module="filter"
            step={100}
            min={-5000}
            max={5000}
        />
        <KnobParameter
            param="Q"
            name="resonance"
            setParameter={setParameter}
            value={filter.Q.value}
            module="filter"
            step={1}
            min={0}
            max={70}
        />
        <KnobParameter
            param="gain"
            setParameter={setParameter}
            value={filter.gain.value}
            module="filter"
            step={1}
        />
    </div>
);

export default Filter;
