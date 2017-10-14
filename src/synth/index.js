import {
    Compressor,
    OmniOscillator,
    AmplitudeEnvelope,
    Filter,
    Freeverb,
    FrequencyEnvelope,
    Master,
    AutoFilter,
    Oscillator,
    FeedbackDelay,
    Noise,
    Transport
} from 'tone';

const initSynth = () => {
    const oscillatorA = new OmniOscillator({ volume: 24 }).start();
    const oscillatorB = new OmniOscillator({ volume: 24 }).start();
    const ampEnvelope = new AmplitudeEnvelope();
    const reverb = new Freeverb({ wet: 0 });
    const filter = new Filter({ Q: 12 });
    const filterEnvelope = new FrequencyEnvelope();
    const lowFrequencyOscillator = new AutoFilter().toMaster().start();
    const delay = new FeedbackDelay({ wet: 0 });
    const noise = new Noise({ volume: -40 }).toMaster();
    const master = Master;
    const transport = Transport;

    /**
     * Chain i/o's to oscillators and connect
     * filter envelope
     */
    filterEnvelope.connect(filter.frequency);
    oscillatorA.chain(
        ampEnvelope,
        lowFrequencyOscillator,
        filter,
        delay,
        reverb
    );
    oscillatorB.chain(
        ampEnvelope,
        lowFrequencyOscillator,
        filter,
        delay,
        reverb
    );

    /**
     * TODO: Can be moved to assignments on top?
     */
    ampEnvelope.toMaster();
    filter.toMaster();
    delay.toMaster();
    reverb.toMaster();

    /**
     * Setup compressor and chain to master
     */
    const masterCompressor = new Compressor({
        threshold: -6,
        ratio: 3,
        attack: 0.5,
        release: 0.1
    });
    const lowBump = new Filter(200, 'lowshelf');
    master.chain(lowBump, masterCompressor);
    master.volume.value = -35;

    /**
     * Setup transport
     */
    transport.bpm.value = 120;
    transport.loop = true;
    transport.timeSignature = 4;
    transport.loopStart = '0:0';
    transport.loopEnd = '0:1';

    return {
        oscillatorA,
        oscillatorB,
        noise,
        ampEnvelope,
        filterEnvelope,
        filter,
        lowFrequencyOscillator,
        delay,
        reverb,
        master,
        transport
    };
};

// const setupLoop = transport => {

//     return transport;
// };

export default initSynth;
