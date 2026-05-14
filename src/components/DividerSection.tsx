interface DividerSectionProps {
  visible: boolean;
  delay: string;
}

export function DividerSection({ visible, delay }: DividerSectionProps) {
  return (
    <div
      className={`flex items-center justify-center transition-all duration-1200 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{
        gap: "16px",
        padding: "clamp(40px, 10vw, 64px) clamp(16px, 5vw, 24px)",
        transitionDelay: delay,
      }}
    >
      <div
        style={{
          height: "0.5px",
          width: "clamp(50px, 15vw, 80px)",
          backgroundColor: "#C9A882",
        }}
      />
      <div
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          backgroundColor: "#C9A882",
        }}
      />
      <div
        style={{
          height: "0.5px",
          width: "clamp(50px, 15vw, 80px)",
          backgroundColor: "#C9A882",
        }}
      />
    </div>
  );
}
