import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2025-09-13T16:00:00");

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = target - new Date();
      if (diff <= 0)
        return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);
  return timeLeft;
}

export default function WeddingInvitation() {
  const [rsvp, setRsvp] = useState("idle"); // idle | attending | declined | submitted
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);
  const countdown = useCountdown(TARGET_DATE);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = () => {
    if (!name.trim()) return;
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .wi-root {
          min-height: 100vh;
          background: #F5EFE6;
          font-family: 'Jost', sans-serif;
          color: #3A2E22;
          overflow-x: hidden;
        }

        /* ─── Fade-in ─── */
        .wi-fade {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 1.2s ease, transform 1.2s ease;
        }
        .wi-fade.in {
          opacity: 1;
          transform: translateY(0);
        }
        .wi-fade.d1 { transition-delay: 0.2s; }
        .wi-fade.d2 { transition-delay: 0.5s; }
        .wi-fade.d3 { transition-delay: 0.8s; }
        .wi-fade.d4 { transition-delay: 1.1s; }
        .wi-fade.d5 { transition-delay: 1.4s; }
        .wi-fade.d6 { transition-delay: 1.7s; }

        /* ─── Hero ─── */
        .wi-hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 24px;
          position: relative;
          text-align: center;
        }

        .wi-eyebrow {
          font-family: 'Jost', sans-serif;
          font-weight: 200;
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #8A7260;
          margin-bottom: 40px;
        }

        .wi-ampersand {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(80px, 14vw, 160px);
          line-height: 0.85;
          color: #C9A882;
          display: block;
          margin: 0 auto 16px;
          letter-spacing: -0.02em;
        }

        .wi-names {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(36px, 7vw, 80px);
          line-height: 1.05;
          letter-spacing: 0.04em;
          color: #3A2E22;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .wi-name-divider {
          font-family: 'Jost', sans-serif;
          font-weight: 200;
          font-size: 11px;
          letter-spacing: 0.28em;
          color: #A08060;
          text-transform: uppercase;
          display: block;
          margin: 12px 0;
        }

        .wi-invite-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(16px, 2.5vw, 20px);
          color: #7A6250;
          margin-top: 48px;
          line-height: 1.8;
        }

        /* ─── Divider ─── */
        .wi-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          justify-content: center;
          padding: 64px 24px;
        }
        .wi-divider-line {
          height: 0.5px;
          width: 80px;
          background: #C9A882;
        }
        .wi-divider-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #C9A882;
        }

        /* ─── Date section ─── */
        .wi-date-section {
          padding: 0 24px 100px;
          text-align: center;
        }

        .wi-section-label {
          font-family: 'Jost', sans-serif;
          font-weight: 200;
          font-size: 10px;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: #A08060;
          margin-bottom: 32px;
        }

        .wi-date-block {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 20px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }

        .wi-date-num {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(64px, 12vw, 130px);
          line-height: 1;
          color: #3A2E22;
          letter-spacing: -0.02em;
        }

        .wi-date-sep {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(28px, 5vw, 54px);
          color: #C9A882;
        }

        .wi-date-meta {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 13px;
          letter-spacing: 0.2em;
          color: #8A7260;
          margin-top: 20px;
          text-transform: uppercase;
        }

        /* ─── Countdown ─── */
        .wi-countdown {
          display: flex;
          justify-content: center;
          gap: clamp(24px, 5vw, 60px);
          margin-top: 56px;
          flex-wrap: wrap;
        }
        .wi-countdown-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .wi-countdown-num {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(38px, 6vw, 64px);
          line-height: 1;
          color: #5C4A35;
          min-width: 2ch;
          text-align: center;
        }
        .wi-countdown-label {
          font-family: 'Jost', sans-serif;
          font-weight: 200;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #A08060;
        }

        /* ─── Venue ─── */
        .wi-venue-section {
          padding: 0 24px 100px;
          text-align: center;
        }
        .wi-venue-name {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(28px, 5vw, 52px);
          color: #3A2E22;
          margin-bottom: 12px;
        }
        .wi-venue-address {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 13px;
          letter-spacing: 0.18em;
          color: #8A7260;
          text-transform: uppercase;
        }
        .wi-venue-time {
          font-family: 'Jost', sans-serif;
          font-weight: 200;
          font-size: 12px;
          letter-spacing: 0.26em;
          color: #A08060;
          text-transform: uppercase;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 0.5px solid #D9C5AF;
          display: inline-block;
        }

        /* ─── RSVP ─── */
        .wi-rsvp-section {
          padding: 0 24px 120px;
          text-align: center;
          max-width: 480px;
          margin: 0 auto;
        }

        .wi-rsvp-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(32px, 6vw, 56px);
          color: #3A2E22;
          margin-bottom: 8px;
        }
        .wi-rsvp-sub {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 17px;
          color: #A08060;
          margin-bottom: 48px;
        }

        .wi-rsvp-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 40px;
        }

        .wi-btn {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 11px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          padding: 14px 32px;
          border: 0.5px solid #C9A882;
          background: transparent;
          color: #7A6250;
          cursor: pointer;
          transition: all 0.3s ease;
          outline: none;
        }
        .wi-btn:hover {
          background: #C9A882;
          color: #F5EFE6;
        }
        .wi-btn.active {
          background: #7A6250;
          border-color: #7A6250;
          color: #F5EFE6;
        }
        .wi-btn.decline {
          border-color: #D9C5AF;
        }
        .wi-btn.decline.active {
          background: #A08060;
          border-color: #A08060;
          color: #F5EFE6;
        }

        .wi-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: formIn 0.5s ease;
        }
        @keyframes formIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .wi-input {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 14px;
          letter-spacing: 0.06em;
          padding: 14px 20px;
          border: 0.5px solid #C9A882;
          background: transparent;
          color: #3A2E22;
          outline: none;
          width: 100%;
          transition: border-color 0.3s;
        }
        .wi-input::placeholder { color: #C9A882; }
        .wi-input:focus { border-color: #8A7260; }

        .wi-select {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 14px;
          letter-spacing: 0.06em;
          padding: 14px 20px;
          border: 0.5px solid #C9A882;
          background: #F5EFE6;
          color: #3A2E22;
          outline: none;
          width: 100%;
          appearance: none;
          cursor: pointer;
        }

        .wi-submit {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          padding: 16px;
          background: #7A6250;
          color: #F5EFE6;
          border: none;
          cursor: pointer;
          transition: background 0.3s;
          margin-top: 8px;
        }
        .wi-submit:hover { background: #5C4A35; }
        .wi-submit:disabled { background: #C9A882; cursor: default; }

        .wi-success {
          padding: 40px;
          animation: formIn 0.6s ease;
        }
        .wi-success-icon {
          font-size: 32px;
          margin-bottom: 16px;
        }
        .wi-success-msg {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 22px;
          color: #5C4A35;
          line-height: 1.6;
        }

        /* ─── Footer ─── */
        .wi-footer {
          text-align: center;
          padding: 40px 24px 60px;
          border-top: 0.5px solid #D9C5AF;
        }
        .wi-footer-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 14px;
          color: #A08060;
          letter-spacing: 0.04em;
        }

        /* ─── Botanical accents ─── */
        .wi-botanical {
          display: block;
          margin: 0 auto;
          opacity: 0.35;
        }

        @media (max-width: 480px) {
          .wi-rsvp-buttons { flex-direction: column; align-items: center; }
          .wi-btn { width: 200px; }
        }
      `}</style>

      <div className="wi-root">
        {/* ── Hero ── */}
        <section className="wi-hero">
          <p className={`wi-eyebrow wi-fade d1 ${visible ? "in" : ""}`}>
            Together with their families
          </p>

          {/* Botanical SVG */}
          <svg
            className={`wi-botanical wi-fade d1 ${visible ? "in" : ""}`}
            width="160"
            height="60"
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

          <div className={`wi-names wi-fade d2 ${visible ? "in" : ""}`}>
            <span>Adil</span>
            <span className="wi-name-divider">and</span>
            <span>Zeinura</span>
          </div>

          <p className={`wi-invite-text wi-fade d3 ${visible ? "in" : ""}`}>
            request the honour of your presence
            <br />
            at their wedding celebration
          </p>
        </section>

        {/* ── Divider ── */}
        <div className={`wi-divider wi-fade d4 ${visible ? "in" : ""}`}>
          <div className="wi-divider-line" />
          <div className="wi-divider-dot" />
          <div className="wi-divider-line" />
        </div>

        {/* ── Date ── */}
        <section
          className={`wi-date-section wi-fade d4 ${visible ? "in" : ""}`}
        >
          <p className="wi-section-label">The Date</p>
          <div className="wi-date-block">
            <span className="wi-date-num">13</span>
            <span className="wi-date-sep">·</span>
            <span className="wi-date-num">09</span>
            <span className="wi-date-sep">·</span>
            <span className="wi-date-num">25</span>
          </div>
          <p className="wi-date-meta">Saturday · September 2025</p>

          <div className="wi-countdown">
            {[
              { val: countdown.days, label: "Days" },
              { val: countdown.hours, label: "Hours" },
              { val: countdown.minutes, label: "Minutes" },
              { val: countdown.seconds, label: "Seconds" },
            ].map(({ val, label }) => (
              <div className="wi-countdown-unit" key={label}>
                <span className="wi-countdown-num">
                  {String(val ?? 0).padStart(2, "0")}
                </span>
                <span className="wi-countdown-label">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Divider ── */}
        <div className={`wi-divider wi-fade d5 ${visible ? "in" : ""}`}>
          <div className="wi-divider-line" />
          <div className="wi-divider-dot" />
          <div className="wi-divider-line" />
        </div>

        {/* ── Venue ── */}
        <section
          className={`wi-venue-section wi-fade d5 ${visible ? "in" : ""}`}
        >
          <p className="wi-section-label">The Venue</p>
          <p className="wi-venue-name">The Grand Almaty Hall</p>
          <p className="wi-venue-address">
            12 Dostyk Avenue, Almaty, Kazakhstan
          </p>
          <span className="wi-venue-time">
            Ceremony at 4:00 PM · Dinner at 7:00 PM
          </span>
        </section>

        {/* ── Divider ── */}
        <div className={`wi-divider wi-fade d6 ${visible ? "in" : ""}`}>
          <div className="wi-divider-line" />
          <div className="wi-divider-dot" />
          <div className="wi-divider-line" />
        </div>

        {/* ── RSVP ── */}
        <section
          className={`wi-rsvp-section wi-fade d6 ${visible ? "in" : ""}`}
        >
          <h2 className="wi-rsvp-title">RSVP</h2>
          <p className="wi-rsvp-sub">Kindly reply by August 1st, 2025</p>

          {!submitted ? (
            <>
              <div className="wi-rsvp-buttons">
                <button
                  className={`wi-btn ${rsvp === "attending" ? "active" : ""}`}
                  onClick={() => setRsvp("attending")}
                >
                  Joyfully accepts
                </button>
                <button
                  className={`wi-btn decline ${rsvp === "declined" ? "active" : ""}`}
                  onClick={() => setRsvp("declined")}
                >
                  Regretfully declines
                </button>
              </div>

              {rsvp !== "idle" && (
                <div className="wi-form">
                  <input
                    className="wi-input"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {rsvp === "attending" && (
                    <select
                      className="wi-select"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                    >
                      <option value="1">1 guest</option>
                      <option value="2">2 guests</option>
                      <option value="3">3 guests</option>
                      <option value="4">4 guests</option>
                    </select>
                  )}
                  <button
                    className="wi-submit"
                    onClick={handleSubmit}
                    disabled={!name.trim()}
                  >
                    {rsvp === "attending"
                      ? "Confirm Attendance"
                      : "Send Regrets"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="wi-success">
              {rsvp === "attending" ? (
                <>
                  <div className="wi-success-icon">✦</div>
                  <p className="wi-success-msg">
                    We are overjoyed, {name}.<br />
                    We cannot wait to celebrate with you.
                  </p>
                </>
              ) : (
                <>
                  <div className="wi-success-icon">✦</div>
                  <p className="wi-success-msg">
                    Thank you, {name}.<br />
                    You will be dearly missed.
                  </p>
                </>
              )}
            </div>
          )}
        </section>

        {/* ── Footer ── */}
        <footer className="wi-footer">
          <p className="wi-footer-text">
            Adil &amp; Zeinura · September 2025 · Almaty
          </p>
        </footer>
      </div>
    </>
  );
}
