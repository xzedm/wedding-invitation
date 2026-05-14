import { CountdownTimer } from "./CountdownTimer";

interface DateSectionProps {
  visible: boolean;
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  delay: string;
}

export function DateSection({ visible, countdown, delay }: DateSectionProps) {
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
        The Date
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          gap: "clamp(12px, 5vw, 20px)",
          marginBottom: "8px",
          flexWrap: "wrap",
        }}
      >
        <span
          className="font-serif font-light text-wedding-dark leading-tight"
          style={{ fontSize: "clamp(64px, 12vw, 130px)" }}
        >
          13
        </span>
        <span
          className="font-serif italic text-wedding-gold"
          style={{ fontSize: "clamp(28px, 5vw, 54px)" }}
        >
          ·
        </span>
        <span
          className="font-serif font-light text-wedding-dark leading-tight"
          style={{ fontSize: "clamp(64px, 12vw, 130px)" }}
        >
          09
        </span>
        <span
          className="font-serif italic text-wedding-gold"
          style={{ fontSize: "clamp(28px, 5vw, 54px)" }}
        >
          ·
        </span>
        <span
          className="font-serif font-light text-wedding-dark leading-tight"
          style={{ fontSize: "clamp(64px, 12vw, 130px)" }}
        >
          25
        </span>
      </div>

      <p
        className="uppercase mt-5"
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          fontSize: '13px',
          letterSpacing: '0.2em',
          color: '#8A7260',
        }}
      >
        Friday · July 2026
      </p>

      <CountdownTimer {...countdown} />
    </section>
  );
}
