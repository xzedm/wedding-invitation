interface HeroSectionProps {
  visible: boolean;
}

export function HeroSection({ visible }: HeroSectionProps) {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(40px, 10vw, 60px) clamp(16px, 5vw, 24px)",
        position: "relative",
        textAlign: "center",
      }}
    >
      <p
        className={`uppercase transition-all duration-1200 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 200,
          fontSize: "clamp(9px, 2vw, 11px)",
          letterSpacing: "0.32em",
          color: "#8A7260",
          marginBottom: "clamp(24px, 6vw, 40px)",
          transitionDelay: "0.2s",
        }}
      >
        Together with their families
      </p>

      {/* Botanical SVG */}
      <svg
        className={`block mx-auto transition-all duration-1200 ${
          visible ? "opacity-35" : "opacity-0"
        }`}
        style={{
          width: "clamp(100px, 40vw, 160px)",
          height: "clamp(37.5px, 15vw, 60px)",
          maxWidth: "100%",
          transitionDelay: "0.2s",
        }}
        viewBox="0 0 160 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M80 55 C60 40, 30 35, 10 20"
          stroke="#C9A882"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M80 55 C100 40, 130 35, 150 20"
          stroke="#C9A882"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M40 30 C38 22, 32 16, 26 10"
          stroke="#C9A882"
          strokeWidth="0.6"
          fill="none"
        />
        <path
          d="M55 37 C54 28, 50 21, 45 13"
          stroke="#C9A882"
          strokeWidth="0.6"
          fill="none"
        />
        <path
          d="M120 30 C122 22, 128 16, 134 10"
          stroke="#C9A882"
          strokeWidth="0.6"
          fill="none"
        />
        <path
          d="M105 37 C106 28, 110 21, 115 13"
          stroke="#C9A882"
          strokeWidth="0.6"
          fill="none"
        />
        <circle cx="26" cy="9" r="2" fill="#C9A882" />
        <circle cx="45" cy="12" r="1.5" fill="#C9A882" />
        <circle cx="134" cy="9" r="2" fill="#C9A882" />
        <circle cx="115" cy="12" r="1.5" fill="#C9A882" />
        <circle cx="10" cy="19" r="2.5" fill="#C9A882" />
        <circle cx="150" cy="19" r="2.5" fill="#C9A882" />
      </svg>

      <div
        className={`transition-all duration-1200 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: "0.5s" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(28px, 8vw, 80px)",
              lineHeight: 1.05,
              letterSpacing: "0.04em",
              color: "#3A2E22",
            }}
          >
            Adil
          </span>
          <span
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 200,
              fontSize: "clamp(9px, 2vw, 11px)",
              letterSpacing: "0.28em",
              color: "#A08060",
              textTransform: "uppercase",
              display: "block",
              margin: "clamp(8px, 2vw, 12px) 0",
            }}
          >
            and
          </span>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(28px, 8vw, 80px)",
              lineHeight: 1.05,
              letterSpacing: "0.04em",
              color: "#3A2E22",
            }}
          >
            Zeinura
          </span>
        </div>
      </div>

      <p
        className={`italic leading-relaxed transition-all duration-1200 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(14px, 3.5vw, 20px)",
          color: "#7A6250",
          lineHeight: 1.8,
          marginTop: "clamp(32px, 8vw, 48px)",
          maxWidth: "90%",
          transitionDelay: "0.8s",
        }}
      >
        request the honour of your presence
        <br />
        at their wedding celebration
      </p>
    </section>
  );
}
