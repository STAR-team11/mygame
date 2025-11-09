import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Zap, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const RocketIllustration = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFA366" />
        <stop offset="50%" stopColor="#FF8533" />
        <stop offset="100%" stopColor="#FF6B00" />
      </linearGradient>
      <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#FF8533" />
        <stop offset="100%" stopColor="#FF6B00" />
      </linearGradient>
      <radialGradient id="orbitGlow">
        <stop offset="0%" stopColor="#FF8533" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#FF8533" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    <circle cx="200" cy="200" r="150" fill="url(#orbitGlow)" />
    <circle cx="200" cy="200" r="120" stroke="#FF8533" strokeWidth="1" fill="none" opacity="0.2" />
    <circle cx="200" cy="200" r="90" stroke="#FF8533" strokeWidth="1" fill="none" opacity="0.3" />
    
    <circle cx="140" cy="160" r="4" fill="#FFA366" />
    <circle cx="280" cy="180" r="3" fill="#FF8533" />
    <circle cx="160" cy="280" r="3" fill="#FFD700" />
    <circle cx="300" cy="240" r="4" fill="#FFA366" />
    <circle cx="120" cy="230" r="3" fill="#FF8533" />
    
    <path d="M 200 80 L 180 180 L 200 160 L 220 180 Z" fill="url(#rocketGradient)" stroke="#FF6B00" strokeWidth="2" />
    <ellipse cx="200" cy="175" rx="8" ry="12" fill="#2A2A2A" />
    <rect x="185" y="180" width="30" height="60" fill="url(#rocketGradient)" stroke="#FF6B00" strokeWidth="2" />
    <path d="M 175 240 L 185 270 L 190 240 Z" fill="url(#rocketGradient)" stroke="#FF6B00" strokeWidth="1" />
    <path d="M 225 240 L 215 270 L 210 240 Z" fill="url(#rocketGradient)" stroke="#FF6B00" strokeWidth="1" />
    <path d="M 190 240 L 195 290 L 200 260 L 205 290 L 210 240 Z" fill="url(#flameGradient)" opacity="0.9" />
  </svg>
);

const CoinsIllustration = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="coinGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#FFA366" />
        <stop offset="100%" stopColor="#FF8533" />
      </linearGradient>
      <linearGradient id="coinGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFA366" />
        <stop offset="50%" stopColor="#FF8533" />
        <stop offset="100%" stopColor="#FF6B00" />
      </linearGradient>
      <radialGradient id="coinGlow">
        <stop offset="0%" stopColor="#FFD700" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#FF8533" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    <circle cx="200" cy="200" r="160" fill="url(#coinGlow)" />
    
    <g transform="translate(200, 180)">
      <ellipse cx="0" cy="0" rx="70" ry="70" fill="url(#coinGradient1)" stroke="#FF6B00" strokeWidth="3" />
      <ellipse cx="0" cy="0" rx="55" ry="55" fill="none" stroke="#FFD700" strokeWidth="2" opacity="0.6" />
      <text x="0" y="10" fontSize="40" fill="#2A2A2A" textAnchor="middle" fontWeight="bold">$</text>
    </g>
    
    <g transform="translate(140, 240)">
      <ellipse cx="0" cy="0" rx="50" ry="50" fill="url(#coinGradient2)" stroke="#FF6B00" strokeWidth="2" />
      <ellipse cx="0" cy="0" rx="38" ry="38" fill="none" stroke="#FFA366" strokeWidth="2" opacity="0.5" />
      <text x="0" y="8" fontSize="28" fill="#2A2A2A" textAnchor="middle" fontWeight="bold">$</text>
    </g>
    
    <g transform="translate(280, 220)">
      <ellipse cx="0" cy="0" rx="45" ry="45" fill="url(#coinGradient1)" stroke="#FF8533" strokeWidth="2" />
      <ellipse cx="0" cy="0" rx="33" ry="33" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.5" />
      <text x="0" y="7" fontSize="26" fill="#2A2A2A" textAnchor="middle" fontWeight="bold">$</text>
    </g>
    
    <circle cx="160" cy="140" r="3" fill="#FFD700" />
    <circle cx="280" cy="160" r="4" fill="#FFA366" />
    <circle cx="240" cy="280" r="3" fill="#FF8533" />
  </svg>
);

