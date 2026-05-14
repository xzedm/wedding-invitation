interface VenueSectionProps {
  visible: boolean;
  delay: string;
}

export function VenueSection({ visible, delay }: VenueSectionProps) {
  return (
    <section
      style={{
        padding: "0 clamp(16px, 5vw, 24px) clamp(60px, 15vw, 100px)",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 1.2s ease, transform 1.2s ease`,
        transitionDelay: delay,
      }}
    >
      <p
        className="uppercase"
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 200,
          fontSize: "clamp(8px, 2.5vw, 10px)",
          letterSpacing: "0.34em",
          color: "#A08060",
          marginBottom: "clamp(20px, 5vw, 32px)",
        }}
      >
        The Venue
      </p>

      <p
        className="mb-3"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(24px, 6vw, 52px)",
          color: "#3A2E22",
        }}
      >
        The Grand Almaty Hall
      </p>

      <p
        className="uppercase mb-6"
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          fontSize: "clamp(11px, 2.5vw, 13px)",
          letterSpacing: "0.18em",
          color: "#8A7260",
        }}
      >
        12 Dostyk Avenue, Almaty, Kazakhstan
      </p>

      <span
        className="inline-block"
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 200,
          fontSize: '12px',
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          marginTop: "24px",
          paddingTop: "24px",
          borderTop: "0.5px solid #D9C5AF",
          color: '#A08060',
        }}
      >
        Ceremony at 4:00 PM · Dinner at 7:00 PM
      </span>
    </section>
  );
}
