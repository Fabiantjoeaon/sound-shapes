import React from 'react';
import Parameter from './Parameter';

const AmpEnvelopeGenerator = ({ ampEnvelope, updateAmpEnvelope }) => {
    return (
        <div>
            <h1>Amplifier envelope</h1>
            <Parameter
                param="attack"
                value={ampEnvelope.attack}
                updateSynth={updateAmpEnvelope}
            />
            <Parameter
                param="release"
                value={ampEnvelope.release}
                updateSynth={updateAmpEnvelope}
            />
            <Parameter
                param="sustain"
                value={ampEnvelope.sustain}
                updateSynth={updateAmpEnvelope}
            />
            <Parameter
                param="decay"
                value={ampEnvelope.decay}
                updateSynth={updateAmpEnvelope}
            />
        </div>
    );
};

export default AmpEnvelopeGenerator;
