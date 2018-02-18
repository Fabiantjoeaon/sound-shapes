import React from 'react';
import styled from 'styled-components';

import config from '../../synth/config';

const {colors} = config;

const StyledTitle = styled.h4 `
    position: absolute;
    top: -2px;
    margin: 0px;
    font-family: 'Helvetica', sans-serif;
    
    font-size: 0.75em;
    font-weight: 100;
    left: 10px;
    color: #fff;
`;

export default StyledTitle;