const LockIllustration = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lockGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFA366" />
        <stop offset="50%" stopColor="#FF8533" />
        <stop offset="100%" stopColor="#FF6B00" />
      </linearGradient>
      <radialGradient id="lockGlow">
        <stop offset="0%" stopColor="#FF8533" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#FF8533" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    <circle cx="200" cy="200" r="160" fill="url(#lockGlow)" />
    
    <circle cx="200" cy="200" r="100" stroke="#FF8533" strokeWidth="1" fill="none" opacity="0.2" />
    <circle cx="200" cy="200" r="130" stroke="#FF8533" strokeWidth="1" fill="none" opacity="0.15" />
    
    <path d="M 160 180 L 160 140 Q 160 100 200 100 Q 240 100 240 140 L 240 180" 
          stroke="url(#lockGradient)" strokeWidth="12" fill="none" strokeLinecap="round" />
    
    <rect x="140" y="180" width="120" height="100" rx="10" fill="url(#lockGradient)" stroke="#FF6B00" strokeWidth="3" />
    
    <circle cx="200" cy="230" r="15" fill="#2A2A2A" />
    <rect x="197" y="230" width="6" height="30" rx="3" fill="#2A2A2A" />
    
    <circle cx="150" cy="150" r="3" fill="#FFA366" />
    <circle cx="280" cy="190" r="4" fill="#FF8533" />
    <circle cx="160" cy="280" r="3" fill="#FFD700" />
  </svg>
);

const ChartIllustration = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="chartGradient" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#FF6B00" />
        <stop offset="50%" stopColor="#FF8533" />
        <stop offset="100%" stopColor="#FFA366" />
      </linearGradient>
      <linearGradient id="lineGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FF8533" />
        <stop offset="100%" stopColor="#FFD700" />
      </linearGradient>
    </defs>
    
    <circle cx="200" cy="200" r="150" fill="url(#lockGlow)" />
    
    <rect x="100" y="200" width="40" height="80" rx="4" fill="url(#chartGradient)" opacity="0.8" />
    <rect x="160" y="150" width="40" height="130" rx="4" fill="url(#chartGradient)" opacity="0.9" />
    <rect x="220" y="120" width="40" height="160" rx="4" fill="url(#chartGradient)" />
    <rect x="280" y="100" width="40" height="180" rx="4" fill="url(#chartGradient)" opacity="0.95" />
    
    <polyline points="120,220 180,170 240,140 300,120" 
              stroke="url(#lineGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
    
    <circle cx="120" cy="220" r="6" fill="#FFD700" />
    <circle cx="180" cy="170" r="6" fill="#FFD700" />
    <circle cx="240" cy="140" r="6" fill="#FFD700" />
    <circle cx="300" cy="120" r="6" fill="#FFD700" />
    
    <circle cx="140" cy="180" r="3" fill="#FFA366" opacity="0.6" />
    <circle cx="290" cy="200" r="3" fill="#FF8533" opacity="0.6" />
  </svg>
);

const UsersIllustration = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="userGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFA366" />
        <stop offset="100%" stopColor="#FF8533" />
      </linearGradient>
      <radialGradient id="userGlow">
        <stop offset="0%" stopColor="#FF8533" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#FF8533" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    <circle cx="200" cy="200" r="160" fill="url(#userGlow)" />
    
    <g transform="translate(200, 180)">
      <circle cx="0" cy="-20" r="30" fill="url(#userGradient)" />
      <path d="M -40 40 Q -40 0 0 0 Q 40 0 40 40 Z" fill="url(#userGradient)" />
    </g>
    
    <g transform="translate(140, 220)" opacity="0.7">
      <circle cx="0" cy="-15" r="22" fill="url(#userGradient)" />
      <path d="M -30 30 Q -30 5 0 5 Q 30 5 30 30 Z" fill="url(#userGradient)" />
    </g>
    
    <g transform="translate(260, 220)" opacity="0.7">
      <circle cx="0" cy="-15" r="22" fill="url(#userGradient)" />
      <path d="M -30 30 Q -30 5 0 5 Q 30 5 30 30 Z" fill="url(#userGradient)" />
    </g>
    
    <circle cx="160" cy="140" r="3" fill="#FFA366" />
    <circle cx="280" cy="160" r="4" fill="#FF8533" />
  </svg>
);

