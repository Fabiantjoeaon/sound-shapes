import '../helpers/range';

const config = {
    master: {
        volume: {
            min: -80,
            max: 5
        },
        pitch: {
            options: [...5]
        },
        transport: {
            min: 20,
            max: 200
        }
    },
    oscillators: {
        type: {
            options: [
                'sine',
                'triangle',
                'sawtooth',
                'square'
                // 'pulse', 'pwm', 'fatsawtooth'
            ]
        },
        detune: {
            min: -100,
            max: 100
        },
        phase: {
            options: ['0', '45', '90', '180']
        }
    },
    mixer: {
        oscillatorVolume: {
            min: 6,
            max: 24
        },
        noiseVolume: {
            min: -40,
            max: 26
        }
    },
    envelopes: {
        ADSR: {
            min: 0,
            max: 3
        }
    },
    filter: {
        type: {
            options: ['highpass', 'lowpass', 'bandpass']
        },
        rolloff: {
            options: ['-12', '-24', '-48']
        },
        frequency: {
            min: -5000,
            max: 5000
        },
        Q: {
            min: 0,
            max: 70
        },
        gain: {
            min: 0,
            max: 100
        }
    },
    lowFrequencyOscillator: {
        type: {
            options: ['sine', 'triangle', 'sawtooth', 'square']
        },
        frequency: {
            min: 0.1,
            max: 10
        },
        depth: {
            min: 0.01,
            max: 1
        }
    },
    reverb: {
        roomSize: {
            min: 0,
            max: 1
        },
        dampening: {
            min: 100,
            max: 3000
        },
        wet: {
            min: 0,
            max: 1
        }
    },
    delay: {
        delayTime: {
            min: 0,
            max: 1
        },
        feedback: {
            min: 0,
            max: 1
        },
        wet: {
            min: 0,
            max: 1
        }
    },
    colors: {
        primary: '247, 182, 136',
        white: '#fff',
        lightGray: '#f3f3f3',
        background: '#66717E'
    },
    gridGap: 12
};

export default config;
