import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import styled from 'styled-components';

import config from '../../synth/config';
import StyledParameter from '../styled/StyledParameter';
const { colors } = config;

const StyledSwitch = styled.div`
    height: 100%;
    max-height: 130px;
    width: ${props => props.width}%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    position: relative;
    font-family: 'Rubik Light', sans-serif;
    color: ${colors.white};
    
    .inner {
        // height: calc(15px * ${props => props.optionLength});
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
                transition: all 0.2s cubic-bezier(0.7, 0, 0.3, 1);
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
    transition: all 0.2s cubic-bezier(0.7, 0, 0.3, 1);
`;

export default class SwitchParameter extends Component {
    componentDidMount() {
        const node = findDOMNode(this.node);
        const param = findDOMNode(this.param);

        node.addEventListener('mouseenter', () =>
            param.classList.add('active')
        );
        node.addEventListener('mouseleave', () =>
            param.classList.remove('active')
        );
    }

    componentWillUnmount() {
        const node = findDOMNode(this.node);
        const param = findDOMNode(this.param);
        node.removeEventListener('mouseenter', () =>
            param.classList.add('active')
        );
        node.removeEventListener('mouseleave', () =>
            param.classList.remove('active')
        );
    }

    render() {
        const {
            options,
            module,
            param,
            value,
            setParameter,
            setOctave,
            width,
            height
        } = this.props;
        return (
            <StyledSwitch
                width={width}
                height={height}
                optionLength={options.length}
                ref={node => (this.node = node)}
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
                </div>
                <StyledParameter
                    refProp={param => (this.param = param)}
                    param={param}
                />
            </StyledSwitch>
        );
    }
}
