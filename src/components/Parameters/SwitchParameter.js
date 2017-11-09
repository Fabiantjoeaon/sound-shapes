import React from 'react';
import styled from 'styled-components';

import config from '../../synth/config';
const { colors } = config;

const StyledSwitch = styled.div`
    height: ${props => props.height}%;
    max-height: 130px;
    width: ${props => props.width}%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    font-size: 0.5em;
    font-family: 'Rubik Light', sans-serif;
    text-transform: uppercase;
    color: ${colors.darkGray};

    div {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        cursor: pointer;
        width: auto;
        margin-left: 20px;
        span {
            align-self: center;
        }

        &.active {
            span: font-weight: 900;

            .circle {
                background-color: ${colors.darkGray};
            }
        }   
    }
`;

const StyledCircle = styled.span`
    border-radius: 100%;
    height: 6px;
    width: 6px;
    border: 1px solid ${colors.darkGray};

    ~ span {
        padding-left: 5px;
        color: ${colors.darkGray};
    }
`;

const SwitchParameter = ({
    options,
    module,
    param,
    value,
    setParameter,
    setOctave,
    width,
    height
}) => (
    <StyledSwitch width={width} height={height} optionLength={options.length}>
        <span>{param}</span>
        {options &&
            options.map(option => (
                <div
                    key={option}
                    className={value == option ? 'active' : null}
                    onClick={e => {
                        console.log('clicked', value);
                        setParameter
                            ? setParameter(module, param, option)
                            : setOctave(option);
                    }}
                >
                    <StyledCircle className="circle" />
                    <span>{option}</span>
                </div>
            ))}
    </StyledSwitch>
);

export default SwitchParameter;
