import React from 'react';
import KnobParameter from '../Parameters/KnobParameter';

import StyledModule from '../styled/StyledModule';
import StyledTitle from '../styled/StyledTitle';

const Delay = ({ delay, setParameter, settings, gridColumns, gridRows }) => (
    <StyledModule gridColumns={gridColumns} gridRows={gridRows} flexDir="row">
        <StyledTitle>Delay</StyledTitle>
        <KnobParameter
            param="delayTime"
            name="delay time"
            setParameter={setParameter}
            value={delay.delayTime.value}
            module="delay"
            min={settings.delayTime.min}
            max={settings.delayTime.max}
            width={100 / 3}
            height={100}
        />
        <KnobParameter
            param="feedback"
            setParameter={setParameter}
            value={delay.feedback.value}
            module="delay"
            step={0.01}
            max={settings.feedback.max}
            min={settings.feedback.min}
            width={100 / 3}
            height={100}
        />
        <KnobParameter
            param="wet"
            setParameter={setParameter}
            value={delay.wet.value}
            module="delay"
            max={settings.wet.max}
            min={settings.wet.min}
            width={100 / 3}
            height={100}
        />
    </StyledModule>
);

export default Delay;
