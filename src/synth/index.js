import { OmniOscillator, AmplitudeEnvelope, Normalize } from 'tone';

const initSynth = () => {
    const oscillatorA = new OmniOscillator().start();
    const oscillatorB = new OmniOscillator().start();
    const ampEnvelope = new AmplitudeEnvelope();

    oscillatorA.connect(ampEnvelope);
    oscillatorB.connect(ampEnvelope);
    ampEnvelope.toMaster();

    // const normalize = new Normalize(0, 1);
    // oscillatorA.connect(normalize);
    // oscillatorB.connect(normalize);
    // ampEnvelope.connect(normalize);

    return { oscillatorA, oscillatorB, ampEnvelope };
};

export default initSynth;
