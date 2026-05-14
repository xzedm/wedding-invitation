interface RSVPFormProps {
  name: string;
  guests: string;
  rsvp: string;
  onNameChange: (name: string) => void;
  onGuestsChange: (guests: string) => void;
  onSubmit: () => void;
}

export function RSVPForm({
  name,
  guests,
  rsvp,
  onNameChange,
  onGuestsChange,
  onSubmit,
}: RSVPFormProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        animation: "formIn 0.5s ease",
      }}
    >
      <input
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          fontSize: "clamp(13px, 2.5vw, 14px)",
          letterSpacing: "0.06em",
          padding: "clamp(10px, 2vw, 14px) clamp(12px, 3vw, 20px)",
          border: "0.5px solid #C9A882",
          backgroundColor: "transparent",
          color: "#3A2E22",
          outline: "none",
          width: "100%",
          transition: "border-color 0.3s",
          boxSizing: "border-box",
        }}
        placeholder="Your full name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#8A7260";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#C9A882";
        }}
      />

      {rsvp === "attending" && (
        <select
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(13px, 2.5vw, 14px)",
            letterSpacing: "0.06em",
            padding: "clamp(10px, 2vw, 14px) clamp(12px, 3vw, 20px)",
            border: "0.5px solid #C9A882",
            backgroundColor: "#F5EFE6",
            color: "#3A2E22",
            outline: "none",
            width: "100%",
            appearance: "none",
            cursor: "pointer",
            boxSizing: "border-box",
          }}
          value={guests}
          onChange={(e) => onGuestsChange(e.target.value)}
        >
          <option value="1">1 guest</option>
          <option value="2">2 guests</option>
          <option value="3">3 guests</option>
          <option value="4">4 guests</option>
        </select>
      )}

      <button
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          fontSize: "clamp(9px, 2vw, 11px)",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          padding: "clamp(12px, 2vw, 16px)",
          backgroundColor: !name.trim() ? "#C9A882" : "#7A6250",
          color: "#F5EFE6",
          border: "none",
          cursor: !name.trim() ? "default" : "pointer",
          transition: "background 0.3s",
          marginTop: "8px",
        }}
        onClick={onSubmit}
        onMouseEnter={(e) => {
          if (name.trim()) {
            e.currentTarget.style.backgroundColor = "#5C4A35";
          }
        }}
        onMouseLeave={(e) => {
          if (name.trim()) {
            e.currentTarget.style.backgroundColor = "#7A6250";
          }
        }}
        disabled={!name.trim()}
      >
        {rsvp === "attending" ? "Confirm Attendance" : "Send Regrets"}
      </button>
    </div>
  );
}
