import React from 'react';
import SwitchParameter from '../Parameters/SwitchParameter';
import KnobParameter from '../Parameters/KnobParameter';

import StyledModule from '../styled/StyledModule';

const LowFrequencyOscillator = ({
    lowFrequencyOscillator,
    setParameter,
    settings,
    gridColumns,
    gridRows
}) => (
    <StyledModule gridColumns={gridColumns} gridRows={gridRows} flexDir="row">
        <SwitchParameter
            param="type"
            value={lowFrequencyOscillator.type}
            module={'lowFrequencyOscillator'}
            setParameter={setParameter}
            options={settings.type.options}
            width={100 / 3}
            height={100}
        />
        <KnobParameter
            param="frequency"
            setParameter={setParameter}
            value={lowFrequencyOscillator.frequency.value}
            module={'lowFrequencyOscillator'}
            min={settings.frequency.min}
            max={settings.frequency.max}
            width={100 / 3}
            height={100}
        />
        <KnobParameter
            param="depth"
            setParameter={setParameter}
            value={lowFrequencyOscillator.depth.value}
            module={'lowFrequencyOscillator'}
            min={settings.depth.min}
            max={settings.depth.max}
            width={100 / 3}
            height={100}
        />
    </StyledModule>
);

export default LowFrequencyOscillator;
