import {
    Compressor,
    OmniOscillator,
    AmplitudeEnvelope,
    Filter,
    Freeverb,
    FrequencyEnvelope,
    Master,
    AutoFilter,
    Oscillator
} from 'tone';

const initSynth = () => {
    const oscillatorA = new OmniOscillator({ volume: 24 }).start();
    const oscillatorB = new OmniOscillator({ volume: 24 }).start();
    const ampEnvelope = new AmplitudeEnvelope();
    const reverb = new Freeverb();
    const filter = new Filter({ Q: 12 });
    const filterEnvelope = new FrequencyEnvelope();
    const lowFrequencyOscillator = new AutoFilter().toMaster().start();

    filterEnvelope.connect(filter.frequency);
    oscillatorA.chain(ampEnvelope, lowFrequencyOscillator, filter, reverb);
    oscillatorB.chain(ampEnvelope, lowFrequencyOscillator, filter, reverb);

    ampEnvelope.toMaster();
    filter.toMaster();
    reverb.toMaster();

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
        filterEnvelope,
        filter,
        lowFrequencyOscillator,
        reverb,
        master: Master
    };
};

export default initSynth;
