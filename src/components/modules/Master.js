import React from 'react';
import KnobParameter from '../Parameters/KnobParameter';

import StyledModule from '../styled/StyledModule';

const Master = ({ master, setParameter, settings, gridColumns, gridRows }) => (
    <StyledModule gridColumns={gridColumns} gridRows={gridRows}>
        <KnobParameter
            param="volume"
            setParameter={setParameter}
            value={master.volume.value}
            module="master"
            min={settings.volume.min}
            max={settings.volume.max}
        />
    </StyledModule>
);

export default Master;
