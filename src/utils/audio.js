/**
 * Self-contained ambient sound generator using Web Audio API.
 * Warm, relaxing lofi ambient chord pad.
 * No external mp3 files required, completely offline and reliable.
 */

class AmbientSoundEngine {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.oscillators = [];
    this.gainNode = null;
  }

  init() {
    if (this.audioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.audioCtx = new AudioContext();

    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, this.audioCtx.currentTime);

    // Warm low-pass filter
    this.filter = this.audioCtx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(450, this.audioCtx.currentTime);

    this.gainNode.connect(this.filter);
    this.filter.connect(this.audioCtx.destination);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  play() {
    this.init();
    if (!this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    this.stopOscillators();

    // Warm relaxing chord frequencies (Cmaj7 / E minor warm ambient tones)
    const freqs = [130.81, 164.81, 196.0, 246.94, 329.63];

    freqs.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const oscGain = this.audioCtx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      // Subtle detune for warm analog feel
      osc.detune.setValueAtTime((idx - 2) * 5, this.audioCtx.currentTime);

      oscGain.gain.setValueAtTime(0.05 / freqs.length, this.audioCtx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.gainNode);
      osc.start();
      this.oscillators.push(osc);
    });

    // Fade in
    this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
    this.gainNode.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.18, this.audioCtx.currentTime + 3);

    this.isPlaying = true;
  }

  stop() {
    if (!this.audioCtx || !this.gainNode) return;
    this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(0.001, this.audioCtx.currentTime + 1);

    setTimeout(() => {
      this.stopOscillators();
      this.isPlaying = false;
    }, 1000);
  }

  stopOscillators() {
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    this.oscillators = [];
  }
}

export const ambientSound = new AmbientSoundEngine();
