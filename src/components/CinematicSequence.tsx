import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { ASSETS } from '../data/culinaryData';
import { ResilientImage } from './ResilientImage';
import { VolumetricStageCanvas } from './VolumetricStageCanvas';

gsap.registerPlugin(ScrollTrigger);

interface CinematicSequenceProps {
  onExploreSalon: () => void;
  onInspectCenterpiece: () => void;
  onReserveClick: () => void;
}

export const CinematicSequence: React.FC<CinematicSequenceProps> = ({
  onExploreSalon,
  onInspectCenterpiece,
  onReserveClick,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heroBgRef = useRef<HTMLDivElement | null>(null);
  const heroTitleRef = useRef<HTMLDivElement | null>(null);
  const scene2BgRef = useRef<HTMLDivElement | null>(null);
  const scene2GlassRef = useRef<HTMLDivElement | null>(null);
  const scene2TextRef = useRef<HTMLDivElement | null>(null);
  const scene3BgRef = useRef<HTMLDivElement | null>(null);
  const scene3TextRef = useRef<HTMLDivElement | null>(null);
  const scene4BgRef = useRef<HTMLDivElement | null>(null);
  const scene4TextRef = useRef<HTMLDivElement | null>(null);
  const scene5BgRef = useRef<HTMLDivElement | null>(null);
  const scene5TextRef = useRef<HTMLDivElement | null>(null);
  const scene6WrapRef = useRef<HTMLDivElement | null>(null);
  const scene6ImgRef = useRef<HTMLDivElement | null>(null);
  const scene6CaptionRef = useRef<HTMLDivElement | null>(null);

  const stageScrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current.x = nx;
      mouseRef.current.y = ny;

      if (heroBgRef.current && window.scrollY < window.innerHeight) {
        gsap.to(heroBgRef.current, {
          x: -nx * 14,
          y: -ny * 10,
          duration: 0.9,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Scene 1: Hero Skyline Camera Push + Title Depth Exit
      gsap.fromTo(
        heroBgRef.current,
        { scale: 1.02 },
        {
          scale: 1.24,
          ease: 'none',
          scrollTrigger: {
            trigger: '#scene-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        heroTitleRef.current,
        { opacity: 1, y: 0, scale: 1 },
        {
          opacity: 0,
          y: -60,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: '#scene-hero',
            start: 'top top',
            end: '70% top',
            scrub: true,
          },
        }
      );

      // Scene 2: Architectural Towers Parallax & Skyline Cuisine
      gsap.fromTo(
        scene2BgRef.current,
        { scale: 1.12 },
        {
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#scene-skyline',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        scene2GlassRef.current,
        { xPercent: -18, opacity: 0.2 },
        {
          xPercent: 8,
          opacity: 0.92,
          ease: 'none',
          scrollTrigger: {
            trigger: '#scene-skyline',
            start: 'top bottom',
            end: 'center center',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        scene2TextRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#scene-skyline',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Scene 3: Boulevard Arrival Speed Rush
      gsap.fromTo(
        scene3BgRef.current,
        { scale: 1.04 },
        {
          scale: 1.22,
          ease: 'none',
          scrollTrigger: {
            trigger: '#scene-boulevard',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        scene3TextRef.current,
        { x: -45, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#scene-boulevard',
            start: 'top 68%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Scene 4: Lateral Rolling Hearth Motion
      gsap.fromTo(
        scene4BgRef.current,
        { scale: 1.12, xPercent: -3 },
        {
          scale: 1.04,
          xPercent: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: '#scene-hearth',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        scene4TextRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#scene-hearth',
            start: 'top 68%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Scene 5: Editorial Luxury Salon
      gsap.fromTo(
        scene5BgRef.current,
        { scale: 1.08 },
        {
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#scene-salon-intro',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        scene5TextRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#scene-salon-intro',
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Scene 6: Tri-Dish Studio Lineup Pinned Camera Zoom-In (mirrors 00:05-00:06)
      const studioTl = gsap.timeline({
        scrollTrigger: {
          trigger: scene6WrapRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            stageScrollRef.current = self.progress;
          },
        },
      });

      studioTl
        .fromTo(
          scene6ImgRef.current,
          { scale: 0.96, opacity: 0.78 },
          { scale: 1.36, opacity: 1, ease: 'none', duration: 1 },
          0
        )
        .fromTo(
          scene6CaptionRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
          0.12
        )
        .to(
          scene6CaptionRef.current,
          { opacity: 0, y: -20, duration: 0.25, ease: 'power2.in' },
          0.75
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToScene2 = () => {
    const el = document.querySelector('#scene-skyline');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={containerRef} id="top" className="relative bg-[#050506]">
      {/* SCENE 1 (00:00): Full-Screen Dubai Night Hero */}
      <section
        id="scene-hero"
        className="relative h-screen min-h-[680px] w-full overflow-hidden flex items-center justify-center"
      >
        <div ref={heroBgRef} className="absolute inset-[-4%] will-change-transform">
          <ResilientImage
            src={ASSETS.heroDubaiNight}
            alt="Downtown Dubai skyline at night looking down illuminated highway toward Burj Khalifa"
            fallbackTitle="SOLAIA · Downtown Dubai"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050506]/65 via-[#050506]/25 to-[#050506]" />
        </div>

        <div
          ref={heroTitleRef}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto will-change-transform"
        >
          <p className="text-xs md:text-sm font-medium tracking-[0.28em] uppercase text-[#C89B5E] mb-4">
            Downtown Dubai · Open-Fire Tasting Room
          </p>
          <h1 className="font-display text-[clamp(3.75rem,11vw,8.75rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.02em] text-[#F5F3EE] drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
            DINE THE
            <br />
            DUBAI
            <br />
            NIGHT
          </h1>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onReserveClick}
              className="px-7 py-3.5 text-xs font-semibold tracking-[0.12em] uppercase bg-[#F5F3EE] text-[#050506] hover:bg-[#C89B5E] transition-colors duration-200 cursor-pointer"
            >
              Reserve Tonight
            </button>
            <button
              type="button"
              onClick={scrollToScene2}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-[0.12em] uppercase border border-white/25 text-[#F5F3EE] hover:border-[#C89B5E] hover:text-[#C89B5E] transition-colors duration-200 cursor-pointer"
            >
              <span>Enter the Experience</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* SCENE 2 (00:01): Architectural Towers & Skyline Cuisine */}
      <section
        id="scene-skyline"
        className="relative h-screen min-h-[640px] w-full overflow-hidden flex items-center"
      >
        <div ref={scene2BgRef} className="absolute inset-0 will-change-transform">
          <ResilientImage
            src={ASSETS.heroDubaiNight}
            alt="Illuminated Dubai skyline golden highway light streaks"
            fallbackTitle="Iconic Skyline"
            className="w-full h-full object-cover object-bottom brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050506]/90 via-[#050506]/45 to-transparent" />
        </div>

        {/* Left parallax architectural glass monolith panel mirroring 00:01 */}
        <div
          ref={scene2GlassRef}
          aria-hidden="true"
          className="hidden md:block absolute left-0 top-0 bottom-0 w-[22%] bg-gradient-to-r from-[#0E131B]/95 via-[#18212E]/70 to-transparent border-r border-white/10 will-change-transform"
        />

        <div
          id="story"
          ref={scene2TextRef}
          className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-14"
        >
          <div className="max-w-xl">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#C89B5E] mb-3">
              Act 01 · Horizon & Hearth
            </p>
            <h2 className="font-display text-[clamp(2.75rem,6.5vw,5.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-[#F5F3EE] text-balance">
              WOOD-FIRE CUISINE.
              <br />
              ICONIC SKYLINE.
            </h2>
            <p className="mt-5 text-base md:text-lg text-[#D1CCC2] leading-relaxed max-w-md">
              High above Downtown Boulevard, eight nightly courses are forged over glowing Japanese white binchotan with uninterrupted views of the Burj spire.
            </p>
          </div>
        </div>
      </section>

      {/* SCENE 3 (00:02): Boulevard Arrival Rush */}
      <section
        id="scene-boulevard"
        className="relative h-screen min-h-[640px] w-full overflow-hidden flex items-center"
      >
        <div ref={scene3BgRef} className="absolute inset-0 will-change-transform">
          <ResilientImage
            src={ASSETS.boulevardMotion}
            alt="Downtown Dubai luxury boulevard at night with glowing amber car light trails"
            fallbackTitle="Boulevard Arrival"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050506]/92 via-[#050506]/50 to-[#050506]/20" />
        </div>

        <div ref={scene3TextRef} className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-14">
          <div className="max-w-xl">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#C89B5E] mb-3">
              Act 02 · Seamless Arrival
            </p>
            <h2 className="font-display text-[clamp(2.75rem,6.5vw,5.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-[#F5F3EE] text-balance">
              PRIVATE VALET.
              <br />
              FIRST POUR IN MINUTES.
            </h2>
            <p className="mt-5 text-base md:text-lg text-[#D1CCC2] leading-relaxed max-w-md">
              Direct subterranean arrival on Sheikh Mohammed bin Rashid Boulevard, escorted straight from the threshold to your chilled Champagne aperitif.
            </p>
          </div>
        </div>
      </section>

      {/* SCENE 4 (00:03): Lateral Open-Hearth Action Showcase */}
      <section
        id="scene-hearth"
        className="relative h-screen min-h-[640px] w-full overflow-hidden flex items-end pb-16 md:pb-24"
      >
        <div ref={scene4BgRef} className="absolute inset-[-4%] will-change-transform">
          <ResilientImage
            src={ASSETS.openHearth}
            alt="Chef basting Miyazaki A5 Wagyu steak with foaming brown butter in copper pan over glowing binchotan embers"
            fallbackTitle="900°C Binchotan Hearth"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-[#050506]/35 to-[#050506]/40" />
        </div>

        <div ref={scene4TextRef} className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-white/15 pt-6">
            <div>
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#C89B5E] mb-2">
                Act 03 · Open-Fire Craft
              </p>
              <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.75rem)] font-extrabold uppercase leading-[0.92] text-[#F5F3EE]">
                900°C BINCHOTAN HEARTH
              </h2>
            </div>
            <p className="text-sm md:text-base text-[#D1CCC2] max-w-md">
              Every cut is seared over smokeless Wakayama white oak charcoal and basted tableside with cultured Normandy butter, wild thyme, and aged marrow.
            </p>
          </div>
        </div>
      </section>

      {/* SCENE 5 (00:04): Editorial Luxury Salon Counter */}
      <section
        id="scene-salon-intro"
        className="relative h-screen min-h-[640px] w-full overflow-hidden flex items-center"
      >
        <div ref={scene5BgRef} className="absolute inset-0 will-change-transform">
          <ResilientImage
            src={ASSETS.luxurySalon}
            alt="Guest seated at Nero Marquina marble chef counter in candlelit luxury dining room"
            fallbackTitle="Your Table Is Waiting"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050506]/92 via-[#050506]/55 to-transparent" />
        </div>

        <div ref={scene5TextRef} className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-14">
          <div className="max-w-lg">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#C89B5E] mb-3">
              Act 04 · The Chef’s Counter
            </p>
            <h2 className="font-display text-[clamp(3rem,6.5vw,5.5rem)] font-extrabold uppercase leading-[0.88] text-[#F5F3EE]">
              YOUR SEAT
              <br />
              IS WAITING.
            </h2>
            <p className="mt-5 text-base text-[#D1CCC2] leading-relaxed">
              Twelve hand-honed Nero Marquina marble counter seats and an intimate 28-cover main salon framed by warm amber architectural lighting.
            </p>
            <button
              type="button"
              onClick={onExploreSalon}
              className="mt-7 inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#F5F3EE] hover:text-[#C89B5E] border-b border-[#C89B5E]/60 pb-1.5 transition-colors cursor-pointer"
            >
              <span>Explore the Salon & Cellar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SCENE 6 (00:05–00:06): Tri-Dish Studio Lineup + Three.js Volumetric Light Stage */}
      <section
        ref={scene6WrapRef}
        className="relative h-screen min-h-[660px] w-full overflow-hidden bg-[#050506] flex items-center justify-center"
      >
        <div ref={scene6ImgRef} className="absolute inset-0 will-change-transform">
          <ResilientImage
            src={ASSETS.studioTrioLineup}
            alt="Symmetric dark studio culinary lineup with Miyazaki Wagyu center plate, wild turbot, and Valrhona soufflé under overhead linear lights"
            fallbackTitle="Three-Act Studio Progression"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050506]/80 via-transparent to-[#050506]/90" />
        </div>

        {/* Real-time Three.js Volumetric Studio Light Cone & Ground Mist Shader */}
        <VolumetricStageCanvas
          scrollProgressRef={stageScrollRef}
          mouseRef={mouseRef}
          className="absolute inset-0 z-10 mix-blend-screen opacity-80"
        />

        <div
          ref={scene6CaptionRef}
          className="relative z-20 text-center px-6 max-w-3xl mx-auto pointer-events-auto mt-auto pb-14 md:pb-20"
        >
          <p className="text-xs font-medium tracking-[0.26em] uppercase text-[#C89B5E] mb-2">
            Signature Progression
          </p>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] font-extrabold uppercase leading-[0.94] text-[#F5F3EE]">
            THREE ACTS OF FIRE, SEA & CACAO
          </h2>
          <button
            type="button"
            onClick={onInspectCenterpiece}
            className="mt-5 inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-[0.12em] uppercase bg-[#050506]/80 border border-white/20 text-[#F5F3EE] hover:border-[#C89B5E] hover:text-[#C89B5E] transition-colors cursor-pointer"
          >
            <span>Inspect Centerpiece Course</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
