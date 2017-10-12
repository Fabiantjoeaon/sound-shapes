import {
    Compressor,
    OmniOscillator,
    AmplitudeEnvelope,
    Filter,
    Freeverb,
    FrequencyEnvelope,
    Master
} from 'tone';

const initSynth = () => {
    const oscillatorA = new OmniOscillator({ volume: 24 }).start();
    const oscillatorB = new OmniOscillator({ volume: 24 }).start();
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

    const masterCompressor = new Compressor({
        threshold: -6,
        ratio: 3,
        attack: 0.5,
        release: 0.1
    });
    const lowBump = new Filter(200, 'lowshelf');
    Master.chain(lowBump, masterCompressor);
    Master.volume.value = -35;

    return {
        oscillatorA,
        oscillatorB,
        ampEnvelope,
        filter,
        filterEnvelope,
        reverb,
        master: Master
    };
};

export default initSynth;
