import { AudioClip } from "../audio/audioClip";

export class AudioManager {
    private audioClip: AudioClip;
    private context: AudioContext;
    private analyser: AnalyserNode;
    private analyserFrequencyAmplitudes: Uint8Array;

    constructor(playSound: boolean) {
        const contextConstructor = (window as any).AudioContext || (window as any).webkitAudioContext;
        this.context = new contextConstructor();

        this.analyser = this.context.createAnalyser();
        this.analyser.smoothingTimeConstant = 0.1;

        // const gain = this.context.createGain();
        // gain.gain.setValueAtTime(0, 0);
        // gain.connect(this.context.destination);

        this.audioClip = new AudioClip({
            autoplay: false,
            context: this.context,
            srcs: ["june_3rd.mp3", "june_3rd.wav"],
        });
        this.audioClip.node!.connect(this.analyser);
        if (playSound) {
            this.audioClip.node!.connect(this.context.destination);
        }

        this.analyser.fftSize = 2048;
        this.analyserFrequencyAmplitudes = new Uint8Array(this.analyser.frequencyBinCount);
    }

    public update() {
        this.analyser.getByteFrequencyData(this.analyserFrequencyAmplitudes);
    }

    public getFrequencyAmplitudes() {
        return this.analyserFrequencyAmplitudes;
    }

    public syncAudioClip(playbackBegin: number) {
        if (playbackBegin < 0) {
            this.audioClip.element.pause();
            this.audioClip.element.currentTime = 0;
        } else if (playbackBegin > Date.now()) {
            // schedule it in the future
            // TODO maybe make this more precize
            setTimeout(() => {
                this.audioClip.play();
            }, playbackBegin - Date.now());
        } else {
            // we're already playing
            const curPosition = (Date.now() - playbackBegin) / 1000;
            this.audioClip.play();
            this.audioClip.element.currentTime = curPosition;
        }
    }

    public isPlaying() {
        return !this.audioClip.element.paused;
    }
}