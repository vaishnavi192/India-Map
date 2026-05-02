export interface StateInfo {
  name: string;
  native: string;
  nickname: string;
  emoji: string;
  tags: string[];
  temp: number;
  isNew?: boolean;
}

export const STATES: StateInfo[] = [
  {
    name: "Maharashtra",
    native: "महाराष्ट्र",
    nickname: "Gateway of India",
    emoji: "🏛️",
    tags: ["🚖 Auto + IT Hub", "🎓 Oxford of the East", "💧 Khadakwasla Reservoir"],
    temp: 33,
    isNew: true,
  },
  {
    name: "Uttar Pradesh",
    native: "उत्तर प्रदेश",
    nickname: "City of Nawabs",
    emoji: "🕌",
    tags: ["🏛️ City of Nawabs", "🧵 Chikankari Heritage", "🍢 Kebab Capital"],
    temp: 41,
    isNew: true,
  },
  {
    name: "Telangana",
    native: "తెలంగాణ",
    nickname: "City of Pearls",
    emoji: "🕌",
    tags: ["💎 City of Pearls", "🧬 Genome Valley", "🪷 Nizam Heritage"],
    temp: 37,
    isNew: true,
  },
  {
    name: "Karnataka",
    native: "ಕರ್ನಾಟಕ",
    nickname: "Silicon Valley of India",
    emoji: "💻",
    tags: ["💻 Startup Capital", "🌳 Garden City", "🚀 ISRO & HAL HQ"],
    temp: 34,
  },
  {
    name: "Tamil Nadu",
    native: "தமிழ்நாடு",
    nickname: "Gateway to South India",
    emoji: "🛕",
    tags: ["🛕 Temple State", "🎬 Kollywood", "🌊 Marina Beach"],
    temp: 35,
  },
  {
    name: "Madhya Pradesh",
    native: "मध्य प्रदेश",
    nickname: "Heart of India",
    emoji: "🐅",
    tags: ["🐅 Tiger State", "🏰 Khajuraho", "🌲 Forest Cover"],
    temp: 38,
  },
  {
    name: "Andhra Pradesh",
    native: "ఆంధ్ర ప్రదేశ్",
    nickname: "Rice Bowl of India",
    emoji: "🌾",
    tags: ["🌾 Rice Bowl", "🛕 Tirupati", "🌶️ Spicy Cuisine"],
    temp: 36,
  },
  {
    name: "Kerala",
    native: "കേരളം",
    nickname: "God's Own Country",
    emoji: "🌴",
    tags: ["🌴 Backwaters", "🐘 Wildlife", "📚 Highest Literacy"],
    temp: 31,
  },
  {
    name: "Odisha",
    native: "ଓଡ଼ିଶା",
    nickname: "Soul of India",
    emoji: "🛕",
    tags: ["🛕 Jagannath Temple", "🏖️ Puri Beach", "🎨 Pattachitra"],
    temp: 34,
  },
  {
    name: "Gujarat",
    native: "ગુજરાત",
    nickname: "Jewel of the West",
    emoji: "🦁",
    tags: ["🦁 Gir Lions", "🧂 White Rann", "💎 Diamond Hub"],
    temp: 36,
  },
];
