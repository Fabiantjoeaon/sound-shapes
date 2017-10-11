import { OmniOscillator, AmplitudeEnvelope, Filter, Master, Gain } from 'tone';

const filter = new Filter({
    type: 'lowpass',
    frequency: 1000,
    rolloff: -48,
    Q: 1,
    gain: 0
});

const initSynth = () => {
    const oscillatorA = new OmniOscillator().start();
    const oscillatorB = new OmniOscillator().start();
    const ampEnvelope = new AmplitudeEnvelope();

    oscillatorA.connect(ampEnvelope);
    oscillatorB.connect(ampEnvelope);
    ampEnvelope.toMaster();

    return { oscillatorA, oscillatorB, ampEnvelope };
};

export default initSynth;
