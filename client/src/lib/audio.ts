let audioCtx: AudioContext | null = null;
let ambientSource: AudioBufferSourceNode | null = null;
let ambientGain: GainNode | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

/** Resume AudioContext after user gesture */
export function resumeAudio() {
  const ctx = getCtx();
  if (ctx.state === "suspended") ctx.resume();
}

/* ═══════════════════════════════════════════
   KEYSTROKE SOUNDS — Soviet Teletype Style
   5 variations, randomly picked each call
   ═══════════════════════════════════════════ */

type KeystrokeVariant = (ctx: AudioContext, now: number) => void;

/**
 * Variant 1: Heavy mechanical strike
 * The main key going down — heavy solenoid impact + metal spring resonance
 */
const keystrokeHeavyStrike: KeystrokeVariant = (ctx, now) => {
  // Impact: short noise burst, low-pass filtered
  const impactLen = 0.025;
  const buf = ctx.createBuffer(1, ctx.sampleRate * impactLen, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) {
    const t = i / d.length;
    d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 4) * 1.5;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;

  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 1800;
  lp.Q.value = 2;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  src.connect(lp).connect(gain).connect(ctx.destination);
  src.start(now);
  src.stop(now + impactLen);

  // Spring resonance — damped sine at ~350Hz
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 320 + Math.random() * 80;
  const oscGain = ctx.createGain();
  oscGain.gain.setValueAtTime(0.015, now + 0.005);
  oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
  osc.connect(oscGain).connect(ctx.destination);
  osc.start(now + 0.003);
  osc.stop(now + 0.07);
};

/**
 * Variant 2: Teletype hammer
 * A sharp metallic impact — like a print head striking paper through ribbon
 */
