import React from 'react';
import KnobParameter from '../Parameters/KnobParameter';
import SwitchParameter from '../Parameters/SwitchParameter';

const PitchTempo = ({
    transport,
    currentOctave,
    setParameter,
    setOctave,
    slideOctave,
    settings
}) => {
    return (
        <div>
            <SwitchParameter
                setOctave={setOctave}
                options={settings.pitch.options}
                value={currentOctave}
                module="octave"
                param="octave"
            />

            <KnobParameter
                param="bpm"
                module="transport"
                value={transport.bpm.value}
                setParameter={setParameter}
                min={settings.transport.min}
                max={settings.transport.max}
                step={1}
            />

            <div>
                <button onClick={() => slideOctave(-1)}> &larr; </button>
                <button onClick={() => slideOctave(1)}> &rarr; </button>
            </div>
        </div>
    );
};

export default PitchTempo;
