import React from 'react';
import KnobParameter from '../Parameters/KnobParameter';
import styled from 'styled-components';

import StyledModule from '../styled/StyledModule';
import StyledTitle from '../styled/StyledTitle';

const Toggle = styled.span `
    // background-color: #fff;
    padding: 5px 10px;
    margin-right: 10px;
    color: #fff;
    font-family : 'Rubik Light', sans-serif;
    font-size: 1em;
    // display: inline;
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
        <StyledTitle>Master</StyledTitle>
        <KnobParameter
            param="volume"
            setParameter={setParameter}
            value={master.volume.value}
            module="master"
            min={settings.volume.min}
            max={settings.volume.max}/>
        <Toggle onClick={toggleSynthVisibility}>Toggle</Toggle>
    </StyledModule>
);

export default Master;
