export type Language = 'en' | 'kk';

export interface Translations {
  // Hero Section
  warmlyInvited: string;
  kazakhCelebration: string;
  qyzUzatu: string;
  inHonourOf: string;
  brideName: string;

  // Date & Venue
  dateLabel: string;
  dateValue: string;
  dateSub: string;
  venueLabel: string;
  venueValue: string;
  venueSub: string;
  timeLabel: string;
  timeValue: string;
  timeSub: string;
  ownerLabel: string;
  ownerValue: string;
  ownerSub: string;

  // About Section
  aboutTitle: string;
  aboutDescription: string;
  aboutClosing: string;

  // RSVP Section
  rsvpTitle: string;
  rsvpSubtitle: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  guestsLabel: string;
  guestOptions: string[];
  messageLabel: string;
  messagePlaceholder: string;
  submitButton: string;
  submitting: string;
  requiredFields: string;

  // Success Message
  thankYou: string;
  successMessage: string;

  // Footer
  footerDate: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Hero Section
    warmlyInvited: "You are warmly invited to",
    kazakhCelebration: "a Kazakh farewell celebration",
    qyzUzatu: "Qyz Uzatu",
    inHonourOf: "in honour of",
    brideName: "Zeinura",

    // Date & Venue
    dateLabel: "Date",
    dateValue: "31 · 07 · 2026",
    dateSub: "Friday Evening",
    venueLabel: "Venue",
    venueValue: "Crystal",
    venueSub: "Saryagash, Kazakhstan",
    timeLabel: "Time",
    timeValue: "Evening · 20:00",
    timeSub: "Celebration begins",

    //
    ownerLabel: "Hosted by",
    ownerValue: "Zeinura's Parents",
    ownerSub: "We invite you to share in our joy",

    // About Section
    aboutTitle: "About Qyz Uzatu",
    aboutDescription:
      '"Qyz Uzatu" is an ancient Kazakh tradition — the joyful sending-off of a daughter as she leaves her family home to begin a new chapter of her life. It is a celebration of family bonds, warmth, and new beginnings.',
    aboutClosing:
      "Your presence means the world to us.\nCome celebrate, come rejoice.",

    // RSVP Section
    rsvpTitle: "Kindly RSVP",
    rsvpSubtitle: "Please confirm your attendance",
    fullNameLabel: "Full Name *",
    fullNamePlaceholder: "Your full name",
    phoneLabel: "Phone Number *",
    phonePlaceholder: "+7 (___) ___ __ __",
    guestsLabel: "Number of Guests",
    guestOptions: ["1 guest", "2 guests", "3 guests", "4 guests", "5+ guests"],
    messageLabel: "Message / Wishes",
    messagePlaceholder: "Share a wish for Zeinura…",
    submitButton: "Confirm Attendance",
    submitting: "Sending…",
    requiredFields: "* required fields",

    // Success Message
    thankYou: "Thank you!",
    successMessage:
      "We have received your RSVP.\nWe look forward to celebrating with you!",

    // Footer
    footerDate: "Qyz Uzatu · 31.07.2026",
  },

  kk: {
    // Hero Section
    warmlyInvited: "Сізді ұзату тойға",
    kazakhCelebration: "ізгі ниетпен шақырамыз",
    qyzUzatu: "Қыз Ұзату",
    inHonourOf: "",
    brideName: "Зейнура",

    // Date & Venue
    dateLabel: "Күні",
    dateValue: "31 · 07 · 2026",
    dateSub: "Жұма күні",
    venueLabel: "Орны",
    venueValue: "Кристал Рестораны",
    venueSub: "Сарыағаш қаласы",
    timeLabel: "Уақыты",
    timeValue: "Кешкі · 20:00",
    timeSub: "Той басталады",

    //
    ownerLabel: "Той иелері",
    ownerValue: "Бауыржан мен Рано",
    ownerSub: "",
    // About Section
    aboutTitle: "Қыз Ұзату туралы",
    aboutDescription:
      "«Қыз ұзату» — ежелгі қазақ дәстүрі, қыздың ата-ана шаңырағынан жаңа өмірге қадам басуына арналған қуанышты әрі тағылымды рәсім. Бұл — отбасылық байланыстар мен жаңа бастамалардың мерекесі.",
    aboutClosing: "Сізді қуанышымызға ортақ болуға шақырамыз.",

    // RSVP Section
    rsvpTitle: "Қатысуды растау",
    rsvpSubtitle: "Қатысуыңызды растауыңызды сұраймыз",
    fullNameLabel: "Толық аты-жөні *",
    fullNamePlaceholder: "Толық аты-жөніңіз",
    phoneLabel: "Телефон нөмірі *",
    phonePlaceholder: "+7 (___) ___ __ __",
    guestsLabel: "Қонақтар саны",
    guestOptions: ["1 қонақ", "2 қонақ", "3 қонақ", "4 қонақ", "5+ қонақ"],
    messageLabel: "Хабарлама / Тілектер",
    messagePlaceholder: "Зейнураға тілегіңізді жазыңыз…",
    submitButton: "Қатысуды растау",
    submitting: "Жіберілуде…",
    requiredFields: "* міндетті өрістер",

    // Success Message
    thankYou: "Рақмет!",
    successMessage: "Біз сіздің қатысуыңызды қабылдадық.\nСізді асыға күтеміз!",

    // Footer
    footerDate: "Қыз Ұзату · 31.07.2026",
  },
};

// Detect browser language with fallback to Kazakh
export function detectLanguage(): Language {
  const browserLang = navigator.language?.toLowerCase() || '';
  const allLangs = navigator.languages || [];

  console.log('🌍 Detecting language...');
  console.log('Primary language:', navigator.language);
  console.log('All languages:', navigator.languages);

  // Check primary browser language for English
  if (browserLang.startsWith('en')) {
    console.log('✅ English detected, showing English version');
    return 'en';
  }

  // Check all browser languages for English
  for (const lang of allLangs) {
    const lowerLang = lang.toLowerCase();
    if (lowerLang.startsWith('en')) {
      console.log('✅ English found in language list, showing English version');
      return 'en';
    }
  }

  // Default to Kazakh for all other cases
  // (Kazakh speakers, Russian speakers, and other languages)
  console.log('✅ Defaulting to Kazakh version');
  return 'kk';
}
