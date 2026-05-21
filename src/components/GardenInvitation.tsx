import { useState, useEffect, useRef, useCallback } from "react";
import type { ReactNode, CSSProperties, ChangeEvent } from "react";
import { translations, detectLanguage, type Language } from "../translations";
import { LanguageToggle } from "./LanguageToggle";

// Load Google Apps Script URL from environment variable
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

// Inject Google Fonts into <head> — works in Vite without any config
function useFonts() {
  useEffect(() => {
    if (document.getElementById("qyz-fonts")) return;
    const link = document.createElement("link");
    link.id = "qyz-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Lato:wght@300;400&family=EB+Garamond:ital,wght@0,400;1,400&display=swap";
    document.head.appendChild(link);
  }, []);
}

// Inject keyframe animations into <head> — Vite-safe
function useAnimations() {
  useEffect(() => {
    if (document.getElementById("qyz-anim")) return;
    const style = document.createElement("style");
    style.id = "qyz-anim";
    style.textContent = `
      @keyframes qyzFloat {
        0%,100% { transform: translateY(0) rotate(0deg); }
        50%      { transform: translateY(-16px) rotate(10deg); }
      }
      @keyframes qyzShimmer {
        0%   { background-position: -200% center; }
        100% { background-position:  200% center; }
      }
      @keyframes qyzFadeUp {
        from { opacity:0; transform:translateY(24px); }
        to   { opacity:1; transform:translateY(0);    }
      }
      @keyframes qyzScaleIn {
        from { opacity:0; transform:scale(0.95) translateY(18px); }
        to   { opacity:1; transform:scale(1)    translateY(0);    }
      }
      @keyframes qyzScrollPulse {
        0%,100% { transform:translateY(0);  opacity:0.5; }
        50%      { transform:translateY(6px); opacity:0.2; }
      }
      .qyz-input:focus {
        border-color: rgba(107,125,90,0.65) !important;
        background:   rgba(255,255,255,0.82) !important;
        box-shadow:   0 0 0 3px rgba(107,125,90,0.1) !important;
        outline: none !important;
      }
      .qyz-input::placeholder { color: rgba(107,125,90,0.38); }
      .qyz-btn:hover:not(:disabled) {
        background: linear-gradient(135deg,#4a5e3a,#5a6e48) !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 32px rgba(90,110,72,0.38) !important;
      }
      .qyz-btn:active:not(:disabled) { transform: translateY(0) !important; }
      .qyz-btn:disabled { opacity:0.42 !important; cursor:not-allowed !important; }
      .qyz-det:hover {
        background: rgba(255,255,255,0.58) !important;
        border-color: rgba(107,125,90,0.3) !important;
      }
    `;
    document.head.appendChild(style);
  }, []);
}

// Scroll-triggered fade-in
function useInView(threshold = 0.12): [(node: HTMLDivElement | null) => void, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const setRef = useCallback((node: HTMLDivElement | null) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [setRef, visible];
}

function FadeUp({ children, delay = 0, style: extraStyle = {} }: { children: ReactNode; delay?: number; style?: CSSProperties }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  green: "#4a5e3a",
  greenMid: "#6b7d5a",
  greenLight: "rgba(107,125,90,0.55)",
  greenFaint: "rgba(107,125,90,0.22)",
  cream: "#f4f0e8",
};

const F = {
  display: "'Cormorant Garamond', Georgia, serif",
  body: "'Lato', 'Helvetica Neue', Arial, sans-serif",
  prose: "'EB Garamond', Georgia, serif",
};

const card = {
  background: "rgba(255,255,255,0.48)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(107,125,90,0.2)",
  boxShadow:
    "0 6px 48px rgba(107,125,90,0.08), inset 0 1px 0 rgba(255,255,255,0.55)",
};

// ── Small shared pieces ───────────────────────────────────────────────────────
function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontFamily: F.body,
        fontSize: 9,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: C.greenLight,
        marginBottom: 5,
      }}
    >
      {children}
    </div>
  );
}

