import React from 'react';
import Parameter from './Parameter';

const AmpEnvelopeGenerator = ({ ampEnvelope, updateParameter }) => (
    <div>
        <h1>Amplifier envelope</h1>
        <Parameter
            module="ampEnvelope"
            param="attack"
            value={ampEnvelope.attack}
            updateSynth={updateParameter}
        />
        <Parameter
            module="ampEnvelope"
            param="release"
            value={ampEnvelope.release}
            updateSynth={updateParameter}
        />
        <Parameter
            module="ampEnvelope"
            param="sustain"
            value={ampEnvelope.sustain}
            updateSynth={updateParameter}
        />
        <Parameter
            module="ampEnvelope"
            param="decay"
            value={ampEnvelope.decay}
            updateSynth={updateParameter}
        />
    </div>
);

export default AmpEnvelopeGenerator;
