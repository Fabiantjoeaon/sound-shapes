import React from 'react';

const Parameter = ({ param, value, module, updateParameter }) => (
    <div>
        <label>
            {param} {value}
        </label>
        <input
            type="range"
            step="0.001"
            value={value}
            onChange={e => updateParameter(module, param, e.target.value)}
        />
    </div>
);

export default Parameter;
