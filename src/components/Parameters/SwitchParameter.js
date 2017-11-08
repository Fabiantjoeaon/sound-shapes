import React from 'react';
import styled from 'styled-components';

const StyledSwitch = styled.div`
    height: ${props => props.height}%;
    width: ${props => props.width}%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    font-size: 0.7em;
    font-family: 'Rubik Regular', sans-serif;
    text-transform: uppercase;

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
                background-color: #f79139;
            }
        }   
    }
`;

const StyledCircle = styled.span`
    border-radius: 100%;
    height: 10px;
    width: 10px;
    border: 1px solid #f79139;

    ~ span {
        padding-left: 5px;
        color: #7f7f7f;
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
