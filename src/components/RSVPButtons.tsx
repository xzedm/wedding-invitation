interface RSVPButtonsProps {
  rsvp: string;
  onAttending: () => void;
  onDecline: () => void;
}

export function RSVPButtons({
  rsvp,
  onAttending,
  onDecline,
}: RSVPButtonsProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "clamp(8px, 3vw, 12px)",
        justifyContent: "center",
        marginBottom: "40px",
        flexWrap: "wrap",
      }}
    >
      <button
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          fontSize: "clamp(9px, 2vw, 11px)",
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          padding: "clamp(10px, 2vw, 14px) clamp(24px, 5vw, 32px)",
          border: "0.5px solid " + (rsvp === "attending" ? "#7A6250" : "#C9A882"),
          backgroundColor:
            rsvp === "attending" ? "#7A6250" : "transparent",
          color: rsvp === "attending" ? "#F5EFE6" : "#7A6250",
          cursor: "pointer",
          transition: "all 0.3s ease",
          outline: "none",
        }}
        onMouseEnter={(e) => {
          if (rsvp !== "attending") {
            e.currentTarget.style.backgroundColor = "#C9A882";
            e.currentTarget.style.color = "#F5EFE6";
          }
        }}
        onMouseLeave={(e) => {
          if (rsvp !== "attending") {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#7A6250";
          }
        }}
        onClick={onAttending}
      >
        Joyfully accepts
      </button>
      <button
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          fontSize: "clamp(9px, 2vw, 11px)",
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          padding: "clamp(10px, 2vw, 14px) clamp(24px, 5vw, 32px)",
          border: "0.5px solid " + (rsvp === "declined" ? "#A08060" : "#D9C5AF"),
          backgroundColor:
            rsvp === "declined" ? "#A08060" : "transparent",
          color: rsvp === "declined" ? "#F5EFE6" : "#7A6250",
          cursor: "pointer",
          transition: "all 0.3s ease",
          outline: "none",
        }}
        onMouseEnter={(e) => {
          if (rsvp !== "declined") {
            e.currentTarget.style.backgroundColor = "#C9A882";
            e.currentTarget.style.color = "#F5EFE6";
          }
        }}
        onMouseLeave={(e) => {
          if (rsvp !== "declined") {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#7A6250";
          }
        }}
        onClick={onDecline}
      >
        Regretfully declines
      </button>
    </div>
  );
}