const keystrokeTeletypeHammer: KeystrokeVariant = (ctx, now) => {
  // Sharp metallic transient
  const len = 0.018;
  const buf = ctx.createBuffer(1, ctx.sampleRate * len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) {
    const t = i / d.length;
    // Metallic: mix of noise and high-frequency ring
    d[i] =
      ((Math.random() * 2 - 1) * 0.6 + Math.sin(i * 0.8) * 0.4) *
      Math.pow(1 - t, 6);
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;

  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 2500;
  bp.Q.value = 3;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

  src.connect(bp).connect(gain).connect(ctx.destination);
  src.start(now);
  src.stop(now + len);

  // Paper/platen thud — very low thump
  const thud = ctx.createOscillator();
  thud.type = "sine";
  thud.frequency.value = 100 + Math.random() * 30;
  const thudGain = ctx.createGain();
  thudGain.gain.setValueAtTime(0.012, now);
  thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
  thud.connect(thudGain).connect(ctx.destination);
  thud.start(now);
  thud.stop(now + 0.04);
};

/**
 * Variant 3: Relay click
 * Electromagnetic relay engaging — two distinct clicks (contact + armature)
 */
const keystrokeRelayClick: KeystrokeVariant = (ctx, now) => {
  // First click — contact
  const click1 = makeClickBurst(ctx, 0.008, 4000, 4);
  const g1 = ctx.createGain();
  g1.gain.setValueAtTime(0.05, now);
  g1.gain.exponentialRampToValueAtTime(0.001, now + 0.012);
  click1.connect(g1).connect(ctx.destination);
  click1.start(now);
  click1.stop(now + 0.01);

  // Second click — armature settling, slightly delayed
  const click2 = makeClickBurst(ctx, 0.006, 3000, 3);
  const g2 = ctx.createGain();
  g2.gain.setValueAtTime(0.025, now + 0.015);
  g2.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
  click2.connect(g2).connect(ctx.destination);
  click2.start(now + 0.014);
  click2.stop(now + 0.024);
};

/**
 * Variant 4: Solenoid punch
 * Heavy solenoid actuator — thunk + mechanical rattle
 */
const keystrokeSolenoidPunch: KeystrokeVariant = (ctx, now) => {
  // Thunk — filtered noise with strong low end
  const len = 0.03;
  const buf = ctx.createBuffer(1, ctx.sampleRate * len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) {
    const t = i / d.length;
    d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 3);
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;

  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 1200;
  lp.Q.value = 1.5;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

  src.connect(lp).connect(gain).connect(ctx.destination);
  src.start(now);
  src.stop(now + len);

  // Rattle — rapid decaying oscillation
  const rattle = ctx.createOscillator();
  rattle.type = "triangle";
  rattle.frequency.setValueAtTime(600, now + 0.01);
  rattle.frequency.exponentialRampToValueAtTime(200, now + 0.06);
  const rattleGain = ctx.createGain();
  rattleGain.gain.setValueAtTime(0.01, now + 0.01);
  rattleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
  rattle.connect(rattleGain).connect(ctx.destination);
  rattle.start(now + 0.008);
  rattle.stop(now + 0.07);
};

/**
 * Variant 5: Typewriter key
 * Classic mechanical typewriter — key lever + typebar striking + carriage
 */
const keystrokeTypewriterKey: KeystrokeVariant = (ctx, now) => {
  // Key lever — soft click
  const leverLen = 0.01;
  const leverBuf = ctx.createBuffer(1, ctx.sampleRate * leverLen, ctx.sampleRate);
  const ld = leverBuf.getChannelData(0);
  for (let i = 0; i < ld.length; i++) {
    const t = i / ld.length;
    ld[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 8);
  }
  const leverSrc = ctx.createBufferSource();
  leverSrc.buffer = leverBuf;
  const leverGain = ctx.createGain();
  leverGain.gain.setValueAtTime(0.025, now);
  leverGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 2000;

  leverSrc.connect(hp).connect(leverGain).connect(ctx.destination);
  leverSrc.start(now);
  leverSrc.stop(now + leverLen);

  // Typebar strike — delayed metallic hit
  const strikeLen = 0.015;
  const strikeBuf = ctx.createBuffer(1, ctx.sampleRate * strikeLen, ctx.sampleRate);
  const sd = strikeBuf.getChannelData(0);
  for (let i = 0; i < sd.length; i++) {
    const t = i / sd.length;
    sd[i] =
      ((Math.random() * 2 - 1) * 0.5 + Math.sin(i * 1.2) * 0.5) *
      Math.pow(1 - t, 5);
  }
  const strikeSrc = ctx.createBufferSource();
  strikeSrc.buffer = strikeBuf;
  const strikeGain = ctx.createGain();
  strikeGain.gain.setValueAtTime(0.06, now + 0.012);
  strikeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 2200;
  bp.Q.value = 2;

  strikeSrc.connect(bp).connect(strikeGain).connect(ctx.destination);
  strikeSrc.start(now + 0.01);
  strikeSrc.stop(now + 0.01 + strikeLen);
};

const KEYSTROKE_VARIANTS: KeystrokeVariant[] = [
  keystrokeHeavyStrike,
  keystrokeTeletypeHammer,
  keystrokeRelayClick,
  keystrokeSolenoidPunch,
  keystrokeTypewriterKey,
];

let lastVariant = -1;

/** Play a random keystroke — never the same variant twice in a row */
export function playKeystroke() {
  const ctx = getCtx();
  let idx = Math.floor(Math.random() * KEYSTROKE_VARIANTS.length);
  if (idx === lastVariant) idx = (idx + 1) % KEYSTROKE_VARIANTS.length;
  lastVariant = idx;
  KEYSTROKE_VARIANTS[idx](ctx, ctx.currentTime);
}

/* ═══════════════════════════════════
   AMBIENT HUM — Soviet electronics
   ═══════════════════════════════════ */

/** Start a continuous 50Hz mains hum + CRT whine (very subtle) */
export function startAmbientHum() {
  const ctx = getCtx();
  if (ambientSource) return;

  // Create a looping buffer of electrical hum
  const duration = 2;
  const len = ctx.sampleRate * duration;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);

  for (let i = 0; i < len; i++) {
    const t = i / ctx.sampleRate;
    // 50Hz mains hum (European) + harmonics
    d[i] =
      Math.sin(t * 2 * Math.PI * 50) * 0.3 +
      Math.sin(t * 2 * Math.PI * 100) * 0.2 +
      Math.sin(t * 2 * Math.PI * 150) * 0.1 +
      Math.sin(t * 2 * Math.PI * 200) * 0.05 +
      // Subtle random crackle
      (Math.random() * 2 - 1) * 0.02;
  }

  ambientSource = ctx.createBufferSource();
  ambientSource.buffer = buf;
  ambientSource.loop = true;

  ambientGain = ctx.createGain();
  ambientGain.gain.setValueAtTime(0, ctx.currentTime);
  ambientGain.gain.linearRampToValueAtTime(0.008, ctx.currentTime + 2);

  ambientSource.connect(ambientGain).connect(ctx.destination);
  ambientSource.start();
}

/** Fade out and stop ambient hum */
export function stopAmbientHum() {
  if (ambientGain && audioCtx) {
    ambientGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
    setTimeout(() => {
      ambientSource?.stop();
      ambientSource = null;
      ambientGain = null;
    }, 600);
  }
}

/* ═══════════════════════════════════
   SYSTEM SOUNDS
   ═══════════════════════════════════ */

