import React from 'react';
import KnobParameter from '../Parameters/KnobParameter';

const AmpEnvelope = ({ ampEnvelope, setParameter, settings }) => (
    <div>
        <h2>Amplifier envelope</h2>
        <KnobParameter
            module="ampEnvelope"
            param="attack"
            value={ampEnvelope.attack}
            setParameter={setParameter}
            step={settings.ADSR.step}
            min={settings.ADSR.min}
            max={settings.ADSR.max}
        />
        <KnobParameter
            module="ampEnvelope"
            param="release"
            value={ampEnvelope.release}
            setParameter={setParameter}
            step={settings.ADSR.step}
            min={settings.ADSR.min}
            max={settings.ADSR.max}
        />
        <KnobParameter
            module="ampEnvelope"
            param="sustain"
            value={ampEnvelope.sustain}
            setParameter={setParameter}
            min={settings.ADSR.min}
            max={settings.ADSR.max}
        />
        <KnobParameter
            module="ampEnvelope"
            param="decay"
            value={ampEnvelope.decay}
            setParameter={setParameter}
            min={settings.ADSR.min}
            max={settings.ADSR.max}
        />
    </div>
);

export default AmpEnvelope;
