import React from 'react';
import KnobParameter from '../Parameters/KnobParameter';

import StyledModule from '../styled/StyledModule';

const Delay = ({ delay, setParameter, settings, gridColumns, gridRows }) => (
    <StyledModule gridColumns={gridColumns} gridRows={gridRows} flexDir="row">
        <KnobParameter
            param="delayTime"
            setParameter={setParameter}
            value={delay.delayTime.value}
            module="delay"
            min={settings.delayTime.min}
            max={settings.delayTime.max}
        />
        <KnobParameter
            param="feedback"
            setParameter={setParameter}
            value={delay.feedback.value}
            module="delay"
            step={0.01}
            max={settings.feedback.max}
            min={settings.feedback.min}
        />
        <KnobParameter
            param="wet"
            setParameter={setParameter}
            value={delay.wet.value}
            module="delay"
            max={settings.wet.max}
            min={settings.wet.min}
        />
    </StyledModule>
);

export default Delay;
