import React, { useState } from 'react';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { CinematicSequence } from './components/CinematicSequence';
import { ManifestoOrbital } from './components/ManifestoOrbital';
import { PinnedShowroom } from './components/PinnedShowroom';
import { MenuAndGallery } from './components/MenuAndGallery';
import { ReservationAndContact } from './components/ReservationAndContact';
import { CourseDetailModal } from './components/CourseDetailModal';
import { ReservationModal } from './components/ReservationModal';
import {
  MenuEntry,
  SIGNATURE_COURSES,
  SignatureCourse,
} from './data/culinaryData';

export default function App() {
  const [selectedShowroomCourseId, setSelectedShowroomCourseId] = useState<string | null>(
    null
  );
  const [inspectedCourse, setInspectedCourse] = useState<SignatureCourse | null>(null);
  const [inspectedMenuEntry, setInspectedMenuEntry] = useState<MenuEntry | null>(null);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [reservePrefillNote, setReservePrefillNote] = useState('');

  const handleSelectOrbitalCourse = (courseId: string) => {
    setSelectedShowroomCourseId(courseId);
    const course = SIGNATURE_COURSES.find((c) => c.id === courseId);
    if (course) {
      setInspectedCourse(course);
    } else {
      document.querySelector('#showroom')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInspectCenterpiece = () => {
    setInspectedCourse(SIGNATURE_COURSES[0]);
  };

  const handleExploreSalon = () => {
    document.querySelector('#salon')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReserveWithNote = (courseTitle: string) => {
    setInspectedCourse(null);
    setInspectedMenuEntry(null);
    setReservePrefillNote(`Interested in: ${courseTitle}`);
    setIsReserveModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050506] text-[#F5F3EE]">
      <Preloader />
      <Navbar
        onReserveClick={() => {
          setReservePrefillNote('');
          setIsReserveModalOpen(true);
        }}
      />

      <main>
        {/* Scenes 1–6 (00:00 – 00:06) */}
        <CinematicSequence
          onExploreSalon={handleExploreSalon}
          onInspectCenterpiece={handleInspectCenterpiece}
          onReserveClick={() => {
            setReservePrefillNote('');
            setIsReserveModalOpen(true);
          }}
        />

        {/* Scenes 7–8 (00:07 – 00:10): Typewriter Manifesto + 3D Orbital Ring */}
        <ManifestoOrbital onSelectCourse={handleSelectOrbitalCourse} />

        {/* Scene 9 (00:11 – 00:15): Pinned Split-Screen Tasting Showroom */}
        <PinnedShowroom
          selectedCourseId={selectedShowroomCourseId}
          onInspectCourse={(course) => setInspectedCourse(course)}
          onReserveCourse={(course) => handleReserveWithNote(course.title)}
        />

        {/* Complete Seasonal Menu, Salon Gallery & Chef Philosophy */}
        <MenuAndGallery
          onInspectCourse={(course) => setInspectedCourse(course)}
          onInspectMenuEntry={(entry) => setInspectedMenuEntry(entry)}
          onReserveClick={() => {
            setReservePrefillNote('');
            setIsReserveModalOpen(true);
          }}
        />
      </main>

      {/* Reservation Ledger, WhatsApp Concierge & Quiet Footer */}
      <ReservationAndContact prefilledNote={reservePrefillNote} />

      {/* Interactive Modals */}
      <CourseDetailModal
        course={inspectedCourse}
        menuEntry={inspectedMenuEntry}
        onClose={() => {
          setInspectedCourse(null);
          setInspectedMenuEntry(null);
        }}
        onReserveCourse={handleReserveWithNote}
      />

      <ReservationModal
        isOpen={isReserveModalOpen}
        initialCourseNote={reservePrefillNote}
        onClose={() => setIsReserveModalOpen(false)}
      />
    </div>
  );
}