const ClockIllustration = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="clockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFA366" />
        <stop offset="50%" stopColor="#FF8533" />
        <stop offset="100%" stopColor="#FF6B00" />
      </linearGradient>
    </defs>
    
    <circle cx="200" cy="200" r="160" fill="url(#userGlow)" />
    
    <circle cx="200" cy="200" r="80" fill="none" stroke="url(#clockGradient)" strokeWidth="8" />
    <circle cx="200" cy="200" r="90" fill="none" stroke="#FF8533" strokeWidth="1" opacity="0.3" />
    
    <line x1="200" y1="200" x2="200" y2="140" stroke="url(#clockGradient)" strokeWidth="6" strokeLinecap="round" />
    <line x1="200" y1="200" x2="240" y2="200" stroke="url(#clockGradient)" strokeWidth="5" strokeLinecap="round" />
    
    <circle cx="200" cy="200" r="8" fill="#FFD700" />
    
    <circle cx="200" cy="130" r="4" fill="#FFA366" />
    <circle cx="270" cy="200" r="4" fill="#FFA366" />
    <circle cx="200" cy="270" r="4" fill="#FFA366" />
    <circle cx="130" cy="200" r="4" fill="#FFA366" />
  </svg>
);

const GlobeIllustration = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFA366" />
        <stop offset="50%" stopColor="#FF8533" />
        <stop offset="100%" stopColor="#FF6B00" />
      </linearGradient>
    </defs>
    
    <circle cx="200" cy="200" r="160" fill="url(#userGlow)" />
    
    <circle cx="200" cy="200" r="90" fill="none" stroke="url(#globeGradient)" strokeWidth="3" />
    
    <ellipse cx="200" cy="200" rx="90" ry="40" fill="none" stroke="url(#globeGradient)" strokeWidth="2" opacity="0.6" />
    <ellipse cx="200" cy="200" rx="90" ry="60" fill="none" stroke="url(#globeGradient)" strokeWidth="2" opacity="0.4" />
    
    <line x1="200" y1="110" x2="200" y2="290" stroke="url(#globeGradient)" strokeWidth="2" />
    <line x1="110" y1="200" x2="290" y2="200" stroke="url(#globeGradient)" strokeWidth="2" />
    
    <circle cx="200" cy="200" r="4" fill="#FFD700" />
    
    <circle cx="150" cy="160" r="3" fill="#FFA366" />
    <circle cx="250" cy="180" r="3" fill="#FF8533" />
    <circle cx="230" cy="240" r="3" fill="#FFD700" />
  </svg>
);

const ShieldIllustration = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFA366" />
        <stop offset="50%" stopColor="#FF8533" />
        <stop offset="100%" stopColor="#FF6B00" />
      </linearGradient>
    </defs>
    
    <circle cx="200" cy="200" r="160" fill="url(#userGlow)" />
    
    <path d="M 200 100 L 140 130 L 140 200 Q 140 260 200 300 Q 260 260 260 200 L 260 130 Z" 
          fill="url(#shieldGradient)" stroke="#FF6B00" strokeWidth="3" />
    
    <path d="M 200 120 L 160 140 L 160 200 Q 160 245 200 275 Q 240 245 240 200 L 240 140 Z" 
          fill="none" stroke="#FFD700" strokeWidth="2" opacity="0.4" />
    
    <path d="M 180 190 L 195 205 L 230 160" stroke="#FFD700" strokeWidth="6" 
          fill="none" strokeLinecap="round" strokeLinejoin="round" />
    
    <circle cx="150" cy="150" r="3" fill="#FFA366" />
    <circle cx="280" cy="180" r="4" fill="#FF8533" />
  </svg>
);

