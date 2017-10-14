import React from 'react';
import { KnobParameter } from '../Parameters';

const AmpEnvelope = ({ ampEnvelope, setParameter }) => (
    <div>
        <h2>Amplifier envelope</h2>
        <KnobParameter
            module="ampEnvelope"
            param="attack"
            value={ampEnvelope.attack}
            setParameter={setParameter}
            step={0.01}
        />
        <KnobParameter
            module="ampEnvelope"
            param="release"
            value={ampEnvelope.release}
            setParameter={setParameter}
            step={0.01}
        />
        <KnobParameter
            module="ampEnvelope"
            param="sustain"
            value={ampEnvelope.sustain}
            setParameter={setParameter}
            step={0.01}
        />
        <KnobParameter
            module="ampEnvelope"
            param="decay"
            value={ampEnvelope.decay}
            setParameter={setParameter}
            step={0.01}
        />
    </div>
);

export default AmpEnvelope;
