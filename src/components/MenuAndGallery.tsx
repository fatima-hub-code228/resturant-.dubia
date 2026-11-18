import React, { useState } from 'react';
import { ArrowUpRight, Maximize2, X } from 'lucide-react';
import {
  GALLERY_FRAMES,
  GalleryFrame,
  MENU_CATALOG,
  MenuCategory,
  MenuEntry,
  SIGNATURE_COURSES,
  SignatureCourse,
} from '../data/culinaryData';
import { ResilientImage } from './ResilientImage';

interface MenuAndGalleryProps {
  onInspectCourse: (course: SignatureCourse) => void;
  onInspectMenuEntry: (entry: MenuEntry) => void;
  onReserveClick: () => void;
}

const MENU_CATEGORIES: MenuCategory[] = [
  'All',
  'Tasting Menu',
  'Hearth & Grill',
  'Raw & Crudo',
  'Cellar Pairings',
  'Desserts',
];

type RoomFilter = 'All' | GalleryFrame['room'];
const ROOM_FILTERS: RoomFilter[] = [
  'All',
  'The Dining Room',
  'Open Hearth',
  'Plating Studio',
  'Private Cellar',
];

export const MenuAndGallery: React.FC<MenuAndGalleryProps> = ({
  onInspectCourse,
  onInspectMenuEntry,
  onReserveClick,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [selectedRoom, setSelectedRoom] = useState<RoomFilter>('All');
  const [lightboxFrame, setLightboxFrame] = useState<GalleryFrame | null>(null);

  const filteredMenu =
    selectedCategory === 'All'
      ? MENU_CATALOG
      : MENU_CATALOG.filter((item) => item.category === selectedCategory);

  const filteredGallery =
    selectedRoom === 'All'
      ? GALLERY_FRAMES
      : GALLERY_FRAMES.filter((frame) => frame.room === selectedRoom);

  const handleMenuClick = (entry: MenuEntry) => {
    if (entry.featuredCourseId) {
      const course = SIGNATURE_COURSES.find((c) => c.id === entry.featuredCourseId);
      if (course) {
        onInspectCourse(course);
        return;
      }
    }
    onInspectMenuEntry(entry);
  };

  return (
    <div className="bg-[#050506] text-[#F5F3EE]">
      {/* SEASONAL MENU SECTION */}
      <section
        id="menu"
        className="max-w-[1440px] mx-auto px-6 md:px-14 py-24 md:py-32 border-t border-white/10"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#C89B5E] mb-3">
              Autumn · Winter Progression
            </p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold uppercase leading-[0.92] text-[#F5F3EE] text-balance">
              Seasonal Tasting & Cellar
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter menu by category"
            className="flex flex-wrap items-center gap-1.5 bg-[#0C0C10] p-1.5 border border-white/10"
          >
            {MENU_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#F5F3EE] text-[#050506]'
                      : 'text-[#A89F91] hover:text-[#F5F3EE]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean 2-Column Editorial Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredMenu.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => handleMenuClick(entry)}
              className="group text-left bg-[#09090C] border border-white/10 hover:border-[#C89B5E]/60 transition-all duration-200 overflow-hidden flex flex-col sm:flex-row items-stretch cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B5E]"
            >
              <div className="sm:w-44 md:w-48 h-44 sm:h-auto shrink-0 overflow-hidden bg-[#0D0D11]">
                <ResilientImage
                  src={entry.image}
                  alt={entry.name}
                  fallbackTitle={entry.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex-1 p-6 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-[#F5F3EE] group-hover:text-[#C89B5E] transition-colors">
                      {entry.name}
                    </h3>
                    <span className="font-mono-tabular text-sm font-medium text-[#F5F3EE] shrink-0">
                      AED {entry.priceAed}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-[#B8B2A6] leading-relaxed">
                    {entry.notes}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3 text-xs text-[#8E887E]">
                  <div className="truncate">
                    <span>{entry.category}</span>
                    <span className="mx-1.5" aria-hidden="true">
                      ·
                    </span>
                    <span>{entry.dietary}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[#C89B5E] font-medium shrink-0">
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* SALON ARCHITECTURE & INTERACTIVE GALLERY */}
      <section
        id="salon"
        className="max-w-[1440px] mx-auto px-6 md:px-14 py-24 md:py-32 border-t border-white/10"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#C89B5E] mb-3">
              Architecture & Space
            </p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold uppercase leading-[0.92] text-[#F5F3EE] text-balance">
              The Dining Room & Cellar
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-[#0C0C10] p-1.5 border border-white/10">
            {ROOM_FILTERS.map((room) => {
              const active = selectedRoom === room;
              return (
                <button
                  key={room}
                  type="button"
                  onClick={() => setSelectedRoom(room)}
                  className={`px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#F5F3EE] text-[#050506]'
                      : 'text-[#A89F91] hover:text-[#F5F3EE]'
                  }`}
                >
                  {room}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((frame) => (
            <button
              key={frame.id}
              type="button"
              onClick={() => setLightboxFrame(frame)}
              className="group relative text-left bg-[#09090C] border border-white/10 hover:border-[#C89B5E]/60 overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B5E]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <ResilientImage
                  src={frame.image}
                  alt={frame.title}
                  fallbackTitle={frame.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs text-[#C89B5E] tracking-wide">
                    {frame.room}
                  </span>
                  <h3 className="mt-1 text-base font-semibold text-[#F5F3EE]">
                    {frame.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#A89F91] leading-snug">
                    {frame.caption}
                  </p>
                </div>
                <Maximize2 className="w-4 h-4 text-[#8E887E] group-hover:text-[#F5F3EE] shrink-0 mt-1" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ABOUT & CULINARY LEADERSHIP */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-14 py-24 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#C89B5E] mb-3">
                Philosophy & Provenance
              </p>
              <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-extrabold uppercase leading-[0.94] text-[#F5F3EE] text-balance">
                Fire, Steel & Midnight Precision
              </h2>
              <p className="mt-6 text-base text-[#B8B2A6] leading-relaxed max-w-xl">
                Founded in Downtown Dubai by Executive Chef Kenji Takahashi and Head Sommelier Claire Moreau, SOLAIA strips away dining-room theatre in favour of elemental clarity: line-caught Atlantic fish, single-estate Miyazaki beef, and white Kishu binchotan embers burning at 900°C.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10">
              <div>
                <span className="font-mono-tabular text-2xl font-medium text-[#F5F3EE]">
                  12
                </span>
                <span className="block text-xs text-[#8E887E] mt-1">
                  Chef Counter Seats
                </span>
              </div>
              <div>
                <span className="font-mono-tabular text-2xl font-medium text-[#F5F3EE]">
                  900°C
                </span>
                <span className="block text-xs text-[#8E887E] mt-1">
                  Kishu Binchotan
                </span>
              </div>
              <div>
                <span className="font-mono-tabular text-2xl font-medium text-[#F5F3EE]">
                  420
                </span>
                <span className="block text-xs text-[#8E887E] mt-1">
                  Cellar Vintage Labels
                </span>
              </div>
              <div>
                <span className="font-mono-tabular text-2xl font-medium text-[#F5F3EE]">
                  8
                </span>
                <span className="block text-xs text-[#8E887E] mt-1">
                  Nightly Tasting Acts
                </span>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={onReserveClick}
                className="px-6 py-3.5 text-xs font-semibold tracking-[0.12em] uppercase bg-[#F5F3EE] text-[#050506] hover:bg-[#C89B5E] transition-colors cursor-pointer"
              >
                Request Chef’s Counter Seating
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 min-h-[380px] border border-white/10 overflow-hidden bg-[#09090C]">
            <ResilientImage
              src={ASSETS_SALON_IMAGE}
              alt="SOLAIA open-fire kitchen and Nero Marquina dining salon"
              fallbackTitle="SOLAIA Dining Salon"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* GALLERY LIGHTBOX MODAL */}
      {lightboxFrame && (
        <div
          className="fixed inset-0 z-[90] bg-[#050506]/95 flex items-center justify-center p-4 md:p-10"
          onClick={() => setLightboxFrame(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxFrame.title}
        >
          <div
            className="relative max-w-5xl w-full bg-[#09090C] border border-white/15 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxFrame(null)}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#050506]/85 border border-white/20 text-[#F5F3EE] hover:text-[#C89B5E] flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[16/10] w-full bg-[#050506]">
              <ResilientImage
                src={lightboxFrame.image}
                alt={lightboxFrame.title}
                fallbackTitle={lightboxFrame.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
              <div>
                <span className="text-xs uppercase tracking-[0.18em] text-[#C89B5E]">
                  {lightboxFrame.room}
                </span>
                <h3 className="text-xl font-semibold text-[#F5F3EE] mt-1">
                  {lightboxFrame.title}
                </h3>
                <p className="text-sm text-[#B8B2A6] mt-1">{lightboxFrame.caption}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLightboxFrame(null);
                  onReserveClick();
                }}
                className="px-5 py-3 text-xs font-semibold tracking-[0.12em] uppercase bg-[#F5F3EE] text-[#050506] hover:bg-[#C89B5E] transition-colors shrink-0 cursor-pointer"
              >
                Book This Space
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ASSETS_SALON_IMAGE = '/src/assets/images/scene_luxury_salon_1795008826909.jpg';