const features = [
  {
    illustration: CoinsIllustration,
    title: "Fair Launch",
    description: "Create tokens with fair airdrop mechanics and referral rewards. Deploy on Stellar with professional-grade smart contracts.",
  },
  {
    illustration: CoinsIllustration,
    title: "Airdrop System",
    description: "Distribute tokens efficiently to your community with automated airdrop tools and batch processing capabilities.",
  },
  {
    illustration: ChartIllustration,
    title: "Points System",
    description: "Earn STAR points through platform engagement. Convert XLM to points at 1:10 ratio for rewards.",
  },
  {
    illustration: UsersIllustration,
    title: "Referral Network",
    description: "Grow your network and earn rewards. Incentivize community growth with referral bonuses and tracking.",
  },
  {
    illustration: LockIllustration,
    title: "Liquidity Lock",
    description: "Automated liquidity pool locking ensures project credibility and investor protection on DEX.",
  },
  {
    illustration: ClockIllustration,
    title: "Vesting Schedule",
    description: "Implement customizable token vesting schedules with cliff periods and linear unlocking mechanisms.",
  },
  {
    illustration: GlobeIllustration,
    title: "Stellar Network",
    description: "Built on Stellar's fast, low-cost blockchain with Soroban smart contract integration.",
  },
  {
    illustration: ShieldIllustration,
    title: "Security First",
    description: "Audited Soroban contracts ensure your funds and tokens are protected at all times.",
  },
];

export default function Landing() {
  const [, setLocation] = useLocation();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "center",
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black z-10"></div>
        </div>

        <div className="relative z-20 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8 inline-block"
          >
            <div className="relative">
              <motion.div 
                className="absolute inset-0 blur-3xl bg-primary/30 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              <svg
                className="w-32 h-32 md:w-40 md:h-40 relative"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF6B00" />
                    <stop offset="50%" stopColor="#FF8533" />
                    <stop offset="100%" stopColor="#FFA366" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <motion.path
                  d="M50 5 L61 39 L97 39 L68 61 L79 95 L50 73 L21 95 L32 61 L3 39 L39 39 Z"
                  fill="url(#starGradient)"
                  stroke="#FFA366"
                  strokeWidth="2"
                  filter="url(#glow)"
                  animate={{ 
                    rotate: [0, 360],
                  }}
                  transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </svg>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent animate-gradient"
          >
            STAR
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-4 font-light"
          >
            DeFi Platform on Stellar
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Create tokens, manage airdrops, and launch on DEX with automated liquidity locking.
            Built with Soroban smart contracts on Stellar testnet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              size="lg"
              className="px-12 py-6 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/70 hover:scale-105"
              onClick={() => setLocation("/app")}
              data-testid="button-launch-app"
            >
              Launch App
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-sm"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">100M+</div>
              <div className="text-gray-400">Total Supply STR</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">80%</div>
              <div className="text-gray-400">To Point Holders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">1:10</div>
              <div className="text-gray-400">XLM to STAR Points</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent">
              Core Features
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to launch and trade tokens on Stellar
            </p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_80%] md:flex-[0_0_60%] lg:flex-[0_0_50%] xl:flex-[0_0_40%] px-4"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="h-full"
                    >
                      <div className="relative group h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-orange-500/20 to-primary/30 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                        
                        <div className="relative bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/40 transition-all duration-300 h-full flex flex-col">
                          <div className="relative h-64 bg-gradient-to-br from-[#3A2A1A] via-[#2A2218] to-[#1A1A1A] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>

                            <div className="absolute inset-0 flex items-center justify-center p-8">
                              <feature.illustration />
                            </div>

                            <div className="absolute top-4 right-4">
                              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            </div>
                            <div className="absolute bottom-8 left-8">
                              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            </div>
                            <div className="absolute top-1/3 right-12">
                              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                            </div>
                          </div>

                          <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-2xl font-bold mb-3 text-gray-100 group-hover:text-primary transition-colors">
                              {feature.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === selectedIndex
                    ? 'w-8 h-2 bg-primary'
                    : 'w-2 h-2 bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6 bg-gradient-to-b from-black to-black/80">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-100">
              Ready to Launch Your Project?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Join the next generation of DeFi on Stellar. Start building today with STAR.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="px-12 py-6 text-lg font-semibold border-primary/50 hover:border-primary bg-primary/5 hover:bg-primary/10 backdrop-blur-sm text-gray-100 transition-all duration-300"
              onClick={() => setLocation("/app")}
              data-testid="button-get-started"
            >
              <Zap className="mr-2 h-5 w-5" />
              Get Started
            </Button>
          </motion.div>
        </div>
      </section>

      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 107, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 107, 0, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
