import {
    OmniOscillator,
    AmplitudeEnvelope,
    Filter,
    Freeverb,
    FrequencyEnvelope
} from 'tone';

const initSynth = () => {
    const oscillatorA = new OmniOscillator({ volume: 3 }).start();
    const oscillatorB = new OmniOscillator({ volume: 3 }).start();
    const ampEnvelope = new AmplitudeEnvelope();
    const reverb = new Freeverb();
    const filter = new Filter({ Q: 12 });
    const filterEnvelope = new FrequencyEnvelope();

    filterEnvelope.connect(filter.frequency);
    oscillatorA.chain(ampEnvelope, reverb, filter);
    oscillatorB.chain(ampEnvelope, reverb, filter);

    ampEnvelope.toMaster();
    reverb.toMaster();
    filter.toMaster();

    return {
        oscillatorA,
        oscillatorB,
        ampEnvelope,
        filter,
        filterEnvelope,
        reverb
    };
};

export default initSynth;
