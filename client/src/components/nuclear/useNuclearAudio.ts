let audioCtx: AudioContext | null = null;
let sirenNodes: OscillatorNode[] = [];
let sirenGain: GainNode | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

/**
 * Nuclear air raid siren — layered for realism:
 * 1. Main siren: slow rise/fall sweep 200-500Hz (like real Soviet civil defense siren)
 * 2. Sub-bass rumble: 40Hz foundation
 * 3. Harmonic overtone: adds urgency
 */
export function startSiren() {
  const ctx = getCtx();
  if (sirenGain) return;

  sirenGain = ctx.createGain();
  sirenGain.gain.setValueAtTime(0.05, ctx.currentTime);
  sirenGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 1.5);
  sirenGain.connect(ctx.destination);

  // === Layer 1: Main siren — slow sweep 200↔500Hz ===
  const main = ctx.createOscillator();
  main.type = "sawtooth";
  main.frequency.value = 350;

  const mainLfo = ctx.createOscillator();
  mainLfo.type = "sine";
  mainLfo.frequency.value = 0.15; // very slow — full cycle every ~7 seconds
  const mainLfoGain = ctx.createGain();
  mainLfoGain.gain.value = 150; // sweep ±150Hz around 350 = 200↔500Hz
  mainLfo.connect(mainLfoGain);
  mainLfoGain.connect(main.frequency);

  // Low-pass to remove harsh highs — keep it ominous
  const mainFilter = ctx.createBiquadFilter();
  mainFilter.type = "lowpass";
  mainFilter.frequency.value = 600;
  mainFilter.Q.value = 2;

  const mainGain = ctx.createGain();
  mainGain.gain.value = 0.5;

  main.connect(mainFilter);
  mainFilter.connect(mainGain);
  mainGain.connect(sirenGain);
  main.start();
  mainLfo.start();

  // === Layer 2: Sub-bass rumble — 40Hz steady ===
  const sub = ctx.createOscillator();
  sub.type = "sine";
  sub.frequency.value = 40;
  const subGain = ctx.createGain();
  subGain.gain.value = 0.4;
  sub.connect(subGain);
  subGain.connect(sirenGain);
  sub.start();

  // === Layer 3: High harmonic — thin sweep for urgency ===
  const high = ctx.createOscillator();
  high.type = "sine";
  high.frequency.value = 700;

  const highLfo = ctx.createOscillator();
  highLfo.type = "sine";
  highLfo.frequency.value = 0.15;
  const highLfoGain = ctx.createGain();
  highLfoGain.gain.value = 300;
  highLfo.connect(highLfoGain);
  highLfoGain.connect(high.frequency);

  const highGain = ctx.createGain();
  highGain.gain.value = 0.1;
  high.connect(highGain);
  highGain.connect(sirenGain);
  high.start();
  highLfo.start();

  sirenNodes = [main, mainLfo, sub, high, highLfo];
}

export function stopSiren() {
  if (sirenGain && audioCtx) {
    sirenGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1);
    setTimeout(() => {
      sirenNodes.forEach((n) => { try { n.stop(); } catch {} });
      sirenNodes = [];
      sirenGain = null;
    }, 1100);
  }
}

/** Impact explosion — low freq thump + noise burst */
export function playImpact() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  // Low thump
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(60, now);
  osc.frequency.exponentialRampToValueAtTime(20, now + 0.3);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.6);

  // Noise burst
  const len = 0.2;
  const buf = ctx.createBuffer(1, ctx.sampleRate * len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) {
    const t = i / d.length;
    d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 2.5);
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 600;
  const nGain = ctx.createGain();
  nGain.gain.setValueAtTime(0.08, now);
  nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
  src.connect(lp).connect(nGain).connect(ctx.destination);
  src.start(now);

  // 30% chance: delayed echo (boom bouncing off terrain)
  if (Math.random() < 0.3) {
    const echoDelay = 0.2 + Math.random() * 0.1;
    const echoOsc = ctx.createOscillator();
    echoOsc.type = "sine";
    echoOsc.frequency.setValueAtTime(50, now + echoDelay);
    echoOsc.frequency.exponentialRampToValueAtTime(18, now + echoDelay + 0.3);
    const echoGain = ctx.createGain();
    echoGain.gain.setValueAtTime(0.05, now + echoDelay);
    echoGain.gain.exponentialRampToValueAtTime(0.001, now + echoDelay + 0.4);
    echoOsc.connect(echoGain).connect(ctx.destination);
    echoOsc.start(now + echoDelay);
    echoOsc.stop(now + echoDelay + 0.5);
  }
}

/** Radar beep */
export function playRadarBeep() {
  const ctx = getCtx();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 1000;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.045, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.15);
}

/** Launch alarm — rapid beep-beep */
export function playAlarmBeep() {
  const ctx = getCtx();
  const now = ctx.currentTime;
  for (let i = 0; i < 3; i++) {
    const t = now + i * 0.15;
    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.value = 800;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.04, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.1);
  }
}

/** Kill everything */
export function killAllAudio() {
  stopSiren();
  if (audioCtx) {
    audioCtx.close();
    audioCtx = null;
  }
}
