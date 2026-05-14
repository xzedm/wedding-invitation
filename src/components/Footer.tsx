export function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "clamp(24px, 5vw, 40px) clamp(16px, 5vw, 24px) clamp(36px, 8vw, 60px)",
        borderTop: "0.5px solid #D9C5AF",
      }}
    >
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(12px, 2.5vw, 14px)",
          color: "#A08060",
          letterSpacing: "0.04em",
        }}
      >
        Adil &amp; Zeinura · July 2026 · Almaty
      </p>
    </footer>
  );
}
