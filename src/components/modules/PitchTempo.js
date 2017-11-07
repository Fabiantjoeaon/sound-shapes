import React, { Component } from 'react';
// import { NumberParameter } from '../Parameters/index';
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
            <h2>Pitch / tempo</h2>

            <SwitchParameter
                setOctave={setOctave}
                options={settings.pitch.options}
                value={currentOctave}
                module="octave"
                param="octave"
            />

            <div>
                <button onClick={() => slideOctave(-1)}> &larr; </button>
                <button onClick={() => slideOctave(1)}> &rarr; </button>
            </div>

            <KnobParameter
                param="bpm"
                module="transport"
                value={transport.bpm.value}
                setParameter={setParameter}
                min={settings.transport.min}
                max={settings.transport.max}
                step={1}
            />
        </div>
    );
};

export default PitchTempo;
