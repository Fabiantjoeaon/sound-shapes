import React from 'react';
import Parameter from './Parameter';

const AmpEnvelopeGenerator = ({ ampEnvelope, updateParameter }) => (
    <div>
        <h1>Amplifier envelope</h1>
        <Parameter
            module="ampEnvelope"
            param="attack"
            value={ampEnvelope.attack}
            updateParameter={updateParameter}
        />
        <Parameter
            module="ampEnvelope"
            param="release"
            value={ampEnvelope.release}
            updateParameter={updateParameter}
        />
        <Parameter
            module="ampEnvelope"
            param="sustain"
            value={ampEnvelope.sustain}
            updateParameter={updateParameter}
        />
        <Parameter
            module="ampEnvelope"
            param="decay"
            value={ampEnvelope.decay}
            updateParameter={updateParameter}
        />
    </div>
);

export default AmpEnvelopeGenerator;