/** BIOS POST beep — sharp square wave */
export function playBootBeep() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  osc.type = "square";
  osc.frequency.value = 1000;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.05, now);
  gain.gain.setValueAtTime(0.05, now + 0.12);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.2);
}

/** Success — two ascending tones, warmer */
export function playSuccessChime() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  [700, 1050].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, now + i * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.25);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + i * 0.1);
    osc.stop(now + i * 0.1 + 0.3);
  });
}

/** HDD seek — mechanical servo noise */
export function playDiskSeek() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  // Rapid series of tiny clicks simulating head stepping
  const steps = 3 + Math.floor(Math.random() * 4);
  for (let s = 0; s < steps; s++) {
    const t = now + s * 0.018;
    const clickLen = 0.006;
    const buf = ctx.createBuffer(1, ctx.sampleRate * clickLen, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) {
      const p = i / d.length;
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - p, 6) * 0.8;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;

    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 1800 + Math.random() * 600;
    bp.Q.value = 4;

    const gain = ctx.createGain();
    gain.gain.value = 0.06;

    src.connect(bp).connect(gain).connect(ctx.destination);
    src.start(t);
    src.stop(t + clickLen);
  }
}

/** CRT power-on sound — degauss + static */
export function playCRTOn() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  // Degauss thump
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(60, now);
  osc.frequency.exponentialRampToValueAtTime(180, now + 0.3);
  osc.frequency.exponentialRampToValueAtTime(60, now + 0.6);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.025, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.9);

  // Static crackle
  const staticLen = 0.5;
  const buf = ctx.createBuffer(1, ctx.sampleRate * staticLen, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) {
    const t = i / d.length;
    d[i] = (Math.random() * 2 - 1) * (1 - t) * 0.3 * (Math.random() > 0.7 ? 1 : 0.1);
  }
  const staticSrc = ctx.createBufferSource();
  staticSrc.buffer = buf;
  const staticGain = ctx.createGain();
  staticGain.gain.setValueAtTime(0.015, now + 0.1);
  staticGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
  staticSrc.connect(staticGain).connect(ctx.destination);
  staticSrc.start(now + 0.1);
  staticSrc.stop(now + 0.6);
}

/* ═══════════════════════════════════════════
   UI SOUNDS — Section transitions, interactions
   ═══════════════════════════════════════════ */

/** Carriage return / Enter key sound */
export function playEnterKey() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  // Mechanical return thunk
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.exponentialRampToValueAtTime(80, now + 0.06);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now); osc.stop(now + 0.1);

  // Click
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.015, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 5);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const cg = ctx.createGain();
  cg.gain.value = 0.1;
  src.connect(cg).connect(ctx.destination);
  src.start(now);
}

/** Nuclear alert klaxon — ominous warning when pressing the launch button */
export function playNuclearAlert() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  // Three descending warning tones
  [600, 500, 400].forEach((freq, i) => {
    const t = now + i * 0.25;
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = freq;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 800;
    filter.Q.value = 2;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(filter).connect(gain).connect(ctx.destination);
    osc.start(t); osc.stop(t + 0.25);
  });

  // Low rumble underneath
  const rumble = ctx.createOscillator();
  rumble.type = "sine";
  rumble.frequency.value = 50;
  const rGain = ctx.createGain();
  rGain.gain.setValueAtTime(0.08, now);
  rGain.gain.exponentialRampToValueAtTime(0.001, now + 1);
  rumble.connect(rGain).connect(ctx.destination);
  rumble.start(now); rumble.stop(now + 1.1);
}

/** Button click — subtle feedback */
export function playButtonClick() {
  const ctx = getCtx();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 600;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now); osc.stop(now + 0.06);
}

/** Section enter — subtle digital "scan" beep */
export function playSectionEnter() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  // Short ascending sweep
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.2);

  // Click
  const clickLen = 0.01;
  const buf = ctx.createBuffer(1, ctx.sampleRate * clickLen, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) {
    d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 6);
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const cGain = ctx.createGain();
  cGain.gain.value = 0.08;
  src.connect(cGain).connect(ctx.destination);
  src.start(now);
}

/** Hack/glitch sound — for Soviet transition (data corruption noise) */
export function playHackGlitch() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  // Distorted digital noise — rapid frequency jumps
  for (let i = 0; i < 6; i++) {
    const t = now + i * 0.12;
    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.value = 200 + Math.random() * 2000;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 500 + Math.random() * 1500;
    bp.Q.value = 5;

    osc.connect(bp).connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.1);
  }

  // Static crackle underneath
  const staticLen = 0.8;
  const buf = ctx.createBuffer(1, ctx.sampleRate * staticLen, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) {
    const t = i / d.length;
    d[i] = (Math.random() * 2 - 1) * 0.5 * (Math.random() > 0.6 ? 1 : 0.1) * (1 - t * 0.5);
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 2000;
  const sGain = ctx.createGain();
  sGain.gain.setValueAtTime(0.1, now);
  sGain.gain.linearRampToValueAtTime(0.02, now + staticLen);
  src.connect(lp).connect(sGain).connect(ctx.destination);
  src.start(now);
}

