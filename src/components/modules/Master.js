import React from 'react';
import KnobParameter from '../Parameters/KnobParameter';
import styled from 'styled-components';

import StyledModule from '../styled/StyledModule';
import StyledTitle from '../styled/StyledTitle';

const Master = ({
    master,
    setParameter,
    settings,
    gridColumns,
    gridRows,
    transport
}) => (
    <StyledModule gridColumns={gridColumns} gridRows={gridRows}>
        <StyledTitle>Master</StyledTitle>
        <KnobParameter
            param="volume"
            setParameter={setParameter}
            value={master.volume.value}
            module="master"
            min={settings.volume.min}
            max={settings.volume.max}/>

        <KnobParameter
            param="bpm"
            module="transport"
            value={transport.bpm.value}
            setParameter={setParameter}
            min={settings.transport.min}
            max={settings.transport.max}
            step={1}/>
    </StyledModule>
);

export default Master;
