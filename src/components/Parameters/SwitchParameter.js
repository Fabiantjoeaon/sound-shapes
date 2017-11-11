import React from 'react';
import styled from 'styled-components';

import config from '../../synth/config';
const { colors } = config;

const StyledSwitch = styled.div`
    height: 100%;
    max-height: 130px;
    width: ${props => props.width}%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
    font-family: 'Rubik Light', sans-serif;
    color: ${colors.white};
    
    .inner {
        calc(15px * ${props => props.optionLength});
        align-self: center;
        div {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-self: center;
            cursor: pointer;
            width: auto;
            margin: 0 auto;
            span {
                align-self: center;
            }

            &.active {
                span{
                    font-weight: 900;
                    color: rgb(${colors.primary});
                } 
                
                .circle {
                    background-color: rgb(${colors.primary});
                }
            }   
        }
    }


    .param {
        text-align: center;
        font-size: 0.55em;
        text-transform: uppercase;
        letter-spacing: 1px;
        align-self: baseline;
    }

    .option {
        font-size: 0.5em;
        padding-left: 5px;
        color: ${colors.white};
    }
`;

const StyledCircle = styled.span`
    border-radius: 100%;
    height: 6px;
    width: 6px;
    border: 1px solid ${colors.white};
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
}) => {
    return (
        <StyledSwitch
            width={width}
            height={height}
            optionLength={options.length}
        >
            <div className="inner">
                {options &&
                    options.map(option => (
                        <div
                            key={option}
                            className={value == option ? 'active' : null}
                            onClick={e => {
                                setParameter
                                    ? setParameter(module, param, option)
                                    : setOctave(option);
                            }}
                        >
                            <StyledCircle className="circle" />
                            <span className="option">{option}</span>
                        </div>
                    ))}
                <span className="param">{param}</span>
            </div>
        </StyledSwitch>
    );
};

export default SwitchParameter;
