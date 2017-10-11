import React from 'react';
import { KnobParameter } from './Parameters';

const AmpEnvelope = ({ ampEnvelope, updateParameter }) => (
    <div>
        <h2>Amplifier envelope</h2>
        <KnobParameter
            module="ampEnvelope"
            param="attack"
            value={ampEnvelope.attack}
            updateParameter={updateParameter}
            step={0.01}
        />
        <KnobParameter
            module="ampEnvelope"
            param="release"
            value={ampEnvelope.release}
            updateParameter={updateParameter}
            step={0.01}
        />
        <KnobParameter
            module="ampEnvelope"
            param="sustain"
            value={ampEnvelope.sustain}
            updateParameter={updateParameter}
            step={0.01}
        />
        <KnobParameter
            module="ampEnvelope"
            param="decay"
            value={ampEnvelope.decay}
            updateParameter={updateParameter}
            step={0.01}
        />
    </div>
);

export default AmpEnvelope;
