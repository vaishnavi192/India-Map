export type AttractionCategory = "historical" | "natural" | "cultural";

export interface Attraction {
  name: string;
  category: AttractionCategory;
  /** Geographic coords [lng, lat] */
  coords: [number, number];
  detail: string;
}

export interface StateAttractions {
  /** [lng, lat] center for projection */
  center: [number, number];
  /** Avg temperature (C) */
  avgTemp: number;
  /** Brand color HSL token used for economy gradient base */
  baseColor: string; // e.g. "351 83% 61%"
  /** Hotspots to drop pins on */
  attractions: Attraction[];
  /** Heatmap points: [lng, lat, tempC] */
  heat: [number, number, number][];
  /** Economy points: [lng, lat, 0..1 strength] */
  economy: [number, number, number][];
}

export const STATE_ATTRACTIONS: Record<string, StateAttractions> = {
  Maharashtra: {
    center: [76.5, 19.5],
    avgTemp: 33,
    baseColor: "351 83% 61%",
    attractions: [
      { name: "Gateway of India", category: "historical", coords: [72.8347, 18.922], detail: "Iconic Mumbai monument" },
      { name: "Ajanta Caves", category: "cultural", coords: [75.7, 20.55], detail: "UNESCO rock-cut Buddhist art" },
      { name: "Ellora Caves", category: "historical", coords: [75.18, 20.02], detail: "1500-year-old temple complex" },
      { name: "Lonavala Hills", category: "natural", coords: [73.405, 18.754], detail: "Misty Sahyadri retreat" },
      { name: "Tadoba Reserve", category: "natural", coords: [79.36, 20.21], detail: "Tigers in deep jungle" },
      { name: "Shaniwar Wada", category: "historical", coords: [73.855, 18.519], detail: "Peshwa-era fort, Pune" },
    ],
    heat: [
      [72.83, 18.92, 32], [73.85, 18.52, 31], [75.7, 20.55, 36],
      [79.36, 20.21, 38], [77.0, 19.0, 35], [74.5, 17.5, 30],
    ],
    economy: [
      [72.83, 18.92, 1.0], [73.85, 18.52, 0.85], [73.78, 19.99, 0.55],
      [75.34, 19.88, 0.45], [79.08, 21.15, 0.6], [77.0, 19.0, 0.3],
      [74.5, 17.5, 0.35], [76.0, 20.5, 0.25],
    ],
  },
  "Uttar Pradesh": {
    center: [80.9, 27.0],
    avgTemp: 41,
    baseColor: "28 95% 60%",
    attractions: [
      { name: "Taj Mahal", category: "historical", coords: [78.0421, 27.1751], detail: "Mughal marble masterpiece" },
      { name: "Varanasi Ghats", category: "cultural", coords: [83.0, 25.32], detail: "Sacred Ganges river front" },
      { name: "Bara Imambara", category: "historical", coords: [80.91, 26.87], detail: "Lucknow's labyrinth" },
      { name: "Dudhwa NP", category: "natural", coords: [80.6, 28.5], detail: "Tigers & swamp deer" },
      { name: "Fatehpur Sikri", category: "historical", coords: [77.66, 27.09], detail: "Akbar's red sandstone city" },
      { name: "Ayodhya", category: "cultural", coords: [82.2, 26.79], detail: "Ancient pilgrimage city" },
    ],
    heat: [
      [78.04, 27.17, 42], [80.91, 26.87, 40], [83.0, 25.32, 41],
      [80.6, 28.5, 35], [82.2, 26.79, 39], [79.5, 28.0, 36],
    ],
    economy: [
      [80.91, 26.87, 0.95], [78.04, 27.17, 0.85], [82.97, 25.32, 0.7],
      [81.85, 25.45, 0.6], [77.5, 28.5, 0.65], [83.36, 26.76, 0.4],
      [80.0, 27.5, 0.3],
    ],
  },
  Karnataka: {
    center: [76.0, 14.5],
    avgTemp: 34,
    baseColor: "230 75% 62%",
    attractions: [
      { name: "Hampi Ruins", category: "historical", coords: [76.475, 15.335], detail: "Vijayanagara empire ruins" },
      { name: "Mysore Palace", category: "historical", coords: [76.654, 12.305], detail: "Royal Wodeyar residence" },
      { name: "Coorg Hills", category: "natural", coords: [75.74, 12.42], detail: "Coffee country mist" },
      { name: "Bangalore Palace", category: "cultural", coords: [77.59, 12.998], detail: "Tudor-style royal home" },
      { name: "Gokarna Beach", category: "natural", coords: [74.32, 14.55], detail: "Pristine Konkan coast" },
      { name: "Jog Falls", category: "natural", coords: [74.81, 14.23], detail: "Plunging Sharavathi cascade" },
    ],
    heat: [
      [77.59, 12.99, 30], [76.65, 12.3, 32], [74.32, 14.55, 33],
      [76.47, 15.33, 38], [75.74, 12.42, 26], [74.81, 14.23, 28],
    ],
    economy: [
      [77.59, 12.99, 1.0], [76.65, 12.3, 0.7], [74.85, 12.87, 0.55],
      [75.0, 15.35, 0.4], [77.1, 14.45, 0.3], [76.0, 13.5, 0.45],
    ],
  },
  "Tamil Nadu": {
    center: [78.5, 11.0],
    avgTemp: 35,
    baseColor: "12 75% 55%",
    attractions: [
      { name: "Marina Beach", category: "natural", coords: [80.282, 13.05], detail: "World's longest urban beach" },
      { name: "Meenakshi Temple", category: "cultural", coords: [78.119, 9.919], detail: "Towering Madurai gopurams" },
      { name: "Mahabalipuram", category: "historical", coords: [80.19, 12.616], detail: "Pallava shore temples" },
      { name: "Ooty Hills", category: "natural", coords: [76.69, 11.41], detail: "Nilgiri tea slopes" },
      { name: "Thanjavur Temple", category: "historical", coords: [79.13, 10.78], detail: "Chola Brihadeeswarar" },
      { name: "Rameswaram", category: "cultural", coords: [79.31, 9.288], detail: "Sacred island shrine" },
    ],
    heat: [
      [80.28, 13.05, 36], [78.12, 9.92, 38], [80.19, 12.62, 35],
      [76.69, 11.41, 22], [79.13, 10.78, 36], [79.31, 9.29, 34],
    ],
    economy: [
      [80.28, 13.05, 1.0], [77.0, 11.0, 0.7], [78.12, 9.92, 0.55],
      [79.13, 10.78, 0.45], [76.96, 11.0, 0.6], [78.7, 10.8, 0.3],
    ],
  },
  Kerala: {
    center: [76.5, 10.5],
    avgTemp: 31,
    baseColor: "142 65% 48%",
    attractions: [
      { name: "Alleppey Backwaters", category: "natural", coords: [76.34, 9.49], detail: "Houseboat lagoons" },
      { name: "Munnar Tea Hills", category: "natural", coords: [77.06, 10.09], detail: "Emerald plantations" },
      { name: "Fort Kochi", category: "historical", coords: [76.24, 9.97], detail: "Colonial harbor heritage" },
      { name: "Periyar Wildlife", category: "natural", coords: [77.16, 9.46], detail: "Elephants by the lake" },
      { name: "Padmanabhaswamy", category: "cultural", coords: [76.94, 8.48], detail: "Golden Vishnu temple" },
      { name: "Bekal Fort", category: "historical", coords: [75.03, 12.39], detail: "Seaside basalt fortress" },
    ],
    heat: [
      [76.34, 9.49, 31], [77.06, 10.09, 22], [76.24, 9.97, 30],
      [77.16, 9.46, 26], [76.94, 8.48, 32], [75.03, 12.39, 30],
    ],
    economy: [
      [76.94, 8.48, 0.85], [76.24, 9.97, 1.0], [76.34, 9.49, 0.6],
      [75.78, 11.25, 0.5], [77.06, 10.09, 0.4], [75.03, 12.39, 0.3],
    ],
  },
  Gujarat: {
    center: [71.5, 22.5],
    avgTemp: 36,
    baseColor: "45 95% 55%",
    attractions: [
      { name: "Statue of Unity", category: "historical", coords: [73.72, 21.83], detail: "World's tallest statue" },
      { name: "Rann of Kutch", category: "natural", coords: [70.18, 23.85], detail: "Endless white salt desert" },
      { name: "Gir National Park", category: "natural", coords: [70.97, 21.13], detail: "Asiatic lions roam" },
      { name: "Sabarmati Ashram", category: "cultural", coords: [72.58, 23.06], detail: "Gandhi's home" },
      { name: "Dwarka Temple", category: "cultural", coords: [68.97, 22.24], detail: "Krishna's coastal city" },
      { name: "Somnath Temple", category: "historical", coords: [70.4, 20.89], detail: "Eternal shore shrine" },
    ],
    heat: [
      [72.58, 23.06, 38], [70.18, 23.85, 40], [70.97, 21.13, 35],
      [73.72, 21.83, 36], [68.97, 22.24, 33], [70.4, 20.89, 32],
    ],
    economy: [
      [72.58, 23.06, 1.0], [72.83, 21.17, 0.9], [70.8, 22.3, 0.55],
      [73.72, 21.83, 0.6], [70.05, 22.47, 0.4], [69.6, 22.47, 0.3],
    ],
  },
  Telangana: {
    center: [79.0, 17.8],
    avgTemp: 37,
    baseColor: "270 70% 62%",
    attractions: [
      { name: "Charminar", category: "historical", coords: [78.474, 17.361], detail: "Hyderabad's 4 minarets" },
      { name: "Golconda Fort", category: "historical", coords: [78.401, 17.383], detail: "Diamond-trade citadel" },
      { name: "Ramoji Film City", category: "cultural", coords: [78.679, 17.254], detail: "World's largest studio" },
      { name: "Warangal Fort", category: "historical", coords: [79.61, 18.0], detail: "Kakatiya stone gates" },
      { name: "Nagarjuna Sagar", category: "natural", coords: [79.31, 16.57], detail: "Massive masonry dam" },
      { name: "Bhadrachalam", category: "cultural", coords: [80.89, 17.67], detail: "Rama temple by Godavari" },
    ],
    heat: [
      [78.47, 17.36, 38], [79.61, 18.0, 39], [79.31, 16.57, 37],
      [78.68, 17.25, 36], [80.89, 17.67, 40], [78.0, 18.5, 35],
    ],
    economy: [
      [78.47, 17.36, 1.0], [78.4, 17.38, 0.9], [79.61, 18.0, 0.55],
      [79.31, 16.57, 0.4], [78.5, 18.6, 0.35], [80.0, 17.8, 0.3],
    ],
  },
  "Madhya Pradesh": {
    center: [78.5, 23.5],
    avgTemp: 38,
    baseColor: "173 70% 45%",
    attractions: [
      { name: "Khajuraho Temples", category: "historical", coords: [79.92, 24.85], detail: "Sculpted Chandela art" },
      { name: "Bandhavgarh NP", category: "natural", coords: [80.99, 23.69], detail: "Royal Bengal tigers" },
      { name: "Sanchi Stupa", category: "historical", coords: [77.74, 23.48], detail: "Ashoka's Buddhist mound" },
      { name: "Gwalior Fort", category: "historical", coords: [78.169, 26.23], detail: "Hilltop citadel" },
      { name: "Pachmarhi Hills", category: "natural", coords: [78.43, 22.47], detail: "Satpura's queen" },
      { name: "Ujjain Mahakal", category: "cultural", coords: [75.78, 23.18], detail: "Jyotirlinga shrine" },
    ],
    heat: [
      [77.41, 23.26, 39], [78.17, 26.23, 40], [79.92, 24.85, 38],
      [78.43, 22.47, 28], [75.78, 23.18, 39], [80.99, 23.69, 37],
    ],
    economy: [
      [77.41, 23.26, 0.95], [75.86, 22.72, 0.85], [78.17, 26.23, 0.65],
      [79.43, 21.84, 0.55], [75.78, 23.18, 0.5], [80.99, 23.69, 0.3],
    ],
  },
  "Andhra Pradesh": {
    center: [79.5, 15.5],
    avgTemp: 36,
    baseColor: "199 85% 55%",
    attractions: [
      { name: "Tirupati Temple", category: "cultural", coords: [79.347, 13.628], detail: "Most-visited shrine" },
      { name: "Araku Valley", category: "natural", coords: [82.87, 18.32], detail: "Coffee hills & tribes" },
      { name: "Vizag Beach", category: "natural", coords: [83.31, 17.69], detail: "RK Beach promenade" },
      { name: "Lepakshi Temple", category: "historical", coords: [77.6, 13.81], detail: "Hanging-pillar wonder" },
      { name: "Borra Caves", category: "natural", coords: [83.04, 18.27], detail: "Million-year stalactites" },
      { name: "Amaravati", category: "historical", coords: [80.36, 16.57], detail: "Buddhist stupa site" },
    ],
    heat: [
      [80.65, 16.51, 38], [83.31, 17.69, 34], [79.35, 13.63, 35],
      [82.87, 18.32, 28], [77.6, 13.81, 33], [80.36, 16.57, 37],
    ],
    economy: [
      [80.65, 16.51, 1.0], [83.31, 17.69, 0.9], [79.35, 13.63, 0.6],
      [78.48, 14.45, 0.4], [82.87, 18.32, 0.3], [80.36, 16.57, 0.55],
    ],
  },
  Odisha: {
    center: [84.5, 20.5],
    avgTemp: 34,
    baseColor: "320 70% 60%",
    attractions: [
      { name: "Jagannath Temple", category: "cultural", coords: [85.818, 19.805], detail: "Puri's sacred chariot" },
      { name: "Konark Sun Temple", category: "historical", coords: [86.094, 19.887], detail: "Stone chariot of Surya" },
      { name: "Chilika Lake", category: "natural", coords: [85.32, 19.71], detail: "Asia's largest lagoon" },
      { name: "Lingaraja Temple", category: "cultural", coords: [85.834, 20.238], detail: "Bhubaneswar landmark" },
      { name: "Simlipal NP", category: "natural", coords: [86.42, 21.65], detail: "Tigers & waterfalls" },
      { name: "Udayagiri Caves", category: "historical", coords: [85.78, 20.26], detail: "Jain rock-cut shelters" },
    ],
    heat: [
      [85.83, 20.24, 35], [85.82, 19.81, 33], [86.09, 19.89, 33],
      [85.32, 19.71, 32], [86.42, 21.65, 30], [83.97, 21.49, 36],
    ],
    economy: [
      [85.83, 20.24, 1.0], [85.82, 19.81, 0.7], [86.55, 20.27, 0.55],
      [83.97, 21.49, 0.6], [82.69, 18.78, 0.4], [86.42, 21.65, 0.3],
    ],
  },
};
