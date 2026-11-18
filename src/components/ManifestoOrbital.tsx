import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ORBITAL_ITEMS, OrbitalCardItem } from '../data/culinaryData';
import { ResilientImage } from './ResilientImage';

gsap.registerPlugin(ScrollTrigger);

interface ManifestoOrbitalProps {
  onSelectCourse: (courseId: string) => void;
}

const MANIFESTO_WORDS = [
  "We",
  "don’t",
  "serve",
  "dinner.",
  "We",
  "choreograph",
  "the",
  "night.",
];

export const ManifestoOrbital: React.FC<ManifestoOrbitalProps> = ({ onSelectCourse }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeCardTitle, setActiveCardTitle] = useState<string | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      wordRefs.current.forEach((el) => {
        if (el) el.style.opacity = '1';
      });
      return;
    }

    const ctx = gsap.context(() => {
      const words = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
      const cards = cardRefs.current.filter(Boolean) as HTMLButtonElement[];

      // Initial states
      gsap.set(words, { opacity: 0.08, y: 10 });
      gsap.set(cards, { opacity: 0, scale: 0.45, x: 0, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=220%',
          pin: true,
          scrub: 0.65,
        },
      });

      // Phase 1 (00:07-00:09): Progressive word-by-word editorial reveal
      tl.to(words, {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.55,
        ease: 'power2.out',
      });

      // Subtle pulse/fade of typing cursor as orbital cards emerge
      tl.to(
        cursorRef.current,
        {
          opacity: 0,
          duration: 0.2,
        },
        0.72
      );

      // Phase 2 (00:10): 8 studio culinary cards fan out into a 3D perspective ring around the statement
      cards.forEach((card, i) => {
        const angle = (i / cards.length) * Math.PI * 2 - Math.PI / 2;
        const radiusX = window.innerWidth < 768 ? 145 : 370;
        const radiusY = window.innerWidth < 768 ? 175 : 225;
        const targetX = Math.cos(angle) * radiusX;
        const targetY = Math.sin(angle) * radiusY;
        const rotY = Math.cos(angle) * -18;
        const rotX = Math.sin(angle) * 12;

        tl.to(
          card,
          {
            opacity: 1,
            scale: 1,
            x: targetX,
            y: targetY,
            rotateY: rotY,
            rotateX: rotX,
            duration: 0.8,
            ease: 'power3.out',
          },
          0.75 + i * 0.03
        );
      });

      // Gentle orbital rotation as user scrolls to the end of Scene 8
      tl.to(
        ringRef.current,
        {
          rotateZ: 14,
          scale: 1.06,
          duration: 0.7,
          ease: 'none',
        },
        1.45
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (item: OrbitalCardItem) => {
    if (item.courseId) {
      onSelectCourse(item.courseId);
    } else {
      const salonEl = document.querySelector('#salon');
      salonEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[700px] w-full bg-[#050506] overflow-hidden flex items-center justify-center"
      style={{ perspective: '1200px' }}
    >
      {/* Subtle architectural vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,155,94,0.08)_0%,rgba(5,5,6,0.95)_62%,#050506_100%)] pointer-events-none"
      />

      {/* 3D Orbital Card Ring (Scene 8 — 00:10) */}
      <div
        ref={ringRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {ORBITAL_ITEMS.map((item, idx) => (
          <button
            key={item.id}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            type="button"
            onClick={() => handleCardClick(item)}
            onMouseEnter={() => setActiveCardTitle(`${item.title} · ${item.category}`)}
            onMouseLeave={() => setActiveCardTitle(null)}
            className="pointer-events-auto absolute w-36 h-24 md:w-52 md:h-36 rounded-sm overflow-hidden border border-white/15 bg-[#0D0D11] shadow-[0_24px_60px_rgba(0,0,0,0.85)] hover:border-[#C89B5E] hover:scale-110 transition-all duration-200 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B5E]"
            aria-label={`Inspect ${item.title}`}
          >
            <ResilientImage
              src={item.image}
              alt={item.title}
              fallbackTitle={item.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050506]/90 via-transparent to-transparent flex items-end p-2.5 text-left">
              <span className="text-[11px] md:text-xs font-semibold tracking-wide text-[#F5F3EE] truncate">
                {item.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Centered Manifesto Text (Scene 7 — 00:08-00:09) */}
      <div className="relative z-20 max-w-2xl mx-auto px-8 text-center pointer-events-none">
        <h2 className="font-sans-body text-[clamp(1.75rem,3.6vw,3.1rem)] font-semibold leading-[1.18] tracking-tight text-[#F5F3EE]">
          {MANIFESTO_WORDS.slice(0, 4).map((word, idx) => (
            <span
              key={`line1-${idx}`}
              ref={(el) => {
                wordRefs.current[idx] = el;
              }}
              className="inline-block mr-[0.28em]"
            >
              {word}
            </span>
          ))}
          <br />
          {MANIFESTO_WORDS.slice(4).map((word, idx) => (
            <span
              key={`line2-${idx}`}
              ref={(el) => {
                wordRefs.current[idx + 4] = el;
              }}
              className="inline-block mr-[0.28em] text-[#C89B5E]"
            >
              {word}
            </span>
          ))}
          <span
            ref={cursorRef}
            aria-hidden="true"
            className="inline-block w-[3px] h-[0.92em] bg-[#F5F3EE] align-middle ml-0.5"
          />
        </h2>

        <div className="mt-5 h-5 text-xs font-medium tracking-[0.18em] uppercase text-[#A89F91] transition-opacity duration-200">
          {activeCardTitle ? activeCardTitle : 'Select any orbital course to inspect'}
        </div>
      </div>
    </section>
  );
};
