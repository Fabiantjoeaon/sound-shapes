import React from 'react';
import { KnobParameter } from './Parameters';

const FilterEnvelope = ({ filterEnvelope, updateParameter }) => {
    return (
        <div>
            <h2>Filter envelope</h2>
            <KnobParameter
                module="filterEnvelope"
                param="attack"
                value={filterEnvelope.attack}
                updateParameter={updateParameter}
                step={0.01}
            />
            <KnobParameter
                module="filterEnvelope"
                param="release"
                value={filterEnvelope.release}
                updateParameter={updateParameter}
                step={0.01}
            />
            <KnobParameter
                module="filterEnvelope"
                param="sustain"
                value={filterEnvelope.sustain}
                updateParameter={updateParameter}
                step={0.01}
            />
            <KnobParameter
                module="filterEnvelope"
                param="decay"
                value={filterEnvelope.decay}
                updateParameter={updateParameter}
                step={0.01}
            />
        </div>
    );
};

export default FilterEnvelope;
