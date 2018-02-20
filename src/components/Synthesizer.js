import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';
import styled from 'styled-components';
import WebMidi from 'webmidi';

import config from '../synth/config';
import Master from './modules/Master';
import Mixer from './modules/Mixer';
import Oscillator from './modules/Oscillator';
import AmpEnvelope from './modules/AmpEnvelope';
import FilterEnvelope from './modules/FilterEnvelope';
import Filter from './modules/Filter';
import LowFrequencyOscillator from './modules/LowFrequencyOscillator';
import Reverb from './modules/Reverb';
import Delay from './modules/Delay';
import OctaveControls from './modules/OctaveControls';
import Keyboard from './modules/Keyboard';
import Sequencer from './modules/Sequencer/index';
import {setParameter, setOctave, slideOctave, toggleSynthVisibility} from '../actions';
import {getNotesAsOctaves, getCurrentOctave} from '../reducers/octaveReducer';

const {colors, gridGap} = config;

const Container = styled.div `
    overflow-y: hidden;
`;
const ContainerInner = styled.div `
    transform: translate3d(
        0px,
        ${props => (props.isVisible
    ? '0px'
    : props.height + 'px')},
        0px
    );
    height: calc(450px + (${gridGap}px * 9));
    width: 100%;
    position: absolute;
    bottom: 0px;
    transition: transform 0.4s cubic-bezier(0.44, 0.27, 0.21, 0.75);
    transition-delay: ${props => (props.isVisible
    ? '0.8s'
    : '0s')};
    will-change: transform;
`;

const StyledWrapperInner = styled.div `
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;
const StyledSynthesizer = styled(StyledWrapperInner)`
    display: grid;
    padding-top: 10px;
    // background-color: ${colors.background};
    background-color: rgba(52,70,122, 0.2);
    grid-gap: ${gridGap}px;
    grid-template-columns: repeat(4, minmax(calc((100% - (4 * ${gridGap}px)) / 4), 1fr));
    grid-template-rows: repeat(10, calc(450px / 10));
    z-index: 2;
`;

const StyledBackground = styled(StyledWrapperInner)`
    z-index: 0;
    background-image: -webkit-repeating-radial-gradient(
        center center,
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.7) 1px,
        transparent 1px,
        transparent 100%
    );
    background-size: 2px 2px;
    transition: background-size 0.3s ease-out;
`;

const Toggle = styled.span `
    
    padding: 5px 10px;
    color: #fff;
    display: inline;
    font-family: 'Rubik Light',
    sans-serif;
    letter-spacing: 1px;
    cursor: pointer;
    position: absolute;
    bottom: 30px;
    right: 50px;
    transform: translate3d(
        0px,
        ${props => (props.isVisible
    ? '150px'
    : '0px')},
        0px
    );
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.3s ease-out, color 0.3s ease-out;
    transition-delay: ${props => (props.isVisible
    ? '0s'
    : '0.8s')};
    will-change: transform;

    &:hover {
        background-color: #fff;
        color: #000;
    }
`;

const DashboardToggle = styled.span `
    position: absolute;
    top: 20px;
    right: 15px;
    padding: 5px 10px;
    margin-right: 10px;
    color: #fff;
    font-family : 'Rubik Light', sans-serif;
    font-size: 1em;
    border: 1px solid #fff;
    transition: all 0.3s ease-out;
    cursor: pointer;

    &:hover {
        background-color: #fff;
        color: #14004c;
    }
