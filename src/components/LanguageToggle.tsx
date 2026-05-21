import type { CSSProperties } from "react";
import type { Language } from "../translations";

interface LanguageToggleProps {
  currentLanguage: Language;
  onToggle: () => void;
  colors: {
    green: string;
    greenLight: string;
    cream: string;
  };
  fonts: {
    body: string;
  };
}

export function LanguageToggle({ currentLanguage, onToggle, colors, fonts }: LanguageToggleProps) {
  const containerStyle: CSSProperties = {
    position: "fixed",
    top: 24,
    right: 24,
    zIndex: 100,
    display: "flex",
    gap: 8,
    background: "rgba(255,255,255,0.65)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(107,125,90,0.2)",
    borderRadius: 20,
    padding: "6px 8px",
    boxShadow: "0 4px 16px rgba(107,125,90,0.12)",
  };

  const buttonStyle = (isActive: boolean): CSSProperties => ({
    fontFamily: fonts.body,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.05em",
    padding: "6px 14px",
    border: "none",
    borderRadius: 16,
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: isActive
      ? "linear-gradient(135deg,#5a6e48,#6b7d5a)"
      : "transparent",
    color: isActive ? colors.cream : colors.green,
    opacity: isActive ? 1 : 0.6,
    boxShadow: isActive ? "0 2px 8px rgba(90,110,72,0.25)" : "none",
  });

  return (
    <div style={containerStyle}>
      <button
        onClick={() => currentLanguage === 'kk' && onToggle()}
        style={buttonStyle(currentLanguage === 'en')}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => currentLanguage === 'en' && onToggle()}
        style={buttonStyle(currentLanguage === 'kk')}
        aria-label="Қазақшаға ауысу"
      >
        ҚЗ
      </button>
    </div>
  );
}
