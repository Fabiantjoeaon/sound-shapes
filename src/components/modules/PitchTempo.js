import React, { Component } from 'react';
import { NumberParameter } from '../Parameters';

const PitchTempo = ({
    transport,
    octave: { currentOctave },
    setParameter,
    setOctave
}) => (
    <div>
        <h2>Pitch / tempo</h2>
        <div>
            <label>Pitch</label>
            <input
                type="number"
                min="1"
                max="5"
                step="1"
                value={currentOctave}
                onChange={e => setOctave(e.target.value)}
            />
        </div>

        <NumberParameter
            param="bpm"
            module="transport"
            value={transport.bpm.value}
            setParameter={setParameter}
            step={1}
            min={60}
            max={260}
        />
    </div>
);

export default PitchTempo;