/** Stamp impact — heavy thud for classification stamps */
export function playStampHit() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(120, now);
  osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.3);

  // Paper slap noise
  const len = 0.04;
  const buf = ctx.createBuffer(1, ctx.sampleRate * len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) {
    d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3);
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const nGain = ctx.createGain();
  nGain.gain.value = 0.15;
  src.connect(nGain).connect(ctx.destination);
  src.start(now);
}

/* ═══════════════════════════════════════════
   SITE AMBIENT — Dark cinematic synth pad
   ═══════════════════════════════════════════ */

let siteAmbientNodes: OscillatorNode[] = [];
let siteAmbientGain: GainNode | null = null;
let siteNoiseSource: AudioBufferSourceNode | null = null;

/**
 * Dark minor chord drone — Blade Runner-inspired.
 * C2 + Eb2 + G2 + Bb2 (Cm7) as filtered sine waves with slow LFO movement.
 * Plus filtered white noise for "server room" texture.
 */
export function startSiteAmbient() {
  const ctx = getCtx();
  if (siteAmbientGain) return;

  siteAmbientGain = ctx.createGain();
  siteAmbientGain.gain.setValueAtTime(0, ctx.currentTime);
  siteAmbientGain.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 3);
  siteAmbientGain.connect(ctx.destination);

  // Cm7 chord — very low, filtered
  const freqs = [65.41, 77.78, 98.0, 116.54]; // C2, Eb2, G2, Bb2

  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;

    // Slow LFO for subtle movement (detuning)
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.08 + i * 0.03; // slightly different per note
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 1.5; // ±1.5Hz detune
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start();

    // Low-pass filter — keeps it dark and warm
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 200;
    filter.Q.value = 0.7;

    const oscGain = ctx.createGain();
    oscGain.gain.value = 0.35; // balanced per oscillator

    osc.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(siteAmbientGain!);
    osc.start();

    siteAmbientNodes.push(osc, lfo);
  });

  // Filtered noise — server room hiss
  const noiseDuration = 4;
  const noiseLen = ctx.sampleRate * noiseDuration;
  const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
  const nd = noiseBuf.getChannelData(0);
  for (let i = 0; i < noiseLen; i++) {
    nd[i] = (Math.random() * 2 - 1);
  }

  siteNoiseSource = ctx.createBufferSource();
  siteNoiseSource.buffer = noiseBuf;
  siteNoiseSource.loop = true;

  const noiseLp = ctx.createBiquadFilter();
  noiseLp.type = "lowpass";
  noiseLp.frequency.value = 300;
  noiseLp.Q.value = 0.5;

  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.15;

  siteNoiseSource.connect(noiseLp);
  noiseLp.connect(noiseGain);
  noiseGain.connect(siteAmbientGain);
  siteNoiseSource.start();
}

/** Fade out and stop site ambient */
export function stopSiteAmbient() {
  if (siteAmbientGain && audioCtx) {
    siteAmbientGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
    setTimeout(() => {
      siteAmbientNodes.forEach((n) => { try { n.stop(); } catch {} });
      siteAmbientNodes = [];
      try { siteNoiseSource?.stop(); } catch {}
      siteNoiseSource = null;
      siteAmbientGain = null;
    }, 1600);
  }
}

/** Mute/unmute the site ambient */
export function setSiteAmbientMuted(muted: boolean) {
  if (siteAmbientGain && audioCtx) {
    siteAmbientGain.gain.linearRampToValueAtTime(
      muted ? 0 : 0.14,
      audioCtx.currentTime + 0.5,
    );
  }
}

/* ═══════════════════════════════════
   HELPERS
   ═══════════════════════════════════ */

function makeClickBurst(
  ctx: AudioContext,
  duration: number,
  freq: number,
  q: number,
): AudioBufferSourceNode {
  const buf = ctx.createBuffer(
    1,
    ctx.sampleRate * duration,
    ctx.sampleRate,
  );
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) {
    const t = i / d.length;
    d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 10);
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;

  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = freq;
  bp.Q.value = q;
  src.connect(bp);

  // Return the filter node as the "output" by reassigning connect
  const origConnect = src.connect.bind(src);
  src.connect = ((dest: AudioNode) => {
    bp.connect(dest);
    return dest;
  }) as typeof src.connect;
  void origConnect;

  return src;
}
