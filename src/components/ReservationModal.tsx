import React, { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/culinaryData';

interface ReservationModalProps {
  isOpen: boolean;
  initialCourseNote?: string;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  initialCourseNote = '',
  onClose,
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState('2026-11-21');
  const [time, setTime] = useState('20:30');
  const [guests, setGuests] = useState('2');
  const [note, setNote] = useState(initialCourseNote);
  const [error, setError] = useState<string | null>(null);
  const [refCode, setRefCode] = useState<string | null>(null);

  useEffect(() => {
    setNote(initialCourseNote);
    setRefCode(null);
    setError(null);
  }, [initialCourseNote, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello SOLAIA Dubai, I would like to book for ${guests} guests on ${date} at ${time}.${
      note ? ` Preference: ${note}` : ''
    }${name ? ` (${name})` : ''}`
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!contact.trim()) {
      setError('Please provide a phone number or email.');
      return;
    }
    setError(null);
    setRefCode(`SOL-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  return (
    <div
      className="fixed inset-0 z-[95] bg-[#050506]/90 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Reserve a table at SOLAIA"
    >
      <div
        className="relative max-w-lg w-full bg-[#09090C] border border-white/15 p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close reservation dialog"
          className="absolute top-4 right-4 w-9 h-9 border border-white/15 text-[#F5F3EE] hover:text-[#C89B5E] flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#C89B5E]">
          Downtown Dubai · Chef’s Salon
        </p>
        <h3 className="mt-1 font-display text-3xl font-extrabold uppercase text-[#F5F3EE]">
          Reserve a Table
        </h3>

        {refCode ? (
          <div className="mt-6 space-y-5">
            <div className="p-4 bg-[#050506] border border-white/10">
              <span className="text-xs uppercase tracking-[0.16em] text-[#C89B5E]">
                Confirmed · {refCode}
              </span>
              <p className="mt-2 text-sm text-[#F5F3EE]">
                {name} · {guests} Guests · {date} at {time}
              </p>
              {note && <p className="mt-1 text-xs text-[#8E887E]">{note}</p>}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 text-xs font-semibold tracking-[0.12em] uppercase bg-[#F5F3EE] text-[#050506] hover:bg-[#C89B5E] transition-colors cursor-pointer"
              >
                Done
              </button>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 text-xs font-semibold tracking-[0.12em] uppercase border border-white/20 text-[#F5F3EE] hover:border-[#C89B5E] transition-colors"
              >
                WhatsApp Copy
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] text-[#8E887E] mb-1.5">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#050506] border border-white/15 px-3 py-2.5 text-sm text-[#F5F3EE] focus:outline-none focus:border-[#C89B5E]"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] text-[#8E887E] mb-1.5">
                  Time
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#050506] border border-white/15 px-3 py-2.5 text-sm text-[#F5F3EE] focus:outline-none focus:border-[#C89B5E]"
                >
                  {['18:30', '19:30', '20:30', '21:30', '22:30'].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] text-[#8E887E] mb-1.5">
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-[#050506] border border-white/15 px-3 py-2.5 text-sm text-[#F5F3EE] focus:outline-none focus:border-[#C89B5E]"
                >
                  {['1', '2', '4', '6', '8'].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#8E887E] mb-1.5">
                Guest Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#050506] border border-white/15 px-3.5 py-2.5 text-sm text-[#F5F3EE] placeholder:text-[#52525B] focus:outline-none focus:border-[#C89B5E]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#8E887E] mb-1.5">
                Phone or Email
              </label>
              <input
                type="text"
                placeholder="+971 50 000 0000"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full bg-[#050506] border border-white/15 px-3.5 py-2.5 text-sm text-[#F5F3EE] placeholder:text-[#52525B] focus:outline-none focus:border-[#C89B5E]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#8E887E] mb-1.5">
                Course or Dietary Note
              </label>
              <input
                type="text"
                placeholder="Chef's Counter, Miyazaki A5, allergies..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full bg-[#050506] border border-white/15 px-3.5 py-2.5 text-sm text-[#F5F3EE] placeholder:text-[#52525B] focus:outline-none focus:border-[#C89B5E]"
              />
            </div>

            {error && <p className="text-xs text-[#F87171]">{error}</p>}

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 py-3 text-xs font-semibold tracking-[0.12em] uppercase bg-[#F5F3EE] text-[#050506] hover:bg-[#C89B5E] transition-colors cursor-pointer"
              >
                Request Table
              </button>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold tracking-[0.12em] uppercase bg-[#1C2A22] border border-[#3B6B4F] text-[#E6F4EC] hover:bg-[#24382D] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
