import React, { useState } from 'react';
import { Check, Copy, MapPin, MessageCircle, Phone } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/culinaryData';

interface ReservationAndContactProps {
  prefilledNote?: string;
}

const SEATING_ZONES = [
  'Chef’s Counter (Hearth View)',
  'Main Dining Salon',
  'Skyline Terrace',
  'Private Cellar Vault (6–14 Guests)',
];

const SEATING_TIMES = ['18:30', '19:30', '20:30', '21:30', '22:30'];

export const ReservationAndContact: React.FC<ReservationAndContactProps> = ({
  prefilledNote = '',
}) => {
  const [guestName, setGuestName] = useState('');
  const [guestContact, setGuestContact] = useState('');
  const [date, setDate] = useState('2026-11-21');
  const [time, setTime] = useState('20:30');
  const [guests, setGuests] = useState('2');
  const [zone, setZone] = useState(SEATING_ZONES[0]);
  const [notes, setNotes] = useState(prefilledNote);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const composedWhatsappMessage = `Hello SOLAIA Dubai Concierge,\nI would like to request a reservation:\n• Name: ${
    guestName || 'Guest'
  }\n• Date: ${date} at ${time}\n• Party Size: ${guests} Guests\n• Seating: ${zone}${
    notes ? `\n• Notes / Course Request: ${notes}` : ''
  }`;

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    composedWhatsappMessage
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!guestName.trim() || guestName.trim().length < 2) {
      setErrorMsg('Please enter your full name for the reservation ledger.');
      return;
    }

    if (!guestContact.trim() || guestContact.trim().length < 6) {
      setErrorMsg('Please enter a valid phone number or email address.');
      return;
    }

    const refCode = `SOL-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedRef(refCode);
  };

  const handleCopyWhatsapp = async () => {
    try {
      await navigator.clipboard.writeText(composedWhatsappMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <footer
      id="reservations"
      className="bg-[#050506] text-[#F5F3EE] border-t border-white/10"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Location, Hours & Direct WhatsApp Concierge */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-10">
            <div>
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#C89B5E] mb-3">
                Reservations & Concierge
              </p>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold uppercase leading-[0.92] text-[#F5F3EE]">
                Reserve Your Evening
              </h2>
              <p className="mt-4 text-base text-[#B8B2A6] leading-relaxed">
                Seatings open thirty days in advance. For same-evening counter releases, private cellar buyouts, or chauffeur valet coordination, message our concierge directly on WhatsApp.
              </p>

              <div className="mt-8 space-y-4 text-sm border-t border-white/10 pt-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C89B5E] mt-1 shrink-0" />
                  <div>
                    <span className="block font-medium text-[#F5F3EE]">
                      Level 4, Boulevard Obsidian Tower
                    </span>
                    <span className="text-[#8E887E]">
                      Sheikh Mohammed bin Rashid Blvd, Downtown Dubai
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C89B5E] mt-1 shrink-0" />
                  <div>
                    <span className="block font-medium text-[#F5F3EE] font-mono-tabular">
                      +971 4 555 0192
                    </span>
                    <span className="text-[#8E887E]">
                      Tuesday – Sunday · 18:00 to 01:00
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live WhatsApp Concierge Card */}
            <div className="bg-[#09090C] border border-white/10 p-6">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-xs font-semibold tracking-[0.16em] uppercase text-[#C89B5E]">
                  WhatsApp Direct Concierge
                </span>
                <button
                  type="button"
                  onClick={handleCopyWhatsapp}
                  className="inline-flex items-center gap-1.5 text-xs text-[#A89F91] hover:text-[#F5F3EE] transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#C89B5E]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Inquiry</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs text-[#B8B2A6] whitespace-pre-wrap font-sans-body leading-relaxed bg-[#050506] p-3.5 border border-white/5">
                {composedWhatsappMessage}
              </pre>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 text-xs font-semibold tracking-[0.12em] uppercase bg-[#1C2A22] border border-[#3B6B4F] text-[#E6F4EC] hover:bg-[#24382D] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Inquiry via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Table Booking Form */}
          <div className="lg:col-span-7 bg-[#09090C] border border-white/10 p-6 md:p-10">
            {confirmedRef ? (
              <div className="h-full flex flex-col justify-center py-8">
                <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#C89B5E]">
                  Reservation Confirmed
                </p>
                <h3 className="mt-2 font-display text-4xl font-extrabold uppercase text-[#F5F3EE]">
                  Reference {confirmedRef}
                </h3>
                <p className="mt-4 text-sm text-[#B8B2A6] max-w-md leading-relaxed">
                  Your table request for <strong className="text-[#F5F3EE]">{guests} guests</strong> on{' '}
                  <strong className="text-[#F5F3EE]">{date}</strong> at{' '}
                  <strong className="text-[#F5F3EE]">{time}</strong> ({zone}) is logged with our host desk.
                </p>

                <div className="mt-6 p-5 bg-[#050506] border border-white/10 space-y-2 text-sm max-w-md">
                  <div className="flex justify-between">
                    <span className="text-[#8E887E]">Guest</span>
                    <span className="text-[#F5F3EE]">{guestName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8E887E]">Contact</span>
                    <span className="text-[#F5F3EE]">{guestContact}</span>
                  </div>
                  {notes && (
                    <div className="flex justify-between gap-4">
                      <span className="text-[#8E887E]">Notes</span>
                      <span className="text-[#F5F3EE] text-right">{notes}</span>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setConfirmedRef(null)}
                    className="px-6 py-3 text-xs font-semibold tracking-[0.12em] uppercase bg-[#F5F3EE] text-[#050506] hover:bg-[#C89B5E] transition-colors cursor-pointer"
                  >
                    Modify Reservation
                  </button>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 text-xs font-semibold tracking-[0.12em] uppercase border border-white/20 text-[#F5F3EE] hover:border-[#C89B5E] transition-colors"
                  >
                    Confirm via WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="res-date"
                      className="block text-xs font-medium uppercase tracking-[0.14em] text-[#8E887E] mb-2"
                    >
                      Date
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#050506] border border-white/15 px-3.5 py-3 text-sm text-[#F5F3EE] focus:outline-none focus:border-[#C89B5E]"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="res-time"
                      className="block text-xs font-medium uppercase tracking-[0.14em] text-[#8E887E] mb-2"
                    >
                      Seating
                    </label>
                    <select
                      id="res-time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#050506] border border-white/15 px-3.5 py-3 text-sm text-[#F5F3EE] focus:outline-none focus:border-[#C89B5E]"
                    >
                      {SEATING_TIMES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="res-guests"
                      className="block text-xs font-medium uppercase tracking-[0.14em] text-[#8E887E] mb-2"
                    >
                      Party Size
                    </label>
                    <select
                      id="res-guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-[#050506] border border-white/15 px-3.5 py-3 text-sm text-[#F5F3EE] focus:outline-none focus:border-[#C89B5E]"
                    >
                      {['1', '2', '3', '4', '5', '6', '8', '10', '12'].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === '1' ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-medium uppercase tracking-[0.14em] text-[#8E887E] mb-2">
                    Dining Zone
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SEATING_ZONES.map((z) => {
                      const active = zone === z;
                      return (
                        <button
                          key={z}
                          type="button"
                          onClick={() => setZone(z)}
                          className={`px-4 py-3 text-left text-xs font-medium border transition-colors cursor-pointer ${
                            active
                              ? 'border-[#C89B5E] bg-[#C89B5E]/15 text-[#F5F3EE]'
                              : 'border-white/10 bg-[#050506] text-[#A89F91] hover:border-white/25'
                          }`}
                        >
                          {z}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="res-name"
                      className="block text-xs font-medium uppercase tracking-[0.14em] text-[#8E887E] mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="res-name"
                      type="text"
                      placeholder="Layla Al Mansoori"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-[#050506] border border-white/15 px-3.5 py-3 text-sm text-[#F5F3EE] placeholder:text-[#52525B] focus:outline-none focus:border-[#C89B5E]"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="res-contact"
                      className="block text-xs font-medium uppercase tracking-[0.14em] text-[#8E887E] mb-2"
                    >
                      Phone or Email
                    </label>
                    <input
                      id="res-contact"
                      type="text"
                      placeholder="+971 50 000 0000"
                      value={guestContact}
                      onChange={(e) => setGuestContact(e.target.value)}
                      className="w-full bg-[#050506] border border-white/15 px-3.5 py-3 text-sm text-[#F5F3EE] placeholder:text-[#52525B] focus:outline-none focus:border-[#C89B5E]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="res-notes"
                    className="block text-xs font-medium uppercase tracking-[0.14em] text-[#8E887E] mb-2"
                  >
                    Tasting Notes, Allergies or Valet Request
                  </label>
                  <textarea
                    id="res-notes"
                    rows={3}
                    placeholder="Eight-course tasting progression, shellfish allergy, anniversary pairing..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#050506] border border-white/15 px-3.5 py-3 text-sm text-[#F5F3EE] placeholder:text-[#52525B] focus:outline-none focus:border-[#C89B5E]"
                  />
                </div>

                {errorMsg && (
                  <p role="alert" className="text-xs text-[#F87171]">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-4 text-xs font-semibold tracking-[0.14em] uppercase bg-[#F5F3EE] text-[#050506] hover:bg-[#C89B5E] transition-colors cursor-pointer"
                >
                  Confirm Table Request
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quiet Footer Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#8E887E]">
          <div className="flex items-center gap-4">
            <span className="font-display text-lg font-extrabold tracking-[0.16em] uppercase text-[#F5F3EE]">
              SOLAIA
            </span>
            <span>Downtown Dubai · Open-Fire Tasting Room & Private Cellar</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#story" className="hover:text-[#F5F3EE] transition-colors">
              Story
            </a>
            <a href="#showroom" className="hover:text-[#F5F3EE] transition-colors">
              Showroom
            </a>
            <a href="#menu" className="hover:text-[#F5F3EE] transition-colors">
              Menu
            </a>
            <span>© 2026 SOLAIA Hospitality</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
