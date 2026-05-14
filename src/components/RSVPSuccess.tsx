interface RSVPSuccessProps {
  name: string;
  rsvp: string;
}

export function RSVPSuccess({ name, rsvp }: RSVPSuccessProps) {
  return (
    <div
      style={{
        padding: "40px",
        animation: "formIn 0.6s ease",
      }}
    >
      <div
        style={{
          fontSize: "32px",
          marginBottom: "16px",
          textAlign: "center",
        }}
      >
        ✦
      </div>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "22px",
          color: "#5C4A35",
          lineHeight: 1.6,
          textAlign: "center",
        }}
      >
        {rsvp === "attending" ? (
          <>
            We are overjoyed, {name}.
            <br />
            We cannot wait to celebrate with you.
          </>
        ) : (
          <>
            Thank you, {name}.
            <br />
            You will be dearly missed.
          </>
        )}
      </p>
    </div>
  );
}
