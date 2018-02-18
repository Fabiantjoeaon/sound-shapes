import React from 'react';
import KnobParameter from '../Parameters/KnobParameter';

import StyledModule from '../styled/StyledModule';
import StyledTitle from '../styled/StyledTitle';

const Reverb = ({reverb, setParameter, settings, gridColumns, gridRows}) => (
    <StyledModule gridColumns={gridColumns} gridRows={gridRows} flexDir="row">
        <StyledTitle>Reverb</StyledTitle>
        <KnobParameter
            param="roomSize"
            name="room size"
            setParameter={setParameter}
            value={reverb.roomSize.value}
            module="reverb"
            min={settings.roomSize.min}
            max={settings.roomSize.max}/>
        <KnobParameter
            param="dampening"
            setParameter={setParameter}
            value={reverb.dampening.value}
            module="reverb"
            min={settings.dampening.min}
            max={settings.dampening.max}/>
        <KnobParameter
            param="wet"
            setParameter={setParameter}
            value={reverb.wet.value}
            module="reverb"
            max={settings.wet.max}
            min={settings.wet.min}/>
    </StyledModule>
);

export default Reverb;