function Divider({ char = "✿", my = 18 }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        margin: `${my}px 0`,
      }}
    >
      <div
        style={{
          flex: 1,
          height: 1,
          background:
            "linear-gradient(90deg,transparent,rgba(107,125,90,0.28),transparent)",
        }}
      />
      <span style={{ color: "rgba(107,125,90,0.4)", fontSize: 11 }}>
        {char}
      </span>
      <div
        style={{
          flex: 1,
          height: 1,
          background:
            "linear-gradient(90deg,rgba(107,125,90,0.28),transparent)",
        }}
      />
    </div>
  );
}

// ── SVG Botanicals ────────────────────────────────────────────────────────────
function BotanicalArch() {
  return (
    <svg
      viewBox="0 0 400 100"
      style={{ width: "100%", display: "block", marginBottom: -8 }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.52" stroke="#6B7D5A" strokeWidth="0.85">
        <path d="M55,100 Q50,78 40,60" strokeLinecap="round" />
        <path d="M40,60 Q26,45 12,36" />
        <path d="M40,60 Q44,42 42,22" />
        <path d="M40,60 Q24,55 10,64" />
        <ellipse
          cx="12"
          cy="35"
          rx="7"
          ry="3.5"
          transform="rotate(-20 12 35)"
          fill="#8B9D77"
          opacity="0.5"
        />
        <ellipse
          cx="42"
          cy="21"
          rx="5"
          ry="2.8"
          transform="rotate(10 42 21)"
          fill="#8B9D77"
          opacity="0.5"
        />
        <ellipse
          cx="9"
          cy="64"
          rx="6"
          ry="3"
          transform="rotate(-35 9 64)"
          fill="#8B9D77"
          opacity="0.5"
        />
        <circle cx="13" cy="34" r="2.2" fill="#C8B89A" opacity="0.7" />
        <circle cx="43" cy="20" r="1.8" fill="#C8B89A" opacity="0.7" />
        <path d="M68,100 Q66,82 70,66 Q76,48 65,34" />
        <ellipse
          cx="65"
          cy="33"
          rx="5"
          ry="2.8"
          transform="rotate(15 65 33)"
          fill="#8B9D77"
          opacity="0.5"
        />
        <path d="M80,100 Q84,82 77,62" />
        <ellipse
          cx="75"
          cy="60"
          rx="5"
          ry="2.8"
          transform="rotate(-22 75 60)"
          fill="#8B9D77"
          opacity="0.5"
        />
        <path d="M44,100 Q42,80 44,62 Q46,48 40,36" strokeLinecap="round" />
        <circle
          cx="40"
          cy="35"
          r="2.8"
          fill="none"
          stroke="#6B7D5A"
          strokeWidth="0.7"
        />
        {/* Right mirror */}
        <path d="M345,100 Q350,78 360,60" strokeLinecap="round" />
        <path d="M360,60 Q374,45 388,36" />
        <path d="M360,60 Q356,42 358,22" />
        <path d="M360,60 Q376,55 390,64" />
        <ellipse
          cx="388"
          cy="35"
          rx="7"
          ry="3.5"
          transform="rotate(20 388 35)"
          fill="#8B9D77"
          opacity="0.5"
        />
        <ellipse
          cx="358"
          cy="21"
          rx="5"
          ry="2.8"
          transform="rotate(-10 358 21)"
          fill="#8B9D77"
          opacity="0.5"
        />
        <ellipse
          cx="391"
          cy="64"
          rx="6"
          ry="3"
          transform="rotate(35 391 64)"
          fill="#8B9D77"
          opacity="0.5"
        />
        <circle cx="387" cy="34" r="2.2" fill="#C8B89A" opacity="0.7" />
        <circle cx="357" cy="20" r="1.8" fill="#C8B89A" opacity="0.7" />
        <path d="M332,100 Q334,82 330,66 Q324,48 335,34" />
        <ellipse
          cx="335"
          cy="33"
          rx="5"
          ry="2.8"
          transform="rotate(-15 335 33)"
          fill="#8B9D77"
          opacity="0.5"
        />
        <path d="M320,100 Q316,82 323,62" />
        <ellipse
          cx="325"
          cy="60"
          rx="5"
          ry="2.8"
          transform="rotate(22 325 60)"
          fill="#8B9D77"
          opacity="0.5"
        />
        <path
          d="M356,100 Q358,80 356,62 Q354,48 360,36"
          strokeLinecap="round"
        />
        <circle
          cx="360"
          cy="35"
          r="2.8"
          fill="none"
          stroke="#6B7D5A"
          strokeWidth="0.7"
        />
        {/* Arch + bow */}
        <path d="M148,14 Q200,3 252,14" strokeWidth="1" />
        <path d="M158,17 Q200,7 242,17" strokeWidth="0.6" opacity="0.5" />
        <path
          d="M193,11 Q187,6 182,8 Q185,13 193,11Z"
          fill="#8B9D77"
          opacity="0.65"
        />
        <path
          d="M207,11 Q213,6 218,8 Q215,13 207,11Z"
          fill="#8B9D77"
          opacity="0.65"
        />
        <circle cx="200" cy="11" r="2" fill="#8B9D77" opacity="0.85" />
        <path d="M148,14 Q122,32 118,60 Q115,80 124,100" />
        <path d="M252,14 Q278,32 282,60 Q285,80 276,100" />
        <circle cx="122" cy="48" r="2.5" fill="none" stroke="#6B7D5A" />
        <circle cx="278" cy="48" r="2.5" fill="none" stroke="#6B7D5A" />
        <circle cx="126" cy="70" r="2" fill="none" stroke="#6B7D5A" />
        <circle cx="274" cy="70" r="2" fill="none" stroke="#6B7D5A" />
      </g>
    </svg>
  );
}

function BotanicalMeadow() {
  return (
    <svg
      viewBox="0 0 400 55"
      style={{ width: "100%", display: "block", marginTop: -8 }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.38" stroke="#6B7D5A" strokeWidth="0.85">
        <path d="M0,55 Q28,32 58,42 Q88,52 118,34 Q148,16 190,30" />
        <path d="M400,55 Q372,32 342,42 Q312,52 282,34 Q252,16 210,30" />
        <circle cx="118" cy="32" r="3" fill="none" stroke="#6B7D5A" />
        <circle cx="282" cy="32" r="3" fill="none" stroke="#6B7D5A" />
        <circle cx="58" cy="40" r="2" fill="#C8B89A" opacity="0.55" />
        <circle cx="342" cy="40" r="2" fill="#C8B89A" opacity="0.55" />
        <circle cx="190" cy="28" r="3.5" fill="#C8B89A" opacity="0.55" />
        <ellipse
          cx="155"
          cy="34"
          rx="5"
          ry="2.8"
          transform="rotate(-15 155 34)"
          fill="#8B9D77"
          opacity="0.45"
        />
        <ellipse
          cx="245"
          cy="34"
          rx="5"
          ry="2.8"
          transform="rotate(15 245 34)"
          fill="#8B9D77"
          opacity="0.45"
        />
      </g>
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function QyzUzatu() {
  useFonts();
  useAnimations();

  // Language state with auto-detection and localStorage persistence
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('wedding-language');
    return (saved as Language) || detectLanguage();
  });

  const toggleLanguage = () => {
    const newLang: Language = language === 'en' ? 'kk' : 'en';
    setLanguage(newLang);
    localStorage.setItem('wedding-language', newLang);
  };

  const t = translations[language];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    guests: t.guestOptions[0],
    note: "",
  });
  const [status, setStatus] = useState("idle");

  // Update guest options when language changes
  useEffect(() => {
    setForm(prev => ({
      ...prev,
      guests: t.guestOptions[0]
    }));
  }, [language]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    setStatus("loading");
    try {
      const params = new URLSearchParams({
        timestamp: new Date().toISOString(),
        name: form.name,
        phone: form.phone,
        guests: form.guests,
        note: form.note,
      });

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      setStatus("success");
      setForm({ name: "", phone: "", guests: t.guestOptions[0], note: "" });
    } catch (_) {
      setStatus("success"); // no-cors always "fails"
    }
  };
    

  const inputBase: CSSProperties = {
    width: "100%",
    padding: "11px 15px",
    background: "rgba(255,255,255,0.58)",
    border: "1px solid rgba(107,125,90,0.28)",
    borderRadius: 3,
    fontFamily: F.body,
    fontSize: 13,
    color: C.green,
    marginBottom: 14,
    boxSizing: "border-box",
    transition: "border-color 0.25s, background 0.25s, box-shadow 0.25s",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(155deg,#f4f0e8 0%,#eef0e6 45%,#f0ede4 100%)",
        fontFamily: F.display,
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Language Toggle */}
      <LanguageToggle
        currentLanguage={language}
        onToggle={toggleLanguage}
        colors={C}
        fonts={F}
      />

      {/* Paper texture */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "300px 300px",
        }}
      />

      {/* Floating petals */}
      {[
        { top: "8%", left: "4%", dur: "9s", del: "0s" },
        { top: "22%", right: "6%", dur: "11s", del: "2.5s" },
        { top: "55%", left: "2%", dur: "8s", del: "1s" },
        { top: "70%", right: "4%", dur: "12s", del: "3.5s" },
      ].map((p, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            fontSize: 18,
            color: "rgba(107,125,90,0.12)",
            animation: `qyzFloat ${p.dur} ease-in-out infinite`,
            animationDelay: p.del,
            pointerEvents: "none",
            zIndex: 0,
            userSelect: "none",
            top: p.top,
            left: p.left,
            right: p.right,
          }}
        >
          ✿
        </div>
      ))}

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 16px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            fontSize: 22,
            color: "rgba(107,125,90,0.18)",
            userSelect: "none",
          }}
        >
          ✦
        </div>
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            fontSize: 22,
            color: "rgba(107,125,90,0.18)",
            userSelect: "none",
          }}
        >
          ✦
        </div>

        <div
          style={{
            maxWidth: 580,
            width: "100%",
            animation: "qyzScaleIn 1.3s ease 0.1s both",
          }}
        >
          <BotanicalArch />

          <div
            style={{
              ...card,
              padding: "clamp(28px,6vw,56px) clamp(20px,5vw,48px)",
            }}
          >
            <div
              style={{
                fontFamily: F.body,
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: C.greenLight,
                marginBottom: 10,
              }}
            >
              {t.warmlyInvited}
            </div>

            <p
              style={{
                fontFamily: F.display,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(13px,3vw,16px)",
                color: "#7a8a6a",
                margin: "0 0 8px",
              }}
            >
              {t.kazakhCelebration}
            </p>

            <h1
              style={{
                fontFamily: F.display,
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(46px,13vw,82px)",
                lineHeight: 1,
                letterSpacing: "-0.01em",
                margin: "4px 0",
                background:
                  "linear-gradient(135deg,#4a5e3a 0%,#6b7d5a 40%,#8a9d70 60%,#4a5e3a 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "qyzShimmer 7s linear infinite",
              }}
            >
              {t.qyzUzatu}
            </h1>

            <Divider my={18} />

            <div
              style={{
                fontFamily: F.body,
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: C.greenLight,
                marginBottom: 10,
              }}
            >
              {t.inHonourOf}
            </div>

            <h2
              style={{
                fontFamily: F.display,
                fontWeight: 400,
                fontSize: "clamp(32px,8vw,56px)",
                lineHeight: 1.1,
                color: C.green,
                margin: "8px 0",
              }}
            >
              {t.brideName}
            </h2>

            <Divider char="❧" my={18} />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))",
                gap: 16,
                marginTop: 4,
              }}
            >
              {[
                {
                  label: t.dateLabel,
                  value: t.dateValue,
                  sub: t.dateSub,
                  muted: false,
                },
                {
                  label: t.venueLabel,
                  value: t.venueValue,
                  sub: t.venueSub,
                  muted: false,
                },
              ].map((d) => (
                <div key={d.label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: F.body,
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: C.greenLight,
                      marginBottom: 6,
                    }}
                  >
                    {d.label}
                  </div>
                  <p
                    style={{
                      fontFamily: F.display,
                      fontStyle: "italic",
                      fontSize: d.muted ? 15 : 19,
                      color: d.muted ? "rgba(107,125,90,0.5)" : C.green,
                      margin: "0 0 4px",
                      fontWeight: 400,
                    }}
                  >
                    {d.value}
                  </p>
                  <p
                    style={{
                      fontFamily: F.body,
                      fontSize: 10,
                      color: "rgba(107,125,90,0.45)",
                    }}
                  >
                    {d.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <BotanicalMeadow />
        </div>

        {/* Scroll cue */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            animation: "qyzScrollPulse 2.4s ease-in-out infinite",
          }}
        >
          <p
            style={{
              fontFamily: F.body,
              fontSize: 8,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(107,125,90,0.38)",
            }}
          >
            Scroll
          </p>
          <div
            style={{
              width: 1,
              height: 28,
              background:
                "linear-gradient(to bottom,rgba(107,125,90,0.42),transparent)",
            }}
          />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "80px 16px",
          maxWidth: 680,
          margin: "0 auto",
        }}
      >
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Divider char="✦" my={0} />
            <h2
              style={{
                fontFamily: F.display,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(24px,6vw,38px)",
                color: C.green,
                margin: "24px 0 0",
              }}
            >
              {t.aboutTitle}
            </h2>
          </div>
        </FadeUp>
        <FadeUp delay={0.18}>
          <div
            style={{
              ...card,
              padding: "clamp(28px,6vw,48px)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: F.prose,
                fontStyle: "italic",
                fontSize: "clamp(15px,3vw,18px)",
                color: "#5a6a4a",
                lineHeight: 1.9,
                marginBottom: 20,
              }}
            >
              {t.aboutDescription}
            </p>
            <Divider char="❦" my={16} />
            <p
              style={{
                fontFamily: F.body,
                fontSize: 13,
                color: "rgba(107,125,90,0.65)",
                lineHeight: 1.85,
                whiteSpace: "pre-line",
              }}
            >
              {t.aboutClosing}
            </p>
          </div>
        </FadeUp>
      </section>

      {/* ── DETAIL CARDS ── */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "0 16px 80px",
          maxWidth: 780,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(175px,1fr))",
            gap: 16,
          }}
        >
          {[
            { icon: "✦", label: t.dateLabel, value: t.dateValue, sub: t.dateSub },
            {
              icon: "◈",
              label: t.timeLabel,
              value: t.timeValue,
              sub: t.timeSub,
            },
            {
              icon: "✿",
              label: t.venueLabel,
              value: t.venueValue,
              sub: t.venueSub,
            },
          ].map((item, i) => (
            <FadeUp key={i} delay={i * 0.12}>
              <div
                className="qyz-det"
                style={{
                  ...card,
                  padding: "clamp(20px,4vw,32px) 20px",
                  textAlign: "center",
                  transition: "background 0.3s, border-color 0.3s",
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    color: "rgba(107,125,90,0.42)",
                    marginBottom: 10,
                  }}
                >
                  {item.icon}
                </div>
                <div
                  style={{
                    fontFamily: F.body,
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: C.greenLight,
                    marginBottom: 8,
                  }}
                >
                  {item.label}
                </div>
                <p
                  style={{
                    fontFamily: F.display,
                    fontStyle: "italic",
                    fontSize: "clamp(15px,4vw,20px)",
                    color: C.green,
                    fontWeight: 400,
                    margin: "0 0 4px",
                  }}
                >
                  {item.value}
                </p>
                <p
                  style={{
                    fontFamily: F.body,
                    fontSize: 10,
                    color: "rgba(107,125,90,0.45)",
                  }}
                >
                  {item.sub}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── RSVP ── */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "0 16px 100px",
          maxWidth: 560,
          margin: "0 auto",
        }}
      >
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Divider char="✦" my={0} />
            <h2
              style={{
                fontFamily: F.display,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(26px,7vw,42px)",
                color: C.green,
                margin: "24px 0 6px",
              }}
            >
              {t.rsvpTitle}
            </h2>
            <p
              style={{
                fontFamily: F.body,
                fontSize: 12,
                color: "rgba(107,125,90,0.58)",
                letterSpacing: "0.1em",
              }}
            >
              {t.rsvpSubtitle}
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.18}>
          <div style={{ ...card, padding: "clamp(24px,6vw,48px)" }}>
            {status === "success" ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "24px 0",
                  animation: "qyzFadeUp 0.7s ease both",
                }}
              >
                <div
                  style={{
                    fontSize: 34,
                    color: "rgba(107,125,90,0.48)",
                    marginBottom: 14,
                  }}
                >
                  ✦
                </div>
                <h3
                  style={{
                    fontFamily: F.display,
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 28,
                    color: C.green,
                    marginBottom: 10,
                  }}
                >
                  {t.thankYou}
                </h3>
                <p
                  style={{
                    fontFamily: F.body,
                    fontSize: 13,
                    color: "rgba(107,125,90,0.65)",
                    lineHeight: 1.85,
                    whiteSpace: "pre-line",
                  }}
                >
                  {t.successMessage}
                </p>
              </div>
            ) : (
              <div>
                <FieldLabel>{t.fullNameLabel}</FieldLabel>
                <input
                  className="qyz-input"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t.fullNamePlaceholder}
                  style={inputBase}
                />

                <FieldLabel>{t.phoneLabel}</FieldLabel>
                <input
                  className="qyz-input"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={t.phonePlaceholder}
                  style={inputBase}
                />

                <FieldLabel>{t.guestsLabel}</FieldLabel>
                <select
                  className="qyz-input"
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  style={{
                    ...inputBase,
                    cursor: "pointer",
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7D5A' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 14px center",
                    paddingRight: 36,
                  }}
                >
                  {t.guestOptions.map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>

                <FieldLabel>{t.messageLabel}</FieldLabel>
                <textarea
                  className="qyz-input"
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  rows={3}
                  placeholder={t.messagePlaceholder}
                  style={{ ...inputBase, resize: "none" }}
                />

                <div style={{ textAlign: "center", marginTop: 8 }}>
                  <button
                    className="qyz-btn"
                    onClick={handleSubmit}
                    disabled={
                      status === "loading" ||
                      !form.name.trim() ||
                      !form.phone.trim()
                    }
                    style={{
                      background: "linear-gradient(135deg,#5a6e48,#6b7d5a)",
                      color: C.cream,
                      border: "none",
                      borderRadius: 3,
                      padding: "13px 48px",
                      fontFamily: F.body,
                      fontSize: 11,
                      letterSpacing: "2.5px",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      boxShadow: "0 4px 22px rgba(90,110,72,0.28)",
                      transition: "all 0.32s ease",
                    }}
                  >
                    {status === "loading" ? t.submitting : t.submitButton}
                  </button>
                </div>

                <p
                  style={{
                    textAlign: "center",
                    fontFamily: F.body,
                    fontSize: 10,
                    color: "rgba(107,125,90,0.36)",
                    marginTop: 12,
                  }}
                >
                  {t.requiredFields}
                </p>
              </div>
            )}
          </div>
        </FadeUp>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "40px 16px 60px",
          borderTop: "1px solid rgba(107,125,90,0.1)",
        }}
      >
        <FadeUp>
          <p
            style={{
              fontFamily: F.display,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(18px,4vw,24px)",
              color: "rgba(107,125,90,0.5)",
              marginBottom: 6,
            }}
          >
            {t.brideName}
          </p>
          <p
            style={{
              fontFamily: F.body,
              fontSize: 9,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "rgba(107,125,90,0.33)",
            }}
          >
            {t.footerDate}
          </p>
          <div
            style={{
              fontSize: 14,
              color: "rgba(107,125,90,0.18)",
              marginTop: 20,
            }}
          >
            ✦
          </div>
        </FadeUp>
      </footer>
    </div>
  );
}
