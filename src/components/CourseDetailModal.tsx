import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { MenuEntry, SignatureCourse, WHATSAPP_NUMBER } from '../data/culinaryData';
import { ResilientImage } from './ResilientImage';

interface CourseDetailModalProps {
  course: SignatureCourse | null;
  menuEntry: MenuEntry | null;
  onClose: () => void;
  onReserveCourse: (courseTitle: string) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  menuEntry,
  onClose,
  onReserveCourse,
}) => {
  const isOpen = Boolean(course || menuEntry);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const title = course ? course.title : menuEntry!.name;
  const subtitle = course ? course.subtitle : menuEntry!.category;
  const image = course ? course.image : menuEntry!.image;
  const price = course ? course.priceAed : menuEntry!.priceAed;
  const description = course ? course.description : menuEntry!.notes;
  const pairing = course ? course.pairing : menuEntry!.pairing;
  const dietary = course ? course.dietaryNote : menuEntry!.dietary;

  const whatsappText = encodeURIComponent(
    `Hello SOLAIA Concierge, I would like to inquire about "${title}" (AED ${price}) and reserve a table for dinner.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

  return (
    <div
      className="fixed inset-0 z-[95] bg-[#050506]/90 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Course details for ${title}`}
    >
      <div
        className="relative max-w-4xl w-full bg-[#09090C] border border-white/15 overflow-hidden grid grid-cols-1 md:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close course details"
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#050506]/85 border border-white/20 text-[#F5F3EE] hover:text-[#C89B5E] flex items-center justify-center cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Image */}
        <div className="md:col-span-6 bg-[#050506] min-h-[260px] md:min-h-[460px]">
          <ResilientImage
            src={image}
            alt={title}
            fallbackTitle={title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Right Details */}
        <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between gap-6">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#C89B5E]">
              {subtitle}
            </p>
            <div className="mt-2 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-4xl font-extrabold uppercase text-[#F5F3EE]">
                {title}
              </h3>
              <span className="font-mono-tabular text-lg font-medium text-[#F5F3EE] shrink-0">
                AED {price}
              </span>
            </div>

            <p className="mt-4 text-sm text-[#B8B2A6] leading-relaxed">
              {description}
            </p>

            <dl className="mt-6 pt-5 border-t border-white/10 space-y-3 text-sm">
              {course && (
                <>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#8E887E]">Provenance</dt>
                    <dd className="text-right text-[#F5F3EE]">{course.provenance}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#8E887E]">Technique</dt>
                    <dd className="text-right text-[#F5F3EE]">{course.technique}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#8E887E]">Service Temp</dt>
                    <dd className="text-right text-[#F5F3EE]">{course.cookingTemp}</dd>
                  </div>
                </>
              )}
              <div className="flex justify-between gap-4">
                <dt className="text-[#8E887E]">Cellar Pairing</dt>
                <dd className="text-right text-[#C89B5E]">{pairing}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#8E887E]">Dietary</dt>
                <dd className="text-right text-[#F5F3EE]">{dietary}</dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => onReserveCourse(title)}
              className="flex-1 py-3 px-4 text-xs font-semibold tracking-[0.12em] uppercase bg-[#F5F3EE] text-[#050506] hover:bg-[#C89B5E] transition-colors cursor-pointer"
            >
              Reserve for This Course
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 text-xs font-semibold tracking-[0.12em] uppercase border border-white/20 text-center text-[#F5F3EE] hover:border-[#C89B5E] hover:text-[#C89B5E] transition-colors whitespace-nowrap"
            >
              WhatsApp Sommelier
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
