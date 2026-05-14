import { RSVPButtons } from "./RSVPButtons";
import { RSVPForm } from "./RSVPForm";
import { RSVPSuccess } from "./RSVPSuccess";

interface RSVPSectionProps {
  visible: boolean;
  delay: string;
  rsvp: string;
  name: string;
  guests: string;
  submitted: boolean;
  onRsvpChange: (value: string) => void;
  onNameChange: (name: string) => void;
  onGuestsChange: (guests: string) => void;
  onSubmit: () => void;
}

export function RSVPSection({
  visible,
  delay,
  rsvp,
  name,
  guests,
  submitted,
  onRsvpChange,
  onNameChange,
  onGuestsChange,
  onSubmit,
}: RSVPSectionProps) {
  return (
    <section
      style={{
        padding: "0 clamp(16px, 5vw, 24px) clamp(80px, 15vw, 120px)",
        textAlign: "center",
        maxWidth: "480px",
        margin: "0 auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 1.2s ease, transform 1.2s ease`,
        transitionDelay: delay,
      }}
    >
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: "clamp(32px, 6vw, 56px)",
          color: "#3A2E22",
          marginBottom: "8px",
        }}
      >
        RSVP
      </h2>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "17px",
          color: "#A08060",
          marginBottom: "48px",
        }}
      >
        Kindly reply by August 1st, 2025
      </p>

      {!submitted ? (
        <>
          <RSVPButtons
            rsvp={rsvp}
            onAttending={() => onRsvpChange("attending")}
            onDecline={() => onRsvpChange("declined")}
          />

          {rsvp !== "idle" && (
            <RSVPForm
              name={name}
              guests={guests}
              rsvp={rsvp}
              onNameChange={onNameChange}
              onGuestsChange={onGuestsChange}
              onSubmit={onSubmit}
            />
          )}
        </>
      ) : (
        <RSVPSuccess name={name} rsvp={rsvp} />
      )}
    </section>
  );
}
