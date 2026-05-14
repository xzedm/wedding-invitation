interface CountdownTimerProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({
  days,
  hours,
  minutes,
  seconds,
}: CountdownTimerProps) {
  const units = [
    { val: days, label: "Days" },
    { val: hours, label: "Hours" },
    { val: minutes, label: "Minutes" },
    { val: seconds, label: "Seconds" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "clamp(16px, 4vw, 60px)",
        marginTop: "clamp(40px, 10vw, 56px)",
        flexWrap: "wrap",
      }}
    >
      {units.map(({ val, label }) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(4px, 1vw, 6px)",
          }}
          key={label}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(32px, 7vw, 64px)",
              lineHeight: 1,
              color: "#5C4A35",
              minWidth: "2ch",
              textAlign: "center",
            }}
          >
            {String(val ?? 0).padStart(2, "0")}
          </span>
          <span
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 200,
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#A08060",
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
