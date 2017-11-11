import React from 'react';
import styled from 'styled-components';

import config from '../../synth/config';

const { colors } = config;

const ParameterWrapper = styled.div`
    position: absolute;
    width: 100%;
    bottom: 1px;
    left: 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;

    &.active {
        span {
            &::after,
            &::before {
                transform: translate3d(0%, 0, 0);
            }

            &::before {
            }
        }
    }
`;
const ParameterText = styled.span`
    position: relative;
    transition: all 0.3s ease-out;
    align-self: center;
    padding: 3px 6px;
    letter-spacing: 1px;
    color: #fff;
    font-family: 'Rubik Light', sans-serif;
    text-transform: uppercase;
    font-size: 0.5em;
    text-align: center;
    z-index: 0;
    overflow: hidden;

    &:not(.active) {
        &::before {
            transition-delay: 0.1s;
        }
    }

    &::before,
    &::after {
        position: absolute;

        display: block;
        top: 0;
        left: 0;
        transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
        height: 100%;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
    }

    &::after {
        content: '';
        z-index: -1;
        width: 100%;
        background-color: #fff;
        transform: translate3d(110%, 0, 0);
        transition: transform 0.2s;
    }

    &::before {
        content: attr(data-letters);
        z-index: 1;
        padding-top: 3px;
        overflow: hidden;
        font-family: 'Rubik Regular', sans-serif;
        color: ${colors.background};
        transform: translate3d(-110%, 0, 0);
        transition: all 0.3s;
    }
`;

export default ({ param, refProp }) => (
    <ParameterWrapper ref={refProp}>
        <ParameterText data-letters={param}>{param}</ParameterText>
    </ParameterWrapper>
);
