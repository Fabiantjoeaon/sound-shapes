import React, { Component } from 'react';
import Parameter from './Parameter';

const AmpEnvelopeGenerator = ({synth, updateAmpEnvelope}) => (
    <div>
        <h1>Amplifier envelope</h1>
        <Parameter 
            param='attack'
            value={synth.instance.envelope.attack}
            updateSynth={updateAmpEnvelope}
        />
        <Parameter 
            param='release'
            value={synth.instance.envelope.release}
            updateSynth={updateAmpEnvelope}
        />
        <Parameter 
            param='sustain'
            value={synth.instance.envelope.sustain}
            updateSynth={updateAmpEnvelope}
        />
        <Parameter 
            param='decay'
            value={synth.instance.envelope.decay}
            updateSynth={updateAmpEnvelope}
        />
    </div> 
);

export default AmpEnvelopeGenerator;