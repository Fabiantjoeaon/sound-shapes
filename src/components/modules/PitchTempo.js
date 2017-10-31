import React, { Component } from 'react';
import { NumberParameter } from '../Parameters/index';

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
            <div>
                <label>Pitch</label>
                <input
                    type="number"
                    min={settings.pitch.min}
                    max={settings.pitch.max}
                    step={1}
                    value={currentOctave}
                    onChange={e => setOctave(e.target.value)}
                />
            </div>

            <div>
                <button onClick={() => slideOctave(-1)}> &larr; </button>
                <button onClick={() => slideOctave(1)}> &rarr; </button>
            </div>

            <NumberParameter
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
