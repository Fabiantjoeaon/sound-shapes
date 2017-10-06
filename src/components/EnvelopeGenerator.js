import React, { Component } from 'react';
import Parameter from './Parameter';

const EnvelopeGenerator = ({synth, updateAmpEnvelope}) => (
    <div>
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
    </div> 
);

export default EnvelopeGenerator;