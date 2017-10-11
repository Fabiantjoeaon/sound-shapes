import React from 'react';
import { KnobParameter } from './Parameters';

const AmpEnvelopeGenerator = ({ ampEnvelope, updateParameter }) => (
    <div>
        <h2>Amplifier envelope</h2>
        <KnobParameter
            module="ampEnvelope"
            param="attack"
            value={ampEnvelope.attack}
            updateParameter={updateParameter}
        />
        <KnobParameter
            module="ampEnvelope"
            param="release"
            value={ampEnvelope.release}
            updateParameter={updateParameter}
        />
        <KnobParameter
            module="ampEnvelope"
            param="sustain"
            value={ampEnvelope.sustain}
            updateParameter={updateParameter}
        />
        <KnobParameter
            module="ampEnvelope"
            param="decay"
            value={ampEnvelope.decay}
            updateParameter={updateParameter}
        />
    </div>
);

export default AmpEnvelopeGenerator;
