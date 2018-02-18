import Tone, {
    Compressor,
    OmniOscillator,
    AmplitudeEnvelope,
    Filter,
    Freeverb,
    FrequencyEnvelope,
    Master,
    AutoFilter,
    FeedbackDelay,
    Noise,
    Transport,
    PolySynth,
    Instrument,
    Synth,
    TransportTime
} from 'tone';

export default function initSynth() {
    const oscillatorA = new OmniOscillator({volume: 24}).start();
    const oscillatorB = new OmniOscillator({volume: 24}).start();
    const ampEnvelope = new AmplitudeEnvelope().toMaster();
    const reverb = new Freeverb({wet: 0}).toMaster();
    const filter = new Filter({Q: 12}).toMaster();
    const filterEnvelope = new FrequencyEnvelope();
    const lowFrequencyOscillator = new AutoFilter()
        .toMaster()
        .start();
    const delay = new FeedbackDelay({wet: 0}).toMaster();
    const noise = new Noise({volume: -40}).toMaster();
    const instrument = new Instrument();
    const master = Master;
    const transport = Transport;

    /**
     * Chain i/o's to oscillators and connect
     * filter envelope
     */
    filterEnvelope.connect(filter.frequency);
    oscillatorA.chain(ampEnvelope, lowFrequencyOscillator, filter, delay, reverb);
    oscillatorB.chain(ampEnvelope, lowFrequencyOscillator, filter, delay, reverb);

    /**
     * Setup compressor and chain to master
     */
    const masterCompressor = new Compressor({threshold: -6, ratio: 3, attack: 0.5, release: 0.1});
    const lowBump = new Filter(200, 'lowshelf');
    master.chain(lowBump, masterCompressor);
    master.volume.value = -35;

    /**
     * Setup transport
     */
    transport.bpm.value = 60;
    transport.loop = true;
    transport.timeSignature = [4, 4];
    transport.loopStart = new TransportTime('0:0:0');
    transport.loopEnd = new TransportTime('0:1:0');

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
        transport,
        isVisible: true
    };
}
