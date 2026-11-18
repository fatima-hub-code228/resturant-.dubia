import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SIGNATURE_COURSES, SignatureCourse } from '../data/culinaryData';
import { ResilientImage } from './ResilientImage';

gsap.registerPlugin(ScrollTrigger);

interface PinnedShowroomProps {
  selectedCourseId?: string | null;
  onInspectCourse: (course: SignatureCourse) => void;
  onReserveCourse: (course: SignatureCourse) => void;
}

export const PinnedShowroom: React.FC<PinnedShowroomProps> = ({
  selectedCourseId,
  onInspectCourse,
  onReserveCourse,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Sync external selection (e.g. clicking an orbital card)
  useEffect(() => {
    if (!selectedCourseId) return;
    const foundIdx = SIGNATURE_COURSES.findIndex((c) => c.id === selectedCourseId);
    if (foundIdx !== -1) {
      setActiveIndex(foundIdx);
    }
  }, [selectedCourseId]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const total = SIGNATURE_COURSES.length;

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${total * 85}%`,
        pin: true,
        scrub: 0.4,
        onUpdate: (self) => {
          const nextIdx = Math.min(
            total - 1,
            Math.max(0, Math.floor(self.progress * total))
          );
          setActiveIndex((prev) => (prev !== nextIdx ? nextIdx : prev));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const jumpToCourse = (index: number) => {
    const clamped = Math.max(0, Math.min(SIGNATURE_COURSES.length - 1, index));
    setActiveIndex(clamped);

    const st = scrollTriggerRef.current;
    if (st) {
      const total = SIGNATURE_COURSES.length;
      const targetProgress = (clamped + 0.15) / total;
      const targetScroll = st.start + (st.end - st.start) * targetProgress;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const activeCourse = SIGNATURE_COURSES[activeIndex];

  return (
    <section
      id="showroom"
      ref={sectionRef}
      className="relative h-screen min-h-[680px] w-full bg-[#050506] overflow-hidden border-t border-white/10"
    >
      <div className="h-full w-full grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left 45% (5 cols on 12-col grid): Pitch-black architectural showcase panel matching 00:11-00:15 */}
        <div className="lg:col-span-5 bg-[#050506] flex flex-col justify-between px-6 md:px-12 py-20 lg:py-24 z-10 border-b lg:border-b-0 lg:border-r border-white/10">
          {/* Course Index & Quick Controls */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs font-mono-tabular tracking-[0.2em] uppercase text-[#C89B5E]">
              <span>Course {activeCourse.index}</span>
              <span aria-hidden="true">/</span>
              <span className="text-[#8E887E]">0{SIGNATURE_COURSES.length}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => jumpToCourse(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous signature course"
                className="w-9 h-9 flex items-center justify-center border border-white/15 text-[#F5F3EE] hover:border-[#C89B5E] hover:text-[#C89B5E] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => jumpToCourse(activeIndex + 1)}
                disabled={activeIndex === SIGNATURE_COURSES.length - 1}
                aria-label="Next signature course"
                className="w-9 h-9 flex items-center justify-center border border-white/15 text-[#F5F3EE] hover:border-[#C89B5E] hover:text-[#C89B5E] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Giant Bold Display Title + Tasting Notes */}
          <div className="my-auto py-6">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8E887E] mb-3">
              {activeCourse.category} · {activeCourse.cookingTemp}
            </p>
            <h2
              key={activeCourse.id}
              className="font-display text-[clamp(3.25rem,6vw,5.75rem)] font-extrabold uppercase leading-[0.88] tracking-tight text-[#F5F3EE] transition-all duration-300"
            >
              {activeCourse.title}
            </h2>
            <p className="mt-4 text-sm md:text-base font-medium text-[#C89B5E]">
              {activeCourse.subtitle}
            </p>
            <p className="mt-4 text-sm md:text-[15px] text-[#B8B2A6] leading-relaxed max-w-md">
              {activeCourse.description}
            </p>

            <div className="mt-6 pt-5 border-t border-white/10 flex items-baseline justify-between gap-4 max-w-md">
              <div>
                <span className="block text-[11px] uppercase tracking-[0.16em] text-[#8E887E]">
                  Cellar Pairing
                </span>
                <span className="text-sm text-[#F5F3EE] mt-0.5 block">
                  {activeCourse.pairing}
                </span>
              </div>
              <div className="text-right shrink-0">
                <span className="block text-[11px] uppercase tracking-[0.16em] text-[#8E887E]">
                  Course
                </span>
                <span className="font-mono-tabular text-lg font-medium text-[#F5F3EE]">
                  AED {activeCourse.priceAed}
                </span>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onInspectCourse(activeCourse)}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.12em] uppercase bg-[#F5F3EE] text-[#050506] hover:bg-[#C89B5E] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Inspect Course</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onReserveCourse(activeCourse)}
                className="px-5 py-3 text-xs font-semibold tracking-[0.12em] uppercase border border-white/20 text-[#F5F3EE] hover:border-[#C89B5E] hover:text-[#C89B5E] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Reserve Tasting
              </button>
            </div>
          </div>

          {/* Clickable 5-Course Switcher Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {SIGNATURE_COURSES.map((course, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => jumpToCourse(idx)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                    isActive
                      ? 'border-[#C89B5E] bg-[#C89B5E]/15 text-[#F5F3EE]'
                      : 'border-white/10 text-[#8E887E] hover:text-[#F5F3EE] hover:border-white/25'
                  }`}
                >
                  {course.index}. {course.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 55% (7 cols on 12-col grid): Obsidian Studio Chamber Photography */}
        <div className="lg:col-span-7 relative bg-[#070709] overflow-hidden h-[42vh] lg:h-full">
          {SIGNATURE_COURSES.map((course, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={course.id}
                className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive
                    ? 'opacity-100 scale-100 z-10'
                    : 'opacity-0 scale-105 z-0 pointer-events-none'
                }`}
              >
                <ResilientImage
                  src={course.image}
                  alt={`${course.title} plated inside dark studio chamber`}
                  fallbackTitle={course.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#050506]/65 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050506]/70 via-transparent to-[#050506]/30 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