`;

class Synthesizer extends Component {
    state = {
        height: 0
    };

    componentDidMount() {
        this.setState({
            height: findDOMNode(this.synth).offsetHeight
        });
        WebMidi.enable(err => {
            if (err) {
                console.log('WebMidi could not be enabled.', err);
                return;
            }
        });
    }

    toggle = () => this
        .props
        .toggleSynthVisibility(!this.props.isVisible);

    render() {
        const {
            synth,
            octave,
            setParameter,
            setOctave,
            slideOctave,
            keyboardNotes,
            sequencerNotes,
            currentOctave,
            isVisible
        } = this.props;
        const {height} = this.state;

        return (
            <Container>
                <Toggle isVisible={isVisible} onClick={this.toggle}>
                    Toggle
                </Toggle>
                <ContainerInner
                    ref={synth => (this.synth = synth)}
                    isVisible={isVisible}
                    height={height}>
                    <StyledBackground/>
                    <StyledSynthesizer>
                        <Oscillator
                            gridColumns="1 / span 1"
                            gridRows="1 / span 2"
                            oscillator={synth.oscillatorA}
                            setParameter={setParameter}
                            oscillatorId="A"
                            settings={config.oscillators}/>{' '}
                        <Oscillator
                            gridColumns="1 / span 1"
                            gridRows="3 / span 2"
                            oscillator={synth.oscillatorB}
                            setParameter={setParameter}
                            oscillatorId="B"
                            settings={config.oscillators}/>{' '}
                        <Mixer
                            gridColumns="2 / span 1"
                            gridRows="1 / span 2"
                            oscillatorA={synth.oscillatorA}
                            oscillatorB={synth.oscillatorB}
                            noise={synth.noise}
                            setParameter={setParameter}
                            settings={config.mixer}/>{' '}
                        <Keyboard
                            gridColumns="1 / span 4"
                            gridRows="10 / span 1"
                            notes={keyboardNotes}
                            currentOctave={currentOctave}
                            synth={synth}
                            settings={config.keyboard}/>{' '}
                        <AmpEnvelope
                            gridColumns="1 / span 1"
                            gridRows="5 / span 2"
                            ampEnvelope={synth.ampEnvelope}
                            setParameter={setParameter}
                            settings={config.envelopes}/>{' '}
                        <FilterEnvelope
                            gridColumns="1 / span 1"
                            gridRows="7 / span 2"
                            filterEnvelope={synth.filterEnvelope}
                            setParameter={setParameter}
                            settings={config.envelopes}/>{' '}
                        <Filter
                            gridColumns="2 / span 1"
                            gridRows="3 / span 4"
                            filter={synth.filter}
                            setParameter={setParameter}
                            settings={config.filter}/>{' '}
                        <LowFrequencyOscillator
                            gridColumns="2 / span 1"
                            gridRows="7 / span 2"
                            lowFrequencyOscillator={synth.lowFrequencyOscillator}
                            setParameter={setParameter}
                            settings={config.lowFrequencyOscillator}/>{' '}
                        <Delay
                            gridColumns="3 / span 1"
                            gridRows="1 / span 2"
                            delay={synth.delay}
                            setParameter={setParameter}
                            settings={config.delay}/>{' '}
                        <Reverb
                            gridColumns="3 / span 1"
                            gridRows="3 / span 2"
                            reverb={synth.reverb}
                            setParameter={setParameter}
                            settings={config.reverb}/>{' '}
                        <OctaveControls
                            gridColumns="4 / span 1"
                            gridRows="7 / span 2"
                            currentOctave={currentOctave}
                            setOctave={setOctave}
                            slideOctave={slideOctave}
                            setParameter={setParameter}
                            settings={config.master}/>{' '}
                        <DashboardToggle onClick={this.toggle}>Toggle</DashboardToggle>
                        <Master
                            gridColumns="4 / span 1"
                            gridRows="3 / span 2"
                            master={synth.master}
                            transport={synth.transport}
                            setParameter={setParameter}
                            settings={config.master}
                            toggleSynthVisibility={this.toggle}/>{' '}
                        <Sequencer
                            gridColumns="3 / span 1"
                            gridRows="5 / span 4"
                            notes={sequencerNotes}
                            octave={octave}
                            currentOctave={currentOctave}
                            synth={synth}
                            settings={config.sequencer}/>{' '}
                    </StyledSynthesizer>{' '}
                </ContainerInner>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    sequencerNotes: getNotesAsOctaves(state.octave, 1),
    keyboardNotes: getNotesAsOctaves(state.octave, 2),
    currentOctave: getCurrentOctave(state.octave),
    isVisible: state.synth.isVisible,
    ...state
});

const mapDispatchToProps = dispatch => ({
    setParameter(...args) {
        dispatch(setParameter(...args));
    },
    setOctave(octave) {
        dispatch(setOctave(octave));
    },
    slideOctave(movement) {
        dispatch(slideOctave(movement));
    },
    toggleSynthVisibility(isVisible) {
        dispatch(toggleSynthVisibility(isVisible));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Synthesizer);
