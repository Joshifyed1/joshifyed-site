import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Youtube, 
  Twitter, 
  Gamepad2, 
  BookOpen, 
  Flame, 
  ExternalLink, 
  Search, 
  Heart, 
  MessageSquare, 
  Share2, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Layers, 
  Eye, 
  ArrowRight, 
  Check, 
  Menu, 
  X as CloseIcon,
  Skull,
  Crosshair,
  Shield,
  Zap,
  ChevronRight,
  TrendingUp,
  Clock,
  Tag
} from 'lucide-react';

// ==========================================
// 1. YOUR CUSTOM DATA (EDIT TEXT & IMAGES HERE)
// ==========================================

const SAMPLE_BLOGS = [
  {
    id: 1,
    title: "Shadow Realm Descent: Navigating the PS5 Nocturne Engine",
    date: "Sep 10, 2026",
    category: "Gaming",
    readTime: "4 min read",
    summary: "Breaking down the mechanics of our latest boss clear, frame pacing tweaks, and capturing 4K HDR stream drops.",
    content: `When exploring brutal encounter designs, pacing is everything. Over the weekend stream, we spent 4 hours dissecting the phase-three attack sequences in Saros. 

The primary trick wasn't raw reaction speed—it was anticipating the audio cues right before the blood-sigil burst attacks. We mapped key defensive roll cancels to an optimal 45ms window.

Next week, we are dropping a complete breakdown Shorts series highlighting the routing shortcuts. Stay tuned to the channel!`,
    likes: 242,
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "The Solo Mining Experiment: 1.2 TH/s of Pure Decentralized Will",
    date: "Sep 06, 2026",
    category: "Hardware",
    readTime: "6 min read",
    summary: "Overclocking the custom Bitaxe rig, thermal balancing under heavy load, and hunting the golden ticket block.",
    content: `Running a solo node and mining hardware in the background is both an art and a discipline. After dialing in core voltages to 1180mV and optimizing Noctua fan ducting, we hit stable clock rates without heat throttle spikes.

Will we hit an independent block reward this year? Statistically improbable, but mathematically inevitable given enough hash patience. The rig blinks like a crimson beacon in the studio.`,
    likes: 318,
    banner: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "Blood Sigil Collection: Drop #01 Lookbook Revealed",
    date: "Aug 29, 2026",
    category: "Merch",
    readTime: "3 min read",
    summary: "High-density heavyweight fleece, metallic crimson embroidery, and ultra-wide custom desk mats are live on Fourthwall.",
    content: `We spent two months sampling textiles to ensure our oversized gothic hoodies don't fade after five washes. The blood-red embroidery on obsidian cotton hits the exact sinister aesthetic we wanted for the brand.

Every order through Fourthwall supports direct upgrades to our stream rig and local AI rendering workstation. Check out the showcase tab to grab yours.`,
    likes: 195,
    banner: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 4,
    title: "Automating Dark Lore with Local Neural Nodes",
    date: "Aug 18, 2026",
    category: "Creator Lore",
    readTime: "5 min read",
    summary: "Leveraging 70B parameter open-weights models to generate dynamic stream lore and interactive community prompts.",
    content: `Cloud APIs are convenient, but running uncensored, zero-latency local LLMs directly on unified high-bandwidth hardware is freedom. 

We now generate custom boss backstories, interactive chat fortune-telling, and soundstage triggers completely offline with zero subscription overhead.`,
    likes: 412,
    banner: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80"
  }
];

const MERCH_ITEMS = [
  {
    id: 1,
    title: "Sanctum Oversized Heavy Hoodie",
    price: "$68.00",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
    tag: "Heavyweight 450 GSM",
    url: "https://joshifyed.fourthwall.com"
  },
  {
    id: 2,
    title: "Crimson Eclipse Desk Mat (900x400mm)",
    price: "$34.00",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    tag: "Micro-Weave Stitched",
    url: "https://joshifyed.fourthwall.com"
  },
  {
    id: 3,
    title: "Obsidian Core Acid-Wash Tee",
    price: "$36.00",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
    tag: "Vintage Wash Finish",
    url: "https://joshifyed.fourthwall.com"
  },
  {
    id: 4,
    title: "Gothic Insignia Insulated Tumbler",
    price: "$28.00",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
    tag: "Double Wall Steel",
    url: "https://joshifyed.fourthwall.com"
  }
];

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Triple-Monitor Crimson Battlestation",
    category: "Studio",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Saros PS5 Boss Finale Clear Frame",
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Bitaxe Solo Miner Thermal Bench",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Blood Sigil Collection Sample Fits",
    category: "Merch",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Late Night Stream Layout & Soundboard",
    category: "Studio",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Gothic Typography Asset Exploration",
    category: "Art",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
  }
];

// ==========================================
// 2. RETRO ARCADE COMPONENT (BLOOD VOID & APEX)
// ==========================================

