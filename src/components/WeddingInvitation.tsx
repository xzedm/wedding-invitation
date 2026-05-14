import { useState, useEffect } from "react";
import { useCountdown } from "../hooks/useCountdown";
import { HeroSection } from "./HeroSection";
import { DividerSection } from "./DividerSection";
import { DateSection } from "./DateSection";
import { VenueSection } from "./VenueSection";
import { RSVPSection } from "./RSVPSection";
import { Footer } from "./Footer";

const TARGET_DATE = new Date("2026-07-31T20:00:00");

export default function WeddingInvitation() {
  const [rsvp, setRsvp] = useState("idle");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);
  const countdown = useCountdown(TARGET_DATE);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = () => {
    if (!name.trim()) return;
    setSubmitted(true);
  };

  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden flex flex-col"
      style={{
        backgroundColor: '#F5EFE6',
        color: '#3A2E22',
      }}
    >
      <HeroSection visible={visible} />
      <DividerSection visible={visible} delay="0.4s" />
      <DateSection visible={visible} countdown={countdown} delay="0.4s" />
      <DividerSection visible={visible} delay="0.7s" />
      <VenueSection visible={visible} delay="0.7s" />
      <DividerSection visible={visible} delay="1s" />
      <RSVPSection
        visible={visible}
        delay="1s"
        rsvp={rsvp}
        name={name}
        guests={guests}
        submitted={submitted}
        onRsvpChange={setRsvp}
        onNameChange={setName}
        onGuestsChange={setGuests}
        onSubmit={handleSubmit}
      />
      <Footer />
    </div>
  );
}
