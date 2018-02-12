import React from 'react';
import KnobParameter from '../Parameters/KnobParameter';
import styled from 'styled-components';

import StyledModule from '../styled/StyledModule';

const Toggle = styled.span`
    background-color: #fff;
    padding: 5px 10px;
    color: #000;
    display: inline;
    cursor: pointer;
`;

const Master = ({
    master,
    setParameter,
    settings,
    gridColumns,
    gridRows,
    toggleSynthVisibility
}) => (
    <StyledModule gridColumns={gridColumns} gridRows={gridRows}>
        <KnobParameter
            param="volume"
            setParameter={setParameter}
            value={master.volume.value}
            module="master"
            min={settings.volume.min}
            max={settings.volume.max}
        />
        <Toggle onClick={toggleSynthVisibility}>TOGGLE</Toggle>
    </StyledModule>
);

export default Master;