function ArcadeSection() {
  const [activeGame, setActiveGame] = useState('bloodVoid'); // 'bloodVoid' or 'crimsonApex'
  const canvasRef = useRef(null);
  
  // Blood Void State
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(1480);
  const [lives, setLives] = useState(3);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Crimson Apex State
  const [apexScore, setApexScore] = useState(0);
  const [apexTarget, setApexTarget] = useState({ x: 50, y: 50 });
  const [apexTimeLeft, setApexTimeLeft] = useState(15);
  const [apexActive, setApexActive] = useState(false);
  const [apexHigh, setApexHigh] = useState(24);

  // Controls for Blood Void
  const keysRef = useRef({});
  const gameStateRef = useRef({
    ship: { x: 300, y: 200, r: 14, a: -Math.PI / 2, rot: 0, thrust: false, xv: 0, yv: 0 },
    lasers: [],
    asteroids: [],
    particles: []
  });

  // Sound Synth Helper
  const playGothicTone = (freq, type = 'sine', duration = 0.08) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  };

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
      keysRef.current[e.code] = true;

      // Shoot on Space
      if (e.code === 'Space' && gameRunning) {
        shootLaser();
      }
    };

    const handleKeyUp = (e) => {
      keysRef.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameRunning]);

  const shootLaser = () => {
    const s = gameStateRef.current.ship;
    gameStateRef.current.lasers.push({
      x: s.x + 4 / 3 * s.r * Math.cos(s.a),
      y: s.y + 4 / 3 * s.r * Math.sin(s.a),
      xv: 7 * Math.cos(s.a),
      yv: 7 * Math.sin(s.a),
      life: 55
    });
    playGothicTone(320, 'triangle', 0.1);
  };

  // Initialize Blood Void Canvas Game Loop
  useEffect(() => {
    if (activeGame !== 'bloodVoid') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Spawn Void Orbs
    const spawnAsteroids = (count = 5) => {
      const ast = [];
      for (let i = 0; i < count; i++) {
        let x, y;
        do {
          x = Math.random() * canvas.width;
          y = Math.random() * canvas.height;
        } while (Math.hypot(x - canvas.width / 2, y - canvas.height / 2) < 100);

        ast.push({
          x,
          y,
          xv: (Math.random() - 0.5) * 1.8,
          yv: (Math.random() - 0.5) * 1.8,
          r: 28,
          vert: 8 + Math.floor(Math.random() * 4),
          offsets: Array.from({ length: 12 }, () => Math.random() * 0.4 + 0.8)
        });
      }
      gameStateRef.current.asteroids = ast;
    };

    if (gameStateRef.current.asteroids.length === 0) {
      spawnAsteroids(5);
    }

    let animId;

    const update = () => {
      ctx.fillStyle = '#060408';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle gothic grid lines
      ctx.strokeStyle = 'rgba(185, 28, 28, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const st = gameStateRef.current;
      const s = st.ship;

      if (gameRunning) {
        // Controls Handling
        if (keysRef.current['ArrowLeft'] || keysRef.current['KeyA']) {
          s.rot = -0.07;
        } else if (keysRef.current['ArrowRight'] || keysRef.current['KeyD']) {
          s.rot = 0.07;
        } else {
          s.rot = 0;
        }

        s.thrust = keysRef.current['ArrowUp'] || keysRef.current['KeyW'];

        // Ship Rotation & Movement
        s.a += s.rot;
        if (s.thrust) {
          s.xv += 0.15 * Math.cos(s.a);
          s.yv += 0.15 * Math.sin(s.a);

          // Crimson Thrust Sparks
          st.particles.push({
            x: s.x - s.r * Math.cos(s.a),
            y: s.y - s.r * Math.sin(s.a),
            xv: -Math.cos(s.a) + (Math.random() - 0.5) * 0.8,
            yv: -Math.sin(s.a) + (Math.random() - 0.5) * 0.8,
            life: 18,
            color: '#ef4444'
          });
        } else {
          s.xv *= 0.985;
          s.yv *= 0.985;
        }

        s.x += s.xv;
        s.y += s.yv;

        // Screen Wrap
        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;
      }

      // Draw Particles
      for (let i = st.particles.length - 1; i >= 0; i--) {
        const p = st.particles[i];
        p.x += p.xv;
        p.y += p.yv;
        p.life--;
        ctx.fillStyle = p.color || '#dc2626';
        ctx.globalAlpha = p.life / 20;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
        if (p.life <= 0) st.particles.splice(i, 1);
      }

      // Draw Lasers
      for (let i = st.lasers.length - 1; i >= 0; i--) {
        const l = st.lasers[i];
        l.x += l.xv;
        l.y += l.yv;
        l.life--;

        // Wrap Lasers
        if (l.x < 0) l.x = canvas.width;
        if (l.x > canvas.width) l.x = 0;
        if (l.y < 0) l.y = canvas.height;
        if (l.y > canvas.height) l.y = 0;

        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#f87171';
        ctx.beginPath();
        ctx.arc(l.x, l.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Asteroid Collision Check
        for (let j = st.asteroids.length - 1; j >= 0; j--) {
          const a = st.asteroids[j];
          if (Math.hypot(l.x - a.x, l.y - a.y) < a.r) {
            // Destroy Asteroid
            playGothicTone(160, 'sawtooth', 0.15);
            setScore(prev => {
              const updated = prev + 50;
              if (updated > highScore) setHighScore(updated);
              return updated;
            });

            // Burst particles
            for (let k = 0; k < 12; k++) {
              st.particles.push({
                x: a.x,
                y: a.y,
                xv: (Math.random() - 0.5) * 4,
                yv: (Math.random() - 0.5) * 4,
                life: 25,
                color: '#b91c1c'
              });
            }

            if (a.r > 16) {
              st.asteroids.push({
                x: a.x,
                y: a.y,
                xv: (Math.random() - 0.5) * 2.5,
                yv: (Math.random() - 0.5) * 2.5,
                r: a.r / 2,
                vert: 8,
                offsets: a.offsets
              });
            }

            st.asteroids.splice(j, 1);
            st.lasers.splice(i, 1);
            break;
          }
        }

        if (l.life <= 0) st.lasers.splice(i, 1);
      }

      // Check if all asteroids destroyed
      if (st.asteroids.length === 0 && gameRunning) {
        spawnAsteroids(6);
      }

      // Draw Void Sigil Asteroids
      st.asteroids.forEach(a => {
        if (gameRunning) {
          a.x += a.xv;
          a.y += a.yv;
          if (a.x < 0 - a.r) a.x = canvas.width + a.r;
          if (a.x > canvas.width + a.r) a.x = 0 - a.r;
          if (a.y < 0 - a.r) a.y = canvas.height + a.r;
          if (a.y > canvas.height + a.r) a.y = 0 - a.r;
        }

        ctx.strokeStyle = '#b91c1c';
        ctx.fillStyle = 'rgba(28, 10, 15, 0.7)';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        for (let i = 0; i < a.vert; i++) {
          const angle = (i * Math.PI * 2) / a.vert;
          const rad = a.r * (a.offsets[i] || 1);
          const px = a.x + rad * Math.cos(angle);
          const py = a.y + rad * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Check Ship Collision
        if (gameRunning && Math.hypot(s.x - a.x, s.y - a.y) < s.r + a.r) {
          playGothicTone(85, 'sawtooth', 0.3);
          setLives(l => {
            if (l <= 1) {
              setGameRunning(false);
              return 3;
            }
            return l - 1;
          });
          // Reset ship position
          s.x = canvas.width / 2;
          s.y = canvas.height / 2;
          s.xv = 0;
          s.yv = 0;
        }
      });

      // Draw Ship
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.a + Math.PI / 2);

      ctx.strokeStyle = '#ef4444';
      ctx.fillStyle = '#1c080d';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#dc2626';
      ctx.shadowBlur = 8;

      ctx.beginPath();
      ctx.moveTo(0, -s.r * 1.5);
      ctx.lineTo(-s.r, s.r);
      ctx.lineTo(0, s.r * 0.4);
      ctx.lineTo(s.r, s.r);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [gameRunning, activeGame, highScore]);

  // Crimson Apex Timer
  useEffect(() => {
    let timer;
    if (apexActive && apexTimeLeft > 0) {
      timer = setInterval(() => setApexTimeLeft(t => t - 1), 1000);
    } else if (apexTimeLeft === 0 && apexActive) {
      setApexActive(false);
      if (apexScore > apexHigh) setApexHigh(apexScore);
    }
    return () => clearInterval(timer);
  }, [apexActive, apexTimeLeft, apexScore, apexHigh]);

  const handleApexClick = () => {
    if (!apexActive) return;
    playGothicTone(580, 'sine', 0.06);
    setApexScore(s => s + 1);
    setApexTarget({
      x: 10 + Math.floor(Math.random() * 80),
      y: 15 + Math.floor(Math.random() * 70)
    });
  };

  const startApexGame = () => {
    setApexScore(0);
    setApexTimeLeft(15);
    setApexActive(true);
    setApexTarget({
      x: 15 + Math.floor(Math.random() * 70),
      y: 20 + Math.floor(Math.random() * 60)
    });
  };

  return (
    <div className="bg-[#0c0810] border border-red-950/80 rounded-2xl overflow-hidden shadow-2xl shadow-red-950/30">
      {/* Arcade Header */}
      <div className="p-4 sm:p-6 border-b border-red-900/30 flex flex-wrap items-center justify-between gap-4 bg-black/40">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-700/40 text-red-500">
            <Skull className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-black text-xl text-zinc-100 tracking-wide flex items-center gap-2">
              BLOOD VOID ARCADE
              <span className="text-[10px] uppercase font-sans tracking-widest px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800/50">Retro Engine</span>
            </h3>
            <p className="text-xs text-zinc-400">Playable gothic mini-games built directly into the realm.</p>
          </div>
        </div>

        {/* Game Switcher Tabs */}
        <div className="flex items-center gap-2 bg-[#140a12] p-1 rounded-xl border border-red-900/30">
          <button
            onClick={() => setActiveGame('bloodVoid')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeGame === 'bloodVoid'
                ? 'bg-red-900/80 text-white shadow-lg shadow-red-950'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Void Blaster
          </button>
          <button
            onClick={() => setActiveGame('crimsonApex')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeGame === 'crimsonApex'
                ? 'bg-red-900/80 text-white shadow-lg shadow-red-950'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Reflex Blitz (15s)
          </button>
        </div>
      </div>

      {/* Game Stage Area */}
      {activeGame === 'bloodVoid' ? (
        <div className="relative bg-[#060408] flex flex-col items-center p-4">
          <div className="w-full max-w-[650px] flex items-center justify-between mb-3 text-xs font-mono text-zinc-300">
            <div className="flex items-center gap-4">
              <span>SCORE: <strong className="text-red-400">{score}</strong></span>
              <span>HIGH: <strong className="text-zinc-400">{highScore}</strong></span>
              <span>LIVES: <strong className="text-red-500">{'♥ '.repeat(lives)}</strong></span>
            </div>
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-zinc-400 hover:text-red-400 transition"
              title="Toggle Audio"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-red-400" /> : <VolumeX className="w-4 h-4 text-zinc-600" />}
            </button>
          </div>

          <div className="relative border border-red-900/40 rounded-xl overflow-hidden shadow-inner max-w-full">
            <canvas 
              ref={canvasRef} 
              width={650} 
              height={380} 
              className="w-full h-auto block max-w-full bg-[#060408]"
            />

            {!gameRunning && (
              <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                <Skull className="w-12 h-12 text-red-600 mb-3 animate-pulse" />
                <h4 className="font-serif font-black text-2xl text-zinc-100 tracking-wide mb-1">ENTER THE VOID</h4>
                <p className="text-xs text-zinc-400 max-w-sm mb-5">
                  Rotate with <strong className="text-zinc-200">A / D</strong> or <strong className="text-zinc-200">Arrows</strong>. Thrusters with <strong className="text-zinc-200">W / Up</strong>. Fire blood beams with <strong className="text-red-400">Spacebar</strong>.
                </p>
                <button
                  onClick={() => {
                    setScore(0);
                    setLives(3);
                    setGameRunning(true);
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white font-serif font-bold text-sm tracking-wider uppercase rounded-xl shadow-lg shadow-red-950/80 transition-all transform hover:scale-105"
                >
                  Initiate Vessel
                </button>
              </div>
            )}
          </div>

          {/* On-screen controls for mobile/tablet */}
          <div className="flex sm:hidden items-center justify-center gap-3 mt-3">
            <button 
              onMouseDown={() => { keysRef.current['ArrowLeft'] = true; }} 
              onMouseUp={() => { keysRef.current['ArrowLeft'] = false; }}
              onTouchStart={() => { keysRef.current['ArrowLeft'] = true; }} 
              onTouchEnd={() => { keysRef.current['ArrowLeft'] = false; }}
              className="p-3 bg-red-950/40 border border-red-900/40 rounded-lg text-xs font-mono"
            >
              ◀ Turn
            </button>
            <button 
              onMouseDown={() => { keysRef.current['ArrowUp'] = true; }} 
              onMouseUp={() => { keysRef.current['ArrowUp'] = false; }}
              onTouchStart={() => { keysRef.current['ArrowUp'] = true; }} 
              onTouchEnd={() => { keysRef.current['ArrowUp'] = false; }}
              className="p-3 bg-red-950/40 border border-red-900/40 rounded-lg text-xs font-mono"
            >
              ▲ Thruster
            </button>
            <button 
              onMouseDown={() => { keysRef.current['ArrowRight'] = true; }} 
              onMouseUp={() => { keysRef.current['ArrowRight'] = false; }}
              onTouchStart={() => { keysRef.current['ArrowRight'] = true; }} 
              onTouchEnd={() => { keysRef.current['ArrowRight'] = false; }}
              className="p-3 bg-red-950/40 border border-red-900/40 rounded-lg text-xs font-mono"
            >
              Turn ▶
            </button>
            <button 
              onClick={shootLaser} 
              className="px-4 py-3 bg-red-700 text-white rounded-lg text-xs font-bold font-mono"
            >
              FIRE
            </button>
          </div>
        </div>
      ) : (
        <div className="relative bg-[#060408] p-6 flex flex-col items-center justify-center min-h-[420px]">
          <div className="w-full max-w-[500px] flex items-center justify-between mb-4 font-mono text-sm">
            <span>CLICKS: <strong className="text-red-400">{apexScore}</strong></span>
            <span>TIME: <strong className="text-amber-500">{apexTimeLeft}s</strong></span>
            <span>RECORD: <strong className="text-zinc-400">{apexHigh}</strong></span>
          </div>

          <div className="relative w-full max-w-[500px] h-[280px] bg-[#0c070e] border border-red-900/30 rounded-xl overflow-hidden shadow-inner">
            {apexActive ? (
              <button
                onClick={handleApexClick}
                style={{ left: `${apexTarget.x}%`, top: `${apexTarget.y}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-950 border-2 border-red-400 shadow-lg shadow-red-600/50 flex items-center justify-center transition-transform active:scale-90"
              >
                <Crosshair className="w-6 h-6 text-white animate-spin" />
              </button>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <Crosshair className="w-10 h-10 text-red-500 mb-2" />
                <h4 className="font-serif font-black text-xl text-zinc-100 mb-1">CRIMSON APEX TRIAL</h4>
                <p className="text-xs text-zinc-400 max-w-xs mb-4">
                  Strike the blood runes as swiftly as possible before the 15-second sand runs dry.
                </p>
                <button
                  onClick={startApexGame}
                  className="px-6 py-2.5 bg-red-800 hover:bg-red-700 text-white text-xs font-serif font-bold uppercase tracking-wider rounded-xl transition shadow-lg shadow-red-950"
                >
                  Start Reflex Trial
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. MAIN APPLICATION CONTAINER
// ==========================================

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'blog', 'arcade', 'merch', 'gallery'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Filter Blogs
  const filteredBlogs = SAMPLE_BLOGS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLike = (id) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#050407] text-zinc-100 font-sans selection:bg-red-800 selection:text-white">
      {/* Background Ambience Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-950/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-rose-950/15 rounded-full blur-[180px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1a0a14_1px,transparent_1px)] [background-size:28px_28px] opacity-25" />
      </div>

      {/* Top Banner Bar */}
      <div className="relative z-20 bg-gradient-to-r from-red-950 via-black to-red-950 border-b border-red-900/40 text-[11px] font-mono tracking-wider py-1.5 px-4 text-center text-red-300">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
          FOURTHWALL DROP IS LIVE &bull; WORLDWIDE EXPEDITION AVAILABLE &bull; USE CODE: SANCTUM
        </span>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#08050a]/90 border-b border-red-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-700 via-red-900 to-black p-0.5 shadow-lg shadow-red-950/50 group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-[#0b070f] rounded-[10px] flex items-center justify-center border border-red-600/30">
                <Skull className="w-5 h-5 text-red-500 group-hover:text-red-400 transition" />
              </div>
            </div>
            <div>
              <span className="font-serif font-black text-2xl tracking-wider text-white flex items-center gap-1">
                JOSHIFYED<span className="text-red-600">.</span>
              </span>
              <span className="block text-[10px] tracking-[0.25em] text-red-400/80 font-mono -mt-1">
                SANCTUM OF SHADOWS
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-[#100914] p-1.5 rounded-2xl border border-red-950/80">
            {[
              { id: 'home', label: 'Sanctum' },
              { id: 'blog', label: 'Chronicles' },
              { id: 'arcade', label: 'Blood Arcade' },
              { id: 'merch', label: 'Reliquary (Shop)' },
              { id: 'gallery', label: 'Shadows' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-red-900 to-red-950 text-white border border-red-600/40 shadow-lg shadow-red-950'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* External Outpost Links */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://youtube.com/@joshifyed"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-[#120a14] border border-red-950 text-zinc-400 hover:text-red-500 hover:border-red-800 transition shadow-sm"
              title="YouTube Outpost"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/joshifyed"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-[#120a14] border border-red-950 text-zinc-400 hover:text-red-400 hover:border-red-800 transition shadow-sm"
              title="X Broadcast"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://joshifyed.fourthwall.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-800 to-red-950 hover:from-red-700 hover:to-red-900 text-white text-xs font-serif font-bold tracking-wider uppercase border border-red-600/50 shadow-lg shadow-red-950 flex items-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-red-300" />
              <span>Fourthwall Store</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden p-2.5 rounded-xl bg-[#120a14] border border-red-900/40 text-zinc-300"
          >
            {mobileNavOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileNavOpen && (
          <div className="md:hidden bg-[#0a060d] border-b border-red-900/50 px-6 py-5 space-y-3">
            {[
              { id: 'home', label: 'Sanctum (Home)' },
              { id: 'blog', label: 'The Chronicles (Blog)' },
              { id: 'arcade', label: 'Blood Arcade' },
              { id: 'merch', label: 'The Reliquary (Shop)' },
              { id: 'gallery', label: 'Shadows (Gallery)' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileNavOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  activeTab === item.id ? 'bg-red-950 text-white border border-red-800' : 'text-zinc-400'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t border-red-950/80 flex items-center justify-around">
              <a href="https://youtube.com/@joshifyed" target="_blank" rel="noreferrer" className="text-zinc-400 flex items-center gap-1 text-xs">
                <Youtube className="w-4 h-4 text-red-500" /> YouTube
              </a>
              <a href="https://x.com/joshifyed" target="_blank" rel="noreferrer" className="text-zinc-400 flex items-center gap-1 text-xs">
                <Twitter className="w-4 h-4 text-red-400" /> X
              </a>
              <a href="https://joshifyed.fourthwall.com" target="_blank" rel="noreferrer" className="text-red-400 font-bold flex items-center gap-1 text-xs">
                <ShoppingBag className="w-4 h-4" /> Store
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Realm Body */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* ==================================== */}
        {/* VIEW: SANCTUM (HOME)                 */}
        {/* ==================================== */}
        {activeTab === 'home' && (
          <div className="space-y-16">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden border border-red-900/40 bg-gradient-to-b from-[#140810] via-[#0b060d] to-[#08050a] p-8 sm:p-14 shadow-2xl">
              <div className="absolute -right-20 -top-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-700/50 text-red-400 text-xs font-mono mb-6">
                  <Flame className="w-3.5 h-3.5 text-red-500" />
                  GOTHIC REALM &bull; GAMING &bull; HARDWARE &bull; CREATOR
                </div>
                <h1 className="font-serif font-black text-4xl sm:text-6xl text-zinc-100 tracking-tight leading-[1.1] mb-6">
                  WELCOME TO THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-800">SANCTUM</span> OF JOSHIFYED.
                </h1>
                <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-8">
                  The central fortress for dark-fantasy game runs, custom solo mining rigs, high-spec hardware logs, and official Fourthwall apparel drops.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="https://joshifyed.fourthwall.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3.5 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white font-serif font-bold tracking-wider text-sm uppercase rounded-xl border border-red-500/40 shadow-xl shadow-red-950 flex items-center gap-2 transition transform hover:-translate-y-0.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Enter The Reliquary
                  </a>
                  <button
                    onClick={() => setActiveTab('arcade')}
                    className="px-6 py-3.5 bg-[#150a14] hover:bg-[#1f0f1d] text-zinc-200 font-serif font-bold tracking-wider text-sm uppercase rounded-xl border border-red-900/60 shadow-lg flex items-center gap-2 transition"
                  >
                    <Gamepad2 className="w-4 h-4 text-red-500" />
                    Launch Arcade
                  </button>
                  <button
                    onClick={() => setActiveTab('blog')}
                    className="px-6 py-3.5 bg-transparent hover:bg-white/5 text-zinc-400 hover:text-zinc-200 font-serif text-sm tracking-wider uppercase transition"
                  >
                    Read Chronicles &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Arcade Showcase Teaser */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-serif font-black text-2xl text-zinc-100">THE BLOOD ARCADE</h2>
                  <p className="text-xs text-zinc-400">Play real retro arcade modules directly inside your browser.</p>
                </div>
                <button
                  onClick={() => setActiveTab('arcade')}
                  className="text-xs font-serif tracking-wider uppercase text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  Full Arena <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <ArcadeSection />
            </div>

            {/* Fourthwall Reliquary Teaser */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-serif font-black text-2xl text-zinc-100">THE SANCTUM RELIQUARY</h2>
                  <p className="text-xs text-zinc-400">Official Fourthwall merchandise crafted in dark obsidian hues.</p>
                </div>
                <a
                  href="https://joshifyed.fourthwall.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-serif tracking-wider uppercase text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  View All Relics <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MERCH_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group bg-[#0d0710] border border-red-950/80 hover:border-red-700/60 rounded-2xl overflow-hidden p-3 transition shadow-lg hover:shadow-red-950/40"
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-black mb-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <span className="absolute top-2 left-2 text-[10px] font-mono tracking-widest bg-red-950/90 text-red-300 px-2 py-0.5 rounded border border-red-800/60">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-sm text-zinc-200 group-hover:text-red-400 transition line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-red-950/60">
                      <span className="font-mono text-xs text-red-400 font-semibold">{item.price}</span>
                      <span className="text-[11px] text-zinc-500 group-hover:text-zinc-300 flex items-center gap-1">
                        Grab Relic <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Recent Chronicles & Stream Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Blog Left (2 Col) */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-serif font-black text-2xl text-zinc-100">RECENT CHRONICLES</h2>
                  <button onClick={() => setActiveTab('blog')} className="text-xs text-red-400 hover:text-red-300">
                    Read All &rarr;
                  </button>
                </div>
                {SAMPLE_BLOGS.slice(0, 2).map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="p-5 rounded-2xl bg-[#0c0810] border border-red-950/80 hover:border-red-700/50 cursor-pointer transition group"
                  >
                    <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono mb-2">
                      <span className="text-red-400">{post.category}</span>
                      <span>&bull;</span>
                      <span>{post.date}</span>
                      <span>&bull;</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-serif font-bold text-lg text-zinc-100 group-hover:text-red-400 transition mb-2">
                      {post.title}
                    </h3>
                    <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                ))}
              </div>

              {/* Broadcast Schedule / Channel */}
              <div className="p-6 rounded-2xl bg-[#0c0810] border border-red-950/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-red-500 text-xs font-mono uppercase tracking-wider mb-2">
                    <Zap className="w-4 h-4" />
                    Channel Dispatch
                  </div>
                  <h3 className="font-serif font-bold text-xl text-zinc-100 mb-4">LATEST BROADCASTS</h3>
                  <div className="space-y-4 text-xs">
                    <div className="p-3 rounded-xl bg-black/40 border border-red-950">
                      <div className="text-zinc-400 font-mono">FRIDAY NOCTURNE</div>
                      <div className="font-bold text-zinc-200 mt-1">Saros Endgame Speedrun & Boss Carries</div>
                      <div className="text-[11px] text-red-500 mt-1">9:00 PM EST &bull; PS5 Live</div>
                    </div>
                    <div className="p-3 rounded-xl bg-black/40 border border-red-950">
                      <div className="text-zinc-400 font-mono">HARDWARE LABS</div>
                      <div className="font-bold text-zinc-200 mt-1">Bitaxe Overclock & Hash Power Tune</div>
                      <div className="text-[11px] text-red-500 mt-1">Sunday &bull; YouTube Shorts</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-red-950/60 flex items-center justify-between">
                  <a 
                    href="https://youtube.com/@joshifyed" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-serif font-bold text-red-400 hover:text-red-300 flex items-center gap-1"
                  >
                    YouTube Channel <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <a 
                    href="https://x.com/joshifyed" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-serif font-bold text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
                  >
                    X Feed <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================== */}
        {/* VIEW: DAILY BLOG / CHRONICLES        */}
        {/* ==================================== */}
        {activeTab === 'blog' && (
          <div className="space-y-8">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-red-950/80">
              <div>
                <h1 className="font-serif font-black text-3xl sm:text-4xl text-zinc-100">THE GOTHIC CHRONICLES</h1>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Daily developer logs, solo mining experiments, stream tech, and dark lore.
                </p>
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search scrolls..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#0c0810] border border-red-950 rounded-xl text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-red-700"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {['All', 'Gaming', 'Hardware', 'Merch', 'Creator Lore'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-red-900 text-white border border-red-600/50 shadow-md shadow-red-950'
                      : 'bg-[#0f0914] text-zinc-400 hover:text-zinc-200 border border-red-950/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBlogs.map((post) => (
                <div
                  key={post.id}
                  className="bg-[#0b0710] border border-red-950/80 hover:border-red-800/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group"
                >
                  <div 
                    onClick={() => setSelectedPost(post)}
                    className="cursor-pointer"
                  >
                    <div className="relative aspect-video overflow-hidden bg-black">
                      <img
                        src={post.banner}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0710] via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 text-[10px] font-mono uppercase bg-red-950 text-red-300 px-2.5 py-0.5 rounded border border-red-800/50">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-2">
                        <span>{post.date}</span>
                        <span>&bull;</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="font-serif font-bold text-xl text-zinc-100 group-hover:text-red-400 transition mb-3">
                        {post.title}
                      </h2>
                      <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                        {post.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-red-950/60 flex items-center justify-between text-xs text-zinc-400">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 transition ${
                        likedPosts[post.id] ? 'text-red-500 font-bold' : 'hover:text-red-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedPosts[post.id] ? 'fill-current text-red-500' : ''}`} />
                      <span>{post.likes + (likedPosts[post.id] ? 1 : 0)}</span>
                    </button>

                    <button
                      onClick={() => setSelectedPost(post)}
                      className="font-serif font-semibold text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                      Unfurl Scroll <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredBlogs.length === 0 && (
              <div className="text-center py-20 text-zinc-500">
                <Skull className="w-10 h-10 mx-auto mb-2 opacity-50" />
                No chronicles found matching that search criteria.
              </div>
            )}
          </div>
        )}

        {/* ==================================== */}
        {/* VIEW: BLOOD ARCADE                   */}
        {/* ==================================== */}
        {activeTab === 'arcade' && (
          <div className="space-y-8">
            <div>
              <h1 className="font-serif font-black text-3xl sm:text-4xl text-zinc-100">THE BLOOD ARCADE</h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Custom canvas video games rendered directly in-browser. Zero emulators required.
              </p>
            </div>
            <ArcadeSection />
          </div>
        )}

        {/* ==================================== */}
        {/* VIEW: MERCH / THE RELIQUARY          */}
        {/* ==================================== */}
        {activeTab === 'merch' && (
          <div className="space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-red-950/80">
              <div>
                <h1 className="font-serif font-black text-3xl sm:text-4xl text-zinc-100">THE RELIQUARY</h1>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Official Joshifyed apparel and artifacts fulfilled securely through Fourthwall.
                </p>
              </div>

              <a
                href="https://joshifyed.fourthwall.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-gradient-to-r from-red-800 to-red-950 text-white font-serif font-bold text-xs uppercase tracking-wider rounded-xl border border-red-700/50 flex items-center justify-center gap-2 hover:from-red-700 hover:to-red-900 transition"
              >
                Launch Fourthwall Storefront <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Merch Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MERCH_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0b0710] border border-red-950/80 hover:border-red-700/60 rounded-2xl overflow-hidden p-4 flex flex-col justify-between group transition shadow-lg"
                >
                  <div>
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-black mb-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-85 group-hover:opacity-100"
                      />
                      <span className="absolute top-2.5 left-2.5 text-[10px] font-mono tracking-wider bg-red-950/90 text-red-300 px-2 py-0.5 rounded border border-red-800/60">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-zinc-200 group-hover:text-red-400 transition mb-1">
                      {item.title}
                    </h3>
                    <div className="font-mono text-sm text-red-400 font-bold mb-4">
                      {item.price}
                    </div>
                  </div>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 bg-red-950/50 hover:bg-red-900/80 text-zinc-200 hover:text-white font-serif font-semibold text-xs uppercase tracking-wider rounded-xl border border-red-800/40 flex items-center justify-center gap-2 transition"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-red-400" />
                    Claim on Fourthwall
                  </a>
                </div>
              ))}
            </div>

            {/* Fourthwall Guarantee Banner */}
            <div className="p-6 rounded-2xl bg-[#0e0812] border border-red-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h4 className="font-serif font-bold text-zinc-200 text-sm">SECURE CHECKOUT BY FOURTHWALL</h4>
                <p className="text-xs text-zinc-400">Direct creator support &bull; Encrypted Stripe/Apple Pay checkout &bull; Worldwide fulfillment.</p>
              </div>
              <a
                href="https://joshifyed.fourthwall.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-serif font-bold text-red-400 hover:underline flex items-center gap-1"
              >
                Visit Store Portal <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* ==================================== */}
        {/* VIEW: SHADOW GALLERY                 */}
        {/* ==================================== */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <div>
              <h1 className="font-serif font-black text-3xl sm:text-4xl text-zinc-100">THE SHADOW GALLERY</h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Visual artifacts, battlestation captures, thumbnail concepts, and hardware benches.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {GALLERY_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedGalleryImg(item)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-red-950/80 hover:border-red-700/60 cursor-pointer shadow-lg transition"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 mb-1">{item.category}</span>
                    <h4 className="font-serif font-bold text-sm text-zinc-100">{item.title}</h4>
                    <span className="text-[11px] text-zinc-400 mt-2 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Inspect Relic
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ==================================== */}
      {/* MODAL: BLOG READER                   */}
      {/* ==================================== */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b0710] border border-red-900/60 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-black/50 text-zinc-400 hover:text-white border border-red-950"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-red-400 mb-3">
              <span>{selectedPost.category}</span>
              <span>&bull;</span>
              <span>{selectedPost.date}</span>
              <span>&bull;</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <h2 className="font-serif font-black text-2xl sm:text-3xl text-zinc-100 mb-4 leading-snug">
              {selectedPost.title}
            </h2>

            <div className="aspect-video w-full rounded-xl overflow-hidden mb-6 bg-black">
              <img
                src={selectedPost.banner}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-invert prose-red max-w-none text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
              {selectedPost.content}
            </div>

            <div className="mt-8 pt-6 border-t border-red-950/80 flex items-center justify-between">
              <button
                onClick={() => handleLike(selectedPost.id)}
                className={`flex items-center gap-2 text-xs transition ${
                  likedPosts[selectedPost.id] ? 'text-red-500 font-bold' : 'text-zinc-400 hover:text-red-400'
                }`}
              >
                <Heart className={`w-4 h-4 ${likedPosts[selectedPost.id] ? 'fill-current text-red-500' : ''}`} />
                <span>Like this scroll ({selectedPost.likes + (likedPosts[selectedPost.id] ? 1 : 0)})</span>
              </button>

              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 bg-red-950/60 text-zinc-200 text-xs font-serif font-bold uppercase rounded-xl border border-red-900/40"
              >
                Close Scroll
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================== */}
      {/* MODAL: IMAGE INSPECT (GALLERY)       */}
      {/* ==================================== */}
      {selectedGalleryImg && (
        <div 
          onClick={() => setSelectedGalleryImg(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="max-w-4xl w-full bg-[#0b0710] border border-red-900/60 rounded-3xl overflow-hidden p-3 relative cursor-default"
          >
            <button
              onClick={() => setSelectedGalleryImg(null)}
              className="absolute top-5 right-5 z-10 p-2 rounded-xl bg-black/60 text-zinc-400 hover:text-white border border-red-950"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
            <div className="aspect-[16/10] bg-black rounded-2xl overflow-hidden mb-3">
              <img
                src={selectedGalleryImg.image}
                alt={selectedGalleryImg.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-red-400">{selectedGalleryImg.category}</span>
              <h3 className="font-serif font-bold text-lg text-zinc-100">{selectedGalleryImg.title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-red-950/80 bg-[#070409] py-12 px-4 sm:px-6 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-950 border border-red-700/40 flex items-center justify-center">
              <Skull className="w-4 h-4 text-red-500" />
            </div>
            <div>
              <span className="font-serif font-bold text-base text-zinc-200">JOSHIFYED</span>
              <p className="text-[11px] text-zinc-500 font-mono">Forged in the Shadows &bull; All Rights Reserved 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-zinc-400">
            <a href="https://joshifyed.fourthwall.com" target="_blank" rel="noreferrer" className="hover:text-red-400 transition">Fourthwall</a>
            <a href="https://youtube.com/@joshifyed" target="_blank" rel="noreferrer" className="hover:text-red-400 transition">YouTube</a>
            <a href="https://x.com/joshifyed" target="_blank" rel="noreferrer" className="hover:text-red-400 transition">X (Twitter)</a>
            <button onClick={() => setActiveTab('arcade')} className="hover:text-red-400 transition">Blood Arcade</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
