import React, { useEffect, useState } from 'react';

export const Preloader: React.FC = () => {
  const [phase, setPhase] = useState<'visible' | 'exiting' | 'done'>('visible');

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setPhase('done');
      return;
    }

    const t1 = window.setTimeout(() => setPhase('exiting'), 520);
    const t2 = window.setTimeout(() => setPhase('done'), 1150);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] bg-[#050506] flex flex-col items-center justify-center transition-opacity duration-500 ease-out pointer-events-none ${
        phase === 'exiting' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="overflow-hidden">
        <span
          className={`block font-display text-4xl md:text-6xl font-extrabold tracking-[0.26em] uppercase text-[#F5F3EE] transition-transform duration-500 ease-out ${
            phase === 'exiting' ? '-translate-y-4' : 'translate-y-0'
          }`}
        >
          SOLAIA
        </span>
      </div>
      <div className="mt-4 w-24 h-px bg-white/15 overflow-hidden">
        <div
          className={`h-full bg-[#C89B5E] transition-transform duration-500 ease-out origin-left ${
            phase === 'exiting' ? 'scale-x-100' : 'scale-x-50'
          }`}
        />
      </div>
    </div>
  );
};
