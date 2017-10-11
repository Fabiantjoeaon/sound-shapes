import { OmniOscillator, AmplitudeEnvelope, Filter, Master, Gain } from 'tone';

const filter = new Filter({
    type: 'lowpass',
    frequency: 1000,
    rolloff: -48,
    Q: 1,
    gain: 0
});

const initSynth = () => {
    const oscillator = new OmniOscillator().start();
    const ampEnvelope = new AmplitudeEnvelope();

    oscillator.connect(ampEnvelope);
    ampEnvelope.toMaster();

    return { oscillator, ampEnvelope };
};

export default initSynth;
