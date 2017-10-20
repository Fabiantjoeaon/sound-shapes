import React from 'react';
import KnobParameter from '../Parameters/KnobParameter';

const FilterEnvelope = ({ filterEnvelope, setParameter }) => {
    return (
        <div>
            <h2>Filter envelope</h2>
            <KnobParameter
                module="filterEnvelope"
                param="attack"
                value={filterEnvelope.attack}
                setParameter={setParameter}
                step={0.01}
                min={0}
                max={3}
            />
            <KnobParameter
                module="filterEnvelope"
                param="release"
                value={filterEnvelope.release}
                setParameter={setParameter}
                step={0.01}
                min={0}
                max={3}
            />
            <KnobParameter
                module="filterEnvelope"
                param="sustain"
                value={filterEnvelope.sustain}
                setParameter={setParameter}
                step={0.01}
                min={0}
                max={3}
            />
            <KnobParameter
                module="filterEnvelope"
                param="decay"
                value={filterEnvelope.decay}
                setParameter={setParameter}
                step={0.01}
                min={0}
                max={3}
            />
        </div>
    );
};

export default FilterEnvelope;
