export interface Strike {
  id: number;
  city: string;
  country: string;
  lat: number;
  lng: number;
  warhead: string;
  yieldKt: number;
  casualties: number;
  phase: 1 | 2 | 3;
  origin: string;
}

export const STRIKES: Strike[] = [
  // ═══════════════════════════════════════════════════════════════
  // PHASE 1 — First Strike (ids 1-15)
  // USSR strikes NATO capitals/C3I, then US/NATO counter-strikes Warsaw Pact + Beijing
  // ═══════════════════════════════════════════════════════════════
  { id: 1, city: "Washington D.C.", country: "USA", lat: 38.91, lng: -77.04, warhead: "R-36M", yieldKt: 750, casualties: 4_382_000, phase: 1, origin: "USSR" },
  { id: 2, city: "London", country: "UK", lat: 51.51, lng: -0.13, warhead: "SS-19", yieldKt: 500, casualties: 6_800_000, phase: 1, origin: "USSR" },
  { id: 3, city: "West Berlin", country: "FRG", lat: 52.50, lng: 13.37, warhead: "SS-20", yieldKt: 150, casualties: 2_100_000, phase: 1, origin: "USSR" },
  { id: 4, city: "Paris", country: "FRANCE", lat: 48.86, lng: 2.35, warhead: "SS-19", yieldKt: 500, casualties: 5_870_000, phase: 1, origin: "USSR" },
  { id: 5, city: "NORAD Cheyenne Mountain", country: "USA", lat: 38.74, lng: -104.85, warhead: "R-36M", yieldKt: 750, casualties: 45_000, phase: 1, origin: "USSR" },
  { id: 6, city: "Omaha (SAC HQ)", country: "USA", lat: 41.26, lng: -95.94, warhead: "R-36M", yieldKt: 750, casualties: 620_000, phase: 1, origin: "USSR" },
  { id: 7, city: "Brussels (NATO HQ)", country: "BELGIUM", lat: 50.85, lng: 4.35, warhead: "SS-20", yieldKt: 150, casualties: 1_640_000, phase: 1, origin: "USSR" },
  { id: 8, city: "Moscow", country: "USSR", lat: 55.75, lng: 37.62, warhead: "W-87", yieldKt: 300, casualties: 8_214_000, phase: 1, origin: "USA" },
  { id: 9, city: "Leningrad", country: "USSR", lat: 59.93, lng: 30.32, warhead: "W-78", yieldKt: 350, casualties: 4_200_000, phase: 1, origin: "USA" },
  { id: 10, city: "Kiev", country: "USSR", lat: 50.45, lng: 30.52, warhead: "W-87", yieldKt: 300, casualties: 2_300_000, phase: 1, origin: "USA" },
  { id: 11, city: "Minsk", country: "USSR", lat: 53.90, lng: 27.57, warhead: "W-76", yieldKt: 100, casualties: 1_400_000, phase: 1, origin: "USA" },
  { id: 12, city: "Warsaw", country: "POLAND", lat: 52.23, lng: 21.01, warhead: "W-78", yieldKt: 350, casualties: 1_560_000, phase: 1, origin: "USA" },
  { id: 13, city: "East Berlin", country: "GDR", lat: 52.52, lng: 13.41, warhead: "W-62", yieldKt: 170, casualties: 1_120_000, phase: 1, origin: "USA" },
  { id: 14, city: "Prague", country: "CZECHOSLOVAKIA", lat: 50.08, lng: 14.44, warhead: "W-76", yieldKt: 100, casualties: 1_080_000, phase: 1, origin: "USA" },
  { id: 15, city: "Beijing", country: "CHINA", lat: 39.90, lng: 116.40, warhead: "W-87", yieldKt: 300, casualties: 9_200_000, phase: 1, origin: "USA" },

  // ═══════════════════════════════════════════════════════════════
  // PHASE 2 — Major cities + military targets (ids 16-100)
  // ═══════════════════════════════════════════════════════════════

  // --- USSR strikes on NATO ---
  { id: 16, city: "New York", country: "USA", lat: 40.71, lng: -74.01, warhead: "R-36M", yieldKt: 750, casualties: 14_320_000, phase: 2, origin: "USSR" },
  { id: 17, city: "Los Angeles", country: "USA", lat: 34.05, lng: -118.24, warhead: "SS-19", yieldKt: 500, casualties: 8_740_000, phase: 2, origin: "USSR" },
  { id: 18, city: "Chicago", country: "USA", lat: 41.88, lng: -87.63, warhead: "R-36M", yieldKt: 750, casualties: 5_120_000, phase: 2, origin: "USSR" },
  { id: 19, city: "Philadelphia", country: "USA", lat: 39.95, lng: -75.17, warhead: "R-36M", yieldKt: 750, casualties: 3_870_000, phase: 2, origin: "USSR" },
  { id: 20, city: "Detroit", country: "USA", lat: 42.33, lng: -83.05, warhead: "SS-19", yieldKt: 500, casualties: 2_340_000, phase: 2, origin: "USSR" },
  { id: 21, city: "Boston", country: "USA", lat: 42.36, lng: -71.06, warhead: "R-36M", yieldKt: 750, casualties: 2_870_000, phase: 2, origin: "USSR" },
  { id: 22, city: "Houston", country: "USA", lat: 29.76, lng: -95.37, warhead: "SS-19", yieldKt: 500, casualties: 3_200_000, phase: 2, origin: "USSR" },
  { id: 23, city: "Dallas", country: "USA", lat: 32.78, lng: -96.80, warhead: "R-36M", yieldKt: 750, casualties: 2_120_000, phase: 2, origin: "USSR" },
  { id: 24, city: "San Francisco", country: "USA", lat: 37.77, lng: -122.42, warhead: "R-36M", yieldKt: 750, casualties: 2_890_000, phase: 2, origin: "USSR" },
  { id: 25, city: "Ottawa", country: "CANADA", lat: 45.42, lng: -75.70, warhead: "SS-N-18", yieldKt: 200, casualties: 820_000, phase: 2, origin: "USSR" },
  { id: 26, city: "Toronto", country: "CANADA", lat: 43.65, lng: -79.38, warhead: "SS-19", yieldKt: 500, casualties: 3_500_000, phase: 2, origin: "USSR" },
  { id: 27, city: "Bonn", country: "FRG", lat: 50.73, lng: 7.10, warhead: "SS-20", yieldKt: 150, casualties: 1_240_000, phase: 2, origin: "USSR" },
  { id: 28, city: "Hamburg", country: "FRG", lat: 53.55, lng: 9.99, warhead: "SS-19", yieldKt: 500, casualties: 1_540_000, phase: 2, origin: "USSR" },
  { id: 29, city: "Munich", country: "FRG", lat: 48.14, lng: 11.58, warhead: "SS-20", yieldKt: 150, casualties: 1_120_000, phase: 2, origin: "USSR" },
  { id: 30, city: "Rome", country: "ITALY", lat: 41.90, lng: 12.50, warhead: "SS-20", yieldKt: 150, casualties: 2_870_000, phase: 2, origin: "USSR" },
  { id: 31, city: "Amsterdam", country: "NETHERLANDS", lat: 52.37, lng: 4.90, warhead: "SS-20", yieldKt: 150, casualties: 1_870_000, phase: 2, origin: "USSR" },
  { id: 32, city: "Copenhagen", country: "DENMARK", lat: 55.68, lng: 12.57, warhead: "SS-20", yieldKt: 150, casualties: 1_120_000, phase: 2, origin: "USSR" },
  { id: 33, city: "Oslo", country: "NORWAY", lat: 59.91, lng: 10.75, warhead: "SS-20", yieldKt: 150, casualties: 870_000, phase: 2, origin: "USSR" },
  { id: 34, city: "Ankara", country: "TURKEY", lat: 39.93, lng: 32.86, warhead: "SS-19", yieldKt: 500, casualties: 2_640_000, phase: 2, origin: "USSR" },
  { id: 35, city: "Istanbul", country: "TURKEY", lat: 41.01, lng: 28.98, warhead: "R-36M", yieldKt: 750, casualties: 5_230_000, phase: 2, origin: "USSR" },
  { id: 36, city: "Athens", country: "GREECE", lat: 37.98, lng: 23.73, warhead: "SS-20", yieldKt: 150, casualties: 2_340_000, phase: 2, origin: "USSR" },
  { id: 37, city: "Lisbon", country: "PORTUGAL", lat: 38.72, lng: -9.14, warhead: "SS-N-18", yieldKt: 200, casualties: 1_320_000, phase: 2, origin: "USSR" },
  { id: 38, city: "Madrid", country: "SPAIN", lat: 40.42, lng: -3.70, warhead: "SS-19", yieldKt: 500, casualties: 3_200_000, phase: 2, origin: "USSR" },
  { id: 39, city: "Norfolk Naval Base", country: "USA", lat: 36.95, lng: -76.31, warhead: "R-36M", yieldKt: 750, casualties: 870_000, phase: 2, origin: "USSR" },
  { id: 40, city: "Ramstein Air Base", country: "FRG", lat: 49.44, lng: 7.60, warhead: "SS-20", yieldKt: 150, casualties: 180_000, phase: 2, origin: "USSR" },
  { id: 41, city: "RAF Lakenheath", country: "UK", lat: 52.41, lng: 0.56, warhead: "SS-20", yieldKt: 150, casualties: 50_000, phase: 2, origin: "USSR" },
  { id: 42, city: "Incirlik Air Base", country: "TURKEY", lat: 37.00, lng: 35.43, warhead: "SS-20", yieldKt: 150, casualties: 110_000, phase: 2, origin: "USSR" },
  { id: 43, city: "Holy Loch Sub Base", country: "UK", lat: 55.98, lng: -4.93, warhead: "SS-19", yieldKt: 500, casualties: 60_000, phase: 2, origin: "USSR" },
  { id: 44, city: "Milan", country: "ITALY", lat: 45.46, lng: 9.19, warhead: "SS-20", yieldKt: 150, casualties: 2_540_000, phase: 2, origin: "USSR" },
  { id: 45, city: "Manchester", country: "UK", lat: 53.48, lng: -2.24, warhead: "SS-19", yieldKt: 500, casualties: 2_120_000, phase: 2, origin: "USSR" },

  // --- USA/NATO strikes on Warsaw Pact ---
  { id: 46, city: "Novosibirsk", country: "USSR", lat: 55.03, lng: 82.92, warhead: "W-87", yieldKt: 300, casualties: 1_240_000, phase: 2, origin: "USA" },
  { id: 47, city: "Sverdlovsk", country: "USSR", lat: 56.84, lng: 60.60, warhead: "W-78", yieldKt: 350, casualties: 1_120_000, phase: 2, origin: "USA" },
  { id: 48, city: "Gorky", country: "USSR", lat: 56.33, lng: 44.00, warhead: "W-87", yieldKt: 300, casualties: 1_340_000, phase: 2, origin: "USA" },
  { id: 49, city: "Tashkent", country: "USSR", lat: 41.30, lng: 69.28, warhead: "W-62", yieldKt: 170, casualties: 1_870_000, phase: 2, origin: "USA" },
  { id: 50, city: "Baku", country: "USSR", lat: 40.41, lng: 49.87, warhead: "W-78", yieldKt: 350, casualties: 1_540_000, phase: 2, origin: "USA" },
  { id: 51, city: "Kharkov", country: "USSR", lat: 49.99, lng: 36.23, warhead: "W-87", yieldKt: 300, casualties: 1_340_000, phase: 2, origin: "USA" },
  { id: 52, city: "Murmansk", country: "USSR", lat: 68.97, lng: 33.09, warhead: "W-78", yieldKt: 350, casualties: 380_000, phase: 2, origin: "USA" },
  { id: 53, city: "Severodvinsk Shipyard", country: "USSR", lat: 64.57, lng: 39.83, warhead: "W-87", yieldKt: 300, casualties: 200_000, phase: 2, origin: "USA" },
  { id: 54, city: "Petropavlovsk-Kamchatsky", country: "USSR", lat: 53.04, lng: 158.65, warhead: "W-76", yieldKt: 100, casualties: 180_000, phase: 2, origin: "USA" },
  { id: 55, city: "Vladivostok", country: "USSR", lat: 43.12, lng: 131.89, warhead: "W-87", yieldKt: 300, casualties: 540_000, phase: 2, origin: "USA" },
  { id: 56, city: "Dombarovsky", country: "USSR", lat: 51.11, lng: 59.53, warhead: "W-78", yieldKt: 350, casualties: 30_000, phase: 2, origin: "USA" },
  { id: 57, city: "Kartaly", country: "USSR", lat: 53.05, lng: 60.65, warhead: "W-87", yieldKt: 300, casualties: 25_000, phase: 2, origin: "USA" },
  { id: 58, city: "Baikonur Cosmodrome", country: "USSR", lat: 45.96, lng: 63.31, warhead: "W-78", yieldKt: 350, casualties: 40_000, phase: 2, origin: "USA" },
  { id: 59, city: "Plesetsk Cosmodrome", country: "USSR", lat: 62.93, lng: 40.58, warhead: "W-87", yieldKt: 300, casualties: 35_000, phase: 2, origin: "USA" },
  { id: 60, city: "Tbilisi", country: "USSR", lat: 41.69, lng: 44.80, warhead: "W-76", yieldKt: 100, casualties: 1_120_000, phase: 2, origin: "USA" },
  { id: 61, city: "Budapest", country: "HUNGARY", lat: 47.50, lng: 19.04, warhead: "W-62", yieldKt: 170, casualties: 1_870_000, phase: 2, origin: "USA" },
  { id: 62, city: "Bucharest", country: "ROMANIA", lat: 44.43, lng: 26.10, warhead: "W-78", yieldKt: 350, casualties: 1_540_000, phase: 2, origin: "USA" },
  { id: 63, city: "Sofia", country: "BULGARIA", lat: 42.70, lng: 23.32, warhead: "W-76", yieldKt: 100, casualties: 1_020_000, phase: 2, origin: "USA" },
  { id: 64, city: "Leipzig", country: "GDR", lat: 51.34, lng: 12.37, warhead: "W-62", yieldKt: 170, casualties: 540_000, phase: 2, origin: "USA" },
  { id: 65, city: "Dresden", country: "GDR", lat: 51.05, lng: 13.74, warhead: "W-76", yieldKt: 100, casualties: 520_000, phase: 2, origin: "USA" },

  // --- UK strikes on Warsaw Pact ---
  { id: 66, city: "Chelyabinsk", country: "USSR", lat: 55.15, lng: 61.40, warhead: "Polaris-A3", yieldKt: 200, casualties: 870_000, phase: 2, origin: "UK" },
  { id: 67, city: "Kazan", country: "USSR", lat: 55.80, lng: 49.11, warhead: "Polaris-A3", yieldKt: 200, casualties: 980_000, phase: 2, origin: "UK" },
  { id: 68, city: "Samara", country: "USSR", lat: 53.19, lng: 50.10, warhead: "Polaris-A3", yieldKt: 200, casualties: 1_120_000, phase: 2, origin: "UK" },

  // --- France strikes on Warsaw Pact ---
  { id: 69, city: "Omsk", country: "USSR", lat: 54.99, lng: 73.37, warhead: "S3-IRBM", yieldKt: 1000, casualties: 1_050_000, phase: 2, origin: "FRANCE" },
  { id: 70, city: "Perm", country: "USSR", lat: 58.01, lng: 56.25, warhead: "M20-SLBM", yieldKt: 1000, casualties: 900_000, phase: 2, origin: "FRANCE" },
  { id: 71, city: "Volgograd", country: "USSR", lat: 48.71, lng: 44.51, warhead: "S3-IRBM", yieldKt: 1000, casualties: 870_000, phase: 2, origin: "FRANCE" },

  // --- USA strikes on China ---
  { id: 72, city: "Shanghai", country: "CHINA", lat: 31.23, lng: 121.47, warhead: "W-87", yieldKt: 300, casualties: 11_400_000, phase: 2, origin: "USA" },
  { id: 73, city: "Guangzhou", country: "CHINA", lat: 23.13, lng: 113.26, warhead: "W-78", yieldKt: 350, casualties: 5_200_000, phase: 2, origin: "USA" },
  { id: 74, city: "Tianjin", country: "CHINA", lat: 39.13, lng: 117.20, warhead: "W-87", yieldKt: 300, casualties: 5_800_000, phase: 2, origin: "USA" },
  { id: 75, city: "Shenyang", country: "CHINA", lat: 41.80, lng: 123.43, warhead: "W-62", yieldKt: 170, casualties: 4_320_000, phase: 2, origin: "USA" },
  { id: 76, city: "Wuhan", country: "CHINA", lat: 30.59, lng: 114.31, warhead: "W-78", yieldKt: 350, casualties: 4_100_000, phase: 2, origin: "USA" },
  { id: 77, city: "Chongqing", country: "CHINA", lat: 29.56, lng: 106.55, warhead: "W-87", yieldKt: 300, casualties: 3_800_000, phase: 2, origin: "USA" },

  // --- USSR strikes on China ---
  { id: 78, city: "Chengdu", country: "CHINA", lat: 30.57, lng: 104.07, warhead: "SS-19", yieldKt: 500, casualties: 3_500_000, phase: 2, origin: "USSR" },
  { id: 79, city: "Harbin", country: "CHINA", lat: 45.75, lng: 126.65, warhead: "SS-20", yieldKt: 150, casualties: 2_870_000, phase: 2, origin: "USSR" },
  { id: 80, city: "Nanjing", country: "CHINA", lat: 32.06, lng: 118.80, warhead: "SS-19", yieldKt: 500, casualties: 3_540_000, phase: 2, origin: "USSR" },

  // --- China strikes on both sides ---
  { id: 81, city: "Khabarovsk", country: "USSR", lat: 48.48, lng: 135.08, warhead: "DF-5", yieldKt: 4000, casualties: 540_000, phase: 2, origin: "CHINA" },
  { id: 82, city: "Irkutsk", country: "USSR", lat: 52.30, lng: 104.30, warhead: "DF-5", yieldKt: 4000, casualties: 540_000, phase: 2, origin: "CHINA" },
  { id: 83, city: "Novosibirsk (2nd strike)", country: "USSR", lat: 55.05, lng: 82.95, warhead: "DF-5", yieldKt: 4000, casualties: 1_300_000, phase: 2, origin: "CHINA" },

  // --- More USSR on NATO Phase 2 ---
  { id: 84, city: "Birmingham", country: "UK", lat: 52.49, lng: -1.90, warhead: "SS-20", yieldKt: 150, casualties: 1_870_000, phase: 2, origin: "USSR" },
  { id: 85, city: "Glasgow", country: "UK", lat: 55.86, lng: -4.25, warhead: "SS-19", yieldKt: 500, casualties: 1_210_000, phase: 2, origin: "USSR" },
  { id: 86, city: "Naples", country: "ITALY", lat: 40.85, lng: 14.27, warhead: "SS-20", yieldKt: 150, casualties: 1_870_000, phase: 2, origin: "USSR" },
  { id: 87, city: "Barcelona", country: "SPAIN", lat: 41.39, lng: 2.17, warhead: "SS-20", yieldKt: 150, casualties: 1_870_000, phase: 2, origin: "USSR" },
  { id: 88, city: "Frankfurt", country: "FRG", lat: 50.11, lng: 8.68, warhead: "SS-19", yieldKt: 500, casualties: 1_210_000, phase: 2, origin: "USSR" },
  { id: 89, city: "Stuttgart", country: "FRG", lat: 48.78, lng: 9.18, warhead: "SS-20", yieldKt: 150, casualties: 870_000, phase: 2, origin: "USSR" },
  { id: 90, city: "Cologne", country: "FRG", lat: 50.94, lng: 6.96, warhead: "SS-20", yieldKt: 150, casualties: 870_000, phase: 2, origin: "USSR" },
  { id: 91, city: "Marseille", country: "FRANCE", lat: 43.30, lng: 5.37, warhead: "SS-20", yieldKt: 150, casualties: 1_120_000, phase: 2, origin: "USSR" },
  { id: 92, city: "Rotterdam", country: "NETHERLANDS", lat: 51.92, lng: 4.48, warhead: "SS-20", yieldKt: 150, casualties: 870_000, phase: 2, origin: "USSR" },
  { id: 93, city: "Antwerp", country: "BELGIUM", lat: 51.22, lng: 4.40, warhead: "SS-20", yieldKt: 150, casualties: 540_000, phase: 2, origin: "USSR" },

  // --- More USA on Warsaw Pact Phase 2 ---
  { id: 94, city: "Krakow", country: "POLAND", lat: 50.06, lng: 19.94, warhead: "W-76", yieldKt: 100, casualties: 640_000, phase: 2, origin: "USA" },
  { id: 95, city: "Gdansk", country: "POLAND", lat: 54.35, lng: 18.65, warhead: "W-62", yieldKt: 170, casualties: 430_000, phase: 2, origin: "USA" },
  { id: 96, city: "Rostov-on-Don", country: "USSR", lat: 47.24, lng: 39.71, warhead: "W-87", yieldKt: 300, casualties: 870_000, phase: 2, origin: "USA" },
  { id: 97, city: "Odessa", country: "USSR", lat: 46.48, lng: 30.73, warhead: "W-78", yieldKt: 350, casualties: 870_000, phase: 2, origin: "USA" },

  // --- More USSR on NATO military ---
  { id: 98, city: "Minuteman Fields (Montana)", country: "USA", lat: 47.50, lng: -111.18, warhead: "R-36M", yieldKt: 750, casualties: 30_000, phase: 2, origin: "USSR" },
  { id: 99, city: "Kings Bay Sub Base", country: "USA", lat: 30.80, lng: -81.51, warhead: "SS-N-18", yieldKt: 200, casualties: 50_000, phase: 2, origin: "USSR" },
  { id: 100, city: "Ile Longue SSBN Base", country: "FRANCE", lat: 48.33, lng: -4.52, warhead: "SS-19", yieldKt: 500, casualties: 40_000, phase: 2, origin: "USSR" },

  // ═══════════════════════════════════════════════════════════════
  // PHASE 3 — Secondary cities, bases, airfields, naval bases (ids 101-300)
  // ═══════════════════════════════════════════════════════════════

  // --- More USA cities (USSR strikes) ---
  { id: 101, city: "Denver", country: "USA", lat: 39.74, lng: -104.99, warhead: "R-36M", yieldKt: 750, casualties: 1_420_000, phase: 3, origin: "USSR" },
  { id: 102, city: "Seattle", country: "USA", lat: 47.61, lng: -122.33, warhead: "SS-19", yieldKt: 500, casualties: 1_870_000, phase: 3, origin: "USSR" },
  { id: 103, city: "Atlanta", country: "USA", lat: 33.75, lng: -84.39, warhead: "R-36M", yieldKt: 750, casualties: 2_120_000, phase: 3, origin: "USSR" },
  { id: 104, city: "Miami", country: "USA", lat: 25.76, lng: -80.19, warhead: "SS-19", yieldKt: 500, casualties: 1_870_000, phase: 3, origin: "USSR" },
  { id: 105, city: "Minneapolis", country: "USA", lat: 44.98, lng: -93.27, warhead: "SS-N-18", yieldKt: 200, casualties: 1_120_000, phase: 3, origin: "USSR" },
  { id: 106, city: "Phoenix", country: "USA", lat: 33.45, lng: -112.07, warhead: "SS-20", yieldKt: 150, casualties: 870_000, phase: 3, origin: "USSR" },
  { id: 107, city: "Pittsburgh", country: "USA", lat: 40.44, lng: -80.00, warhead: "R-36M", yieldKt: 750, casualties: 1_320_000, phase: 3, origin: "USSR" },
  { id: 108, city: "St. Louis", country: "USA", lat: 38.63, lng: -90.20, warhead: "SS-19", yieldKt: 500, casualties: 1_120_000, phase: 3, origin: "USSR" },
  { id: 109, city: "Baltimore", country: "USA", lat: 39.29, lng: -76.61, warhead: "SS-N-18", yieldKt: 200, casualties: 1_540_000, phase: 3, origin: "USSR" },
  { id: 110, city: "San Diego", country: "USA", lat: 32.72, lng: -117.16, warhead: "R-36M", yieldKt: 750, casualties: 1_210_000, phase: 3, origin: "USSR" },
  { id: 111, city: "Portland", country: "USA", lat: 45.51, lng: -122.68, warhead: "SS-20", yieldKt: 150, casualties: 870_000, phase: 3, origin: "USSR" },
  { id: 112, city: "Kansas City", country: "USA", lat: 39.10, lng: -94.58, warhead: "SS-19", yieldKt: 500, casualties: 760_000, phase: 3, origin: "USSR" },
  { id: 113, city: "Tampa", country: "USA", lat: 27.95, lng: -82.46, warhead: "R-36M", yieldKt: 750, casualties: 1_120_000, phase: 3, origin: "USSR" },
  { id: 114, city: "Cleveland", country: "USA", lat: 41.50, lng: -81.69, warhead: "SS-19", yieldKt: 500, casualties: 980_000, phase: 3, origin: "USSR" },
  { id: 115, city: "Cincinnati", country: "USA", lat: 39.10, lng: -84.51, warhead: "SS-20", yieldKt: 150, casualties: 750_000, phase: 3, origin: "USSR" },
  { id: 116, city: "Indianapolis", country: "USA", lat: 39.77, lng: -86.16, warhead: "SS-N-18", yieldKt: 200, casualties: 680_000, phase: 3, origin: "USSR" },
  { id: 117, city: "Columbus", country: "USA", lat: 39.96, lng: -83.00, warhead: "SS-20", yieldKt: 150, casualties: 620_000, phase: 3, origin: "USSR" },
  { id: 118, city: "Milwaukee", country: "USA", lat: 43.04, lng: -87.91, warhead: "SS-20", yieldKt: 150, casualties: 580_000, phase: 3, origin: "USSR" },
  { id: 119, city: "San Antonio", country: "USA", lat: 29.42, lng: -98.49, warhead: "SS-N-18", yieldKt: 200, casualties: 750_000, phase: 3, origin: "USSR" },
  { id: 120, city: "New Orleans", country: "USA", lat: 29.95, lng: -90.07, warhead: "SS-19", yieldKt: 500, casualties: 870_000, phase: 3, origin: "USSR" },

  // --- US military bases (USSR strikes) ---
  { id: 121, city: "Minot AFB", country: "USA", lat: 48.42, lng: -101.36, warhead: "R-36M", yieldKt: 750, casualties: 45_000, phase: 3, origin: "USSR" },
  { id: 122, city: "Whiteman AFB", country: "USA", lat: 38.73, lng: -93.55, warhead: "R-36M", yieldKt: 750, casualties: 30_000, phase: 3, origin: "USSR" },
  { id: 123, city: "Warren AFB", country: "USA", lat: 41.15, lng: -104.87, warhead: "R-36M", yieldKt: 750, casualties: 40_000, phase: 3, origin: "USSR" },
  { id: 124, city: "Bangor Sub Base", country: "USA", lat: 47.72, lng: -122.71, warhead: "SS-N-18", yieldKt: 200, casualties: 35_000, phase: 3, origin: "USSR" },
  { id: 125, city: "Pearl Harbor", country: "USA", lat: 21.35, lng: -157.97, warhead: "SS-19", yieldKt: 500, casualties: 340_000, phase: 3, origin: "USSR" },
  { id: 126, city: "Guam (Andersen AFB)", country: "USA", lat: 13.58, lng: 144.92, warhead: "SS-19", yieldKt: 500, casualties: 60_000, phase: 3, origin: "USSR" },
  { id: 127, city: "Barksdale AFB", country: "USA", lat: 32.50, lng: -93.66, warhead: "R-36M", yieldKt: 750, casualties: 35_000, phase: 3, origin: "USSR" },
  { id: 128, city: "Dyess AFB", country: "USA", lat: 32.42, lng: -99.85, warhead: "SS-19", yieldKt: 500, casualties: 25_000, phase: 3, origin: "USSR" },
  { id: 129, city: "Ellsworth AFB", country: "USA", lat: 44.15, lng: -103.10, warhead: "R-36M", yieldKt: 750, casualties: 20_000, phase: 3, origin: "USSR" },
  { id: 130, city: "Grand Forks AFB", country: "USA", lat: 47.97, lng: -97.40, warhead: "R-36M", yieldKt: 750, casualties: 25_000, phase: 3, origin: "USSR" },

  // --- Canada (USSR strikes) ---
  { id: 131, city: "Montreal", country: "CANADA", lat: 45.50, lng: -73.57, warhead: "SS-19", yieldKt: 500, casualties: 2_340_000, phase: 3, origin: "USSR" },
  { id: 132, city: "Vancouver", country: "CANADA", lat: 49.28, lng: -123.12, warhead: "SS-N-18", yieldKt: 200, casualties: 1_200_000, phase: 3, origin: "USSR" },
  { id: 133, city: "Edmonton", country: "CANADA", lat: 53.55, lng: -113.49, warhead: "SS-20", yieldKt: 150, casualties: 540_000, phase: 3, origin: "USSR" },
  { id: 134, city: "Halifax", country: "CANADA", lat: 44.65, lng: -63.57, warhead: "SS-N-18", yieldKt: 200, casualties: 310_000, phase: 3, origin: "USSR" },
  { id: 135, city: "Winnipeg", country: "CANADA", lat: 49.90, lng: -97.14, warhead: "SS-20", yieldKt: 150, casualties: 450_000, phase: 3, origin: "USSR" },
  { id: 136, city: "CFB Cold Lake", country: "CANADA", lat: 54.42, lng: -110.28, warhead: "SS-20", yieldKt: 150, casualties: 15_000, phase: 3, origin: "USSR" },

  // --- Western Europe secondary (USSR strikes) ---
  { id: 137, city: "Turin", country: "ITALY", lat: 45.07, lng: 7.69, warhead: "SS-20", yieldKt: 150, casualties: 1_120_000, phase: 3, origin: "USSR" },
  { id: 138, city: "Genoa", country: "ITALY", lat: 44.41, lng: 8.93, warhead: "SS-20", yieldKt: 150, casualties: 620_000, phase: 3, origin: "USSR" },
  { id: 139, city: "Aviano Air Base", country: "ITALY", lat: 46.03, lng: 12.60, warhead: "SS-20", yieldKt: 150, casualties: 30_000, phase: 3, origin: "USSR" },
  { id: 140, city: "Sigonella NAS", country: "ITALY", lat: 37.40, lng: 14.92, warhead: "SS-20", yieldKt: 150, casualties: 25_000, phase: 3, origin: "USSR" },
  { id: 141, city: "Seville", country: "SPAIN", lat: 37.39, lng: -5.98, warhead: "SS-20", yieldKt: 150, casualties: 620_000, phase: 3, origin: "USSR" },
  { id: 142, city: "Rota Naval Station", country: "SPAIN", lat: 36.64, lng: -6.35, warhead: "SS-20", yieldKt: 150, casualties: 30_000, phase: 3, origin: "USSR" },
  { id: 143, city: "Valencia", country: "SPAIN", lat: 39.47, lng: -0.38, warhead: "SS-20", yieldKt: 150, casualties: 750_000, phase: 3, origin: "USSR" },
  { id: 144, city: "Toulouse", country: "FRANCE", lat: 43.60, lng: 1.44, warhead: "SS-20", yieldKt: 150, casualties: 540_000, phase: 3, origin: "USSR" },
  { id: 145, city: "Bordeaux", country: "FRANCE", lat: 44.84, lng: -0.58, warhead: "SS-19", yieldKt: 500, casualties: 460_000, phase: 3, origin: "USSR" },
  { id: 146, city: "Lille", country: "FRANCE", lat: 50.63, lng: 3.06, warhead: "SS-20", yieldKt: 150, casualties: 620_000, phase: 3, origin: "USSR" },
  { id: 147, city: "Strasbourg", country: "FRANCE", lat: 48.57, lng: 7.75, warhead: "SS-20", yieldKt: 150, casualties: 420_000, phase: 3, origin: "USSR" },
  { id: 148, city: "Nice", country: "FRANCE", lat: 43.71, lng: 7.26, warhead: "SS-20", yieldKt: 150, casualties: 540_000, phase: 3, origin: "USSR" },
  { id: 149, city: "Nantes", country: "FRANCE", lat: 47.22, lng: -1.55, warhead: "SS-20", yieldKt: 150, casualties: 460_000, phase: 3, origin: "USSR" },
  { id: 150, city: "Liverpool", country: "UK", lat: 53.41, lng: -2.98, warhead: "SS-20", yieldKt: 150, casualties: 870_000, phase: 3, origin: "USSR" },
  { id: 151, city: "Edinburgh", country: "UK", lat: 55.95, lng: -3.19, warhead: "SS-20", yieldKt: 150, casualties: 620_000, phase: 3, origin: "USSR" },
  { id: 152, city: "Leeds", country: "UK", lat: 53.80, lng: -1.55, warhead: "SS-20", yieldKt: 150, casualties: 680_000, phase: 3, origin: "USSR" },
  { id: 153, city: "Bristol", country: "UK", lat: 51.45, lng: -2.59, warhead: "SS-20", yieldKt: 150, casualties: 540_000, phase: 3, origin: "USSR" },
  { id: 154, city: "Greenham Common", country: "UK", lat: 51.38, lng: -1.28, warhead: "SS-20", yieldKt: 150, casualties: 30_000, phase: 3, origin: "USSR" },
  { id: 155, city: "RAF Mildenhall", country: "UK", lat: 52.36, lng: 0.49, warhead: "SS-20", yieldKt: 150, casualties: 20_000, phase: 3, origin: "USSR" },
  { id: 156, city: "Dusseldorf", country: "FRG", lat: 51.23, lng: 6.78, warhead: "SS-20", yieldKt: 150, casualties: 620_000, phase: 3, origin: "USSR" },
  { id: 157, city: "Nuremberg", country: "FRG", lat: 49.45, lng: 11.08, warhead: "SS-20", yieldKt: 150, casualties: 480_000, phase: 3, origin: "USSR" },
  { id: 158, city: "Hannover", country: "FRG", lat: 52.37, lng: 9.74, warhead: "SS-20", yieldKt: 150, casualties: 510_000, phase: 3, origin: "USSR" },
  { id: 159, city: "Spangdahlem Air Base", country: "FRG", lat: 49.97, lng: 6.69, warhead: "SS-20", yieldKt: 150, casualties: 20_000, phase: 3, origin: "USSR" },
  { id: 160, city: "Wiesbaden", country: "FRG", lat: 50.08, lng: 8.24, warhead: "SS-20", yieldKt: 150, casualties: 300_000, phase: 3, origin: "USSR" },
  { id: 161, city: "Bremerhaven", country: "FRG", lat: 53.54, lng: 8.58, warhead: "SS-20", yieldKt: 150, casualties: 140_000, phase: 3, origin: "USSR" },
  { id: 162, city: "The Hague", country: "NETHERLANDS", lat: 52.08, lng: 4.31, warhead: "SS-20", yieldKt: 150, casualties: 450_000, phase: 3, origin: "USSR" },
  { id: 163, city: "Utrecht", country: "NETHERLANDS", lat: 52.09, lng: 5.12, warhead: "SS-20", yieldKt: 150, casualties: 320_000, phase: 3, origin: "USSR" },
  { id: 164, city: "Souda Bay", country: "GREECE", lat: 35.49, lng: 24.12, warhead: "SS-20", yieldKt: 150, casualties: 25_000, phase: 3, origin: "USSR" },
  { id: 165, city: "Thessaloniki", country: "GREECE", lat: 40.63, lng: 22.94, warhead: "SS-20", yieldKt: 150, casualties: 870_000, phase: 3, origin: "USSR" },
  { id: 166, city: "Izmir", country: "TURKEY", lat: 38.42, lng: 27.14, warhead: "SS-19", yieldKt: 500, casualties: 1_870_000, phase: 3, origin: "USSR" },
  { id: 167, city: "Thule Air Base", country: "DENMARK", lat: 76.53, lng: -68.70, warhead: "SS-19", yieldKt: 500, casualties: 10_000, phase: 3, origin: "USSR" },
  { id: 168, city: "Keflavik Naval Air Station", country: "ICELAND", lat: 64.00, lng: -22.57, warhead: "SS-N-18", yieldKt: 200, casualties: 15_000, phase: 3, origin: "USSR" },
  { id: 169, city: "Lajes Field", country: "PORTUGAL", lat: 38.76, lng: -27.09, warhead: "SS-N-18", yieldKt: 200, casualties: 12_000, phase: 3, origin: "USSR" },
  { id: 170, city: "Porto", country: "PORTUGAL", lat: 41.15, lng: -8.61, warhead: "SS-20", yieldKt: 150, casualties: 580_000, phase: 3, origin: "USSR" },
  { id: 171, city: "Liege", country: "BELGIUM", lat: 50.63, lng: 5.57, warhead: "SS-20", yieldKt: 150, casualties: 320_000, phase: 3, origin: "USSR" },
  { id: 172, city: "Luxembourg City", country: "LUXEMBOURG", lat: 49.61, lng: 6.13, warhead: "SS-20", yieldKt: 150, casualties: 120_000, phase: 3, origin: "USSR" },
  { id: 173, city: "Bergen", country: "NORWAY", lat: 60.39, lng: 5.32, warhead: "SS-20", yieldKt: 150, casualties: 210_000, phase: 3, origin: "USSR" },
  { id: 174, city: "Bodo", country: "NORWAY", lat: 67.28, lng: 14.40, warhead: "SS-20", yieldKt: 150, casualties: 30_000, phase: 3, origin: "USSR" },
  { id: 175, city: "Aarhus", country: "DENMARK", lat: 56.15, lng: 10.21, warhead: "SS-20", yieldKt: 150, casualties: 250_000, phase: 3, origin: "USSR" },

  // --- USSR secondary cities (USA/UK/France strikes) ---
  { id: 176, city: "Krasnoyarsk", country: "USSR", lat: 56.01, lng: 92.85, warhead: "W-78", yieldKt: 350, casualties: 760_000, phase: 3, origin: "USA" },
  { id: 177, city: "Voronezh", country: "USSR", lat: 51.67, lng: 39.21, warhead: "W-87", yieldKt: 300, casualties: 760_000, phase: 3, origin: "USA" },
  { id: 178, city: "Saratov", country: "USSR", lat: 51.53, lng: 46.03, warhead: "W-76", yieldKt: 100, casualties: 620_000, phase: 3, origin: "USA" },
  { id: 179, city: "Dnepropetrovsk", country: "USSR", lat: 48.46, lng: 35.05, warhead: "W-78", yieldKt: 350, casualties: 870_000, phase: 3, origin: "USA" },
  { id: 180, city: "Donetsk", country: "USSR", lat: 48.00, lng: 37.80, warhead: "W-87", yieldKt: 300, casualties: 760_000, phase: 3, origin: "USA" },
  { id: 181, city: "Lvov", country: "USSR", lat: 49.84, lng: 24.03, warhead: "W-76", yieldKt: 100, casualties: 620_000, phase: 3, origin: "USA" },
  { id: 182, city: "Riga", country: "USSR", lat: 56.95, lng: 24.11, warhead: "W-62", yieldKt: 170, casualties: 620_000, phase: 3, origin: "USA" },
  { id: 183, city: "Tallinn", country: "USSR", lat: 59.44, lng: 24.75, warhead: "W-76", yieldKt: 100, casualties: 340_000, phase: 3, origin: "USA" },
  { id: 184, city: "Vilnius", country: "USSR", lat: 54.69, lng: 25.28, warhead: "W-62", yieldKt: 170, casualties: 420_000, phase: 3, origin: "USA" },
  { id: 185, city: "Alma-Ata", country: "USSR", lat: 43.24, lng: 76.95, warhead: "W-78", yieldKt: 350, casualties: 760_000, phase: 3, origin: "USA" },
  { id: 186, city: "Frunze", country: "USSR", lat: 42.87, lng: 74.59, warhead: "W-76", yieldKt: 100, casualties: 540_000, phase: 3, origin: "USA" },
  { id: 187, city: "Ufa", country: "USSR", lat: 54.74, lng: 55.97, warhead: "W-87", yieldKt: 300, casualties: 870_000, phase: 3, origin: "USA" },
  { id: 188, city: "Kuibyshev (2nd strike)", country: "USSR", lat: 53.20, lng: 50.15, warhead: "W-78", yieldKt: 350, casualties: 560_000, phase: 3, origin: "USA" },
  { id: 189, city: "Yerevan", country: "USSR", lat: 40.18, lng: 44.51, warhead: "W-76", yieldKt: 100, casualties: 870_000, phase: 3, origin: "USA" },
  { id: 190, city: "Anadyr", country: "USSR", lat: 64.73, lng: 177.51, warhead: "W-62", yieldKt: 170, casualties: 15_000, phase: 3, origin: "USA" },
  { id: 191, city: "Semipalatinsk", country: "USSR", lat: 50.07, lng: 78.43, warhead: "W-87", yieldKt: 300, casualties: 140_000, phase: 3, origin: "USA" },
  { id: 192, city: "Magnitogorsk", country: "USSR", lat: 53.39, lng: 59.00, warhead: "W-78", yieldKt: 350, casualties: 380_000, phase: 3, origin: "USA" },
  { id: 193, city: "Novokuznetsk", country: "USSR", lat: 53.76, lng: 87.11, warhead: "W-76", yieldKt: 100, casualties: 540_000, phase: 3, origin: "USA" },
  { id: 194, city: "Tomsk", country: "USSR", lat: 56.50, lng: 84.97, warhead: "W-87", yieldKt: 300, casualties: 420_000, phase: 3, origin: "USA" },
  { id: 195, city: "Barnaul", country: "USSR", lat: 53.35, lng: 83.77, warhead: "W-76", yieldKt: 100, casualties: 480_000, phase: 3, origin: "USA" },
  { id: 196, city: "Arkhangelsk", country: "USSR", lat: 64.54, lng: 40.54, warhead: "Polaris-A3", yieldKt: 200, casualties: 340_000, phase: 3, origin: "UK" },
  { id: 197, city: "Kaliningrad", country: "USSR", lat: 54.71, lng: 20.51, warhead: "Polaris-A3", yieldKt: 200, casualties: 360_000, phase: 3, origin: "UK" },
  { id: 198, city: "Kirov", country: "USSR", lat: 58.60, lng: 49.66, warhead: "Polaris-A3", yieldKt: 200, casualties: 370_000, phase: 3, origin: "UK" },
  { id: 199, city: "Ivanovo", country: "USSR", lat: 57.00, lng: 40.97, warhead: "Polaris-A3", yieldKt: 200, casualties: 400_000, phase: 3, origin: "UK" },
  { id: 200, city: "Tula", country: "USSR", lat: 54.19, lng: 37.62, warhead: "Polaris-A3", yieldKt: 200, casualties: 420_000, phase: 3, origin: "UK" },
  { id: 201, city: "Smolensk", country: "USSR", lat: 54.78, lng: 32.04, warhead: "M20-SLBM", yieldKt: 1000, casualties: 300_000, phase: 3, origin: "FRANCE" },
  { id: 202, city: "Bryansk", country: "USSR", lat: 53.24, lng: 34.36, warhead: "S3-IRBM", yieldKt: 1000, casualties: 380_000, phase: 3, origin: "FRANCE" },
  { id: 203, city: "Kursk", country: "USSR", lat: 51.73, lng: 36.19, warhead: "M20-SLBM", yieldKt: 1000, casualties: 360_000, phase: 3, origin: "FRANCE" },
  { id: 204, city: "Lipetsk", country: "USSR", lat: 52.61, lng: 39.59, warhead: "S3-IRBM", yieldKt: 1000, casualties: 400_000, phase: 3, origin: "FRANCE" },
  { id: 205, city: "Yaroslavl", country: "USSR", lat: 57.63, lng: 39.87, warhead: "M20-SLBM", yieldKt: 1000, casualties: 540_000, phase: 3, origin: "FRANCE" },

  // --- Warsaw Pact secondary (USA strikes) ---
  { id: 206, city: "Wroclaw", country: "POLAND", lat: 51.11, lng: 17.04, warhead: "W-76", yieldKt: 100, casualties: 540_000, phase: 3, origin: "USA" },
  { id: 207, city: "Poznan", country: "POLAND", lat: 52.41, lng: 16.93, warhead: "W-62", yieldKt: 170, casualties: 480_000, phase: 3, origin: "USA" },
  { id: 208, city: "Lodz", country: "POLAND", lat: 51.77, lng: 19.46, warhead: "W-76", yieldKt: 100, casualties: 720_000, phase: 3, origin: "USA" },
  { id: 209, city: "Szczecin", country: "POLAND", lat: 53.43, lng: 14.55, warhead: "W-62", yieldKt: 170, casualties: 340_000, phase: 3, origin: "USA" },
  { id: 210, city: "Brno", country: "CZECHOSLOVAKIA", lat: 49.20, lng: 16.61, warhead: "W-76", yieldKt: 100, casualties: 340_000, phase: 3, origin: "USA" },
  { id: 211, city: "Bratislava", country: "CZECHOSLOVAKIA", lat: 48.15, lng: 17.11, warhead: "W-62", yieldKt: 170, casualties: 380_000, phase: 3, origin: "USA" },
  { id: 212, city: "Ostrava", country: "CZECHOSLOVAKIA", lat: 49.82, lng: 18.26, warhead: "W-76", yieldKt: 100, casualties: 300_000, phase: 3, origin: "USA" },
  { id: 213, city: "Debrecen", country: "HUNGARY", lat: 47.53, lng: 21.63, warhead: "W-76", yieldKt: 100, casualties: 210_000, phase: 3, origin: "USA" },
  { id: 214, city: "Miskolc", country: "HUNGARY", lat: 48.10, lng: 20.78, warhead: "W-62", yieldKt: 170, casualties: 190_000, phase: 3, origin: "USA" },
  { id: 215, city: "Szeged", country: "HUNGARY", lat: 46.25, lng: 20.15, warhead: "W-76", yieldKt: 100, casualties: 170_000, phase: 3, origin: "USA" },
  { id: 216, city: "Cluj-Napoca", country: "ROMANIA", lat: 46.77, lng: 23.60, warhead: "W-78", yieldKt: 350, casualties: 310_000, phase: 3, origin: "USA" },
  { id: 217, city: "Timisoara", country: "ROMANIA", lat: 45.76, lng: 21.23, warhead: "W-76", yieldKt: 100, casualties: 280_000, phase: 3, origin: "USA" },
  { id: 218, city: "Constanta", country: "ROMANIA", lat: 44.18, lng: 28.63, warhead: "W-62", yieldKt: 170, casualties: 300_000, phase: 3, origin: "USA" },
  { id: 219, city: "Plovdiv", country: "BULGARIA", lat: 42.15, lng: 24.75, warhead: "W-76", yieldKt: 100, casualties: 340_000, phase: 3, origin: "USA" },
  { id: 220, city: "Varna", country: "BULGARIA", lat: 43.21, lng: 27.91, warhead: "W-62", yieldKt: 170, casualties: 280_000, phase: 3, origin: "USA" },
  { id: 221, city: "Rostock", country: "GDR", lat: 54.09, lng: 12.10, warhead: "W-76", yieldKt: 100, casualties: 230_000, phase: 3, origin: "USA" },
  { id: 222, city: "Karl-Marx-Stadt", country: "GDR", lat: 50.83, lng: 12.92, warhead: "W-62", yieldKt: 170, casualties: 290_000, phase: 3, origin: "USA" },
  { id: 223, city: "Magdeburg", country: "GDR", lat: 52.13, lng: 11.63, warhead: "W-76", yieldKt: 100, casualties: 270_000, phase: 3, origin: "USA" },
  { id: 224, city: "Erfurt", country: "GDR", lat: 50.98, lng: 11.03, warhead: "W-62", yieldKt: 170, casualties: 210_000, phase: 3, origin: "USA" },
  { id: 225, city: "Halle", country: "GDR", lat: 51.48, lng: 11.97, warhead: "W-76", yieldKt: 100, casualties: 310_000, phase: 3, origin: "USA" },

  // --- China secondary (USA and USSR strikes) ---
  { id: 226, city: "Xi'an", country: "CHINA", lat: 34.26, lng: 108.94, warhead: "W-87", yieldKt: 300, casualties: 2_120_000, phase: 3, origin: "USA" },
  { id: 227, city: "Dalian", country: "CHINA", lat: 38.91, lng: 121.60, warhead: "W-78", yieldKt: 350, casualties: 1_870_000, phase: 3, origin: "USA" },
  { id: 228, city: "Changchun", country: "CHINA", lat: 43.88, lng: 125.32, warhead: "W-76", yieldKt: 100, casualties: 1_540_000, phase: 3, origin: "USA" },
  { id: 229, city: "Jinan", country: "CHINA", lat: 36.65, lng: 116.99, warhead: "W-62", yieldKt: 170, casualties: 1_800_000, phase: 3, origin: "USA" },
  { id: 230, city: "Hangzhou", country: "CHINA", lat: 30.27, lng: 120.15, warhead: "W-87", yieldKt: 300, casualties: 1_320_000, phase: 3, origin: "USA" },
  { id: 231, city: "Zhengzhou", country: "CHINA", lat: 34.75, lng: 113.65, warhead: "W-78", yieldKt: 350, casualties: 1_600_000, phase: 3, origin: "USA" },
  { id: 232, city: "Kunming", country: "CHINA", lat: 25.04, lng: 102.68, warhead: "W-76", yieldKt: 100, casualties: 1_100_000, phase: 3, origin: "USA" },
  { id: 233, city: "Taiyuan", country: "CHINA", lat: 37.87, lng: 112.55, warhead: "W-62", yieldKt: 170, casualties: 1_400_000, phase: 3, origin: "USA" },
  { id: 234, city: "Changsha", country: "CHINA", lat: 28.23, lng: 112.94, warhead: "W-87", yieldKt: 300, casualties: 1_250_000, phase: 3, origin: "USA" },
  { id: 235, city: "Lop Nur Test Site", country: "CHINA", lat: 41.55, lng: 88.35, warhead: "W-78", yieldKt: 350, casualties: 10_000, phase: 3, origin: "USA" },
  { id: 236, city: "Lanzhou", country: "CHINA", lat: 36.06, lng: 103.83, warhead: "SS-19", yieldKt: 500, casualties: 1_300_000, phase: 3, origin: "USSR" },
  { id: 237, city: "Fuzhou", country: "CHINA", lat: 26.07, lng: 119.30, warhead: "SS-20", yieldKt: 150, casualties: 980_000, phase: 3, origin: "USSR" },
  { id: 238, city: "Guiyang", country: "CHINA", lat: 26.65, lng: 106.63, warhead: "SS-20", yieldKt: 150, casualties: 870_000, phase: 3, origin: "USSR" },
  { id: 239, city: "Nanchang", country: "CHINA", lat: 28.68, lng: 115.86, warhead: "SS-20", yieldKt: 150, casualties: 920_000, phase: 3, origin: "USSR" },
  { id: 240, city: "Urumqi", country: "CHINA", lat: 43.80, lng: 87.58, warhead: "SS-20", yieldKt: 150, casualties: 780_000, phase: 3, origin: "USSR" },
  { id: 241, city: "Qiqihar", country: "CHINA", lat: 47.35, lng: 123.95, warhead: "SS-20", yieldKt: 150, casualties: 1_100_000, phase: 3, origin: "USSR" },

  // --- China strikes on both sides ---
  { id: 242, city: "Krasnoyarsk (2nd strike)", country: "USSR", lat: 56.02, lng: 92.87, warhead: "DF-5", yieldKt: 4000, casualties: 800_000, phase: 3, origin: "CHINA" },
  { id: 243, city: "Chita", country: "USSR", lat: 52.03, lng: 113.50, warhead: "DF-5", yieldKt: 4000, casualties: 300_000, phase: 3, origin: "CHINA" },
  { id: 244, city: "Ulan-Ude", country: "USSR", lat: 51.83, lng: 107.59, warhead: "DF-5", yieldKt: 4000, casualties: 320_000, phase: 3, origin: "CHINA" },
  { id: 245, city: "Vladivostok (2nd strike)", country: "USSR", lat: 43.13, lng: 131.90, warhead: "DF-5", yieldKt: 4000, casualties: 600_000, phase: 3, origin: "CHINA" },

  // --- More NATO secondary (USSR strikes) ---
  { id: 246, city: "Izmir NATO HQ", country: "TURKEY", lat: 38.44, lng: 27.17, warhead: "SS-20", yieldKt: 150, casualties: 120_000, phase: 3, origin: "USSR" },
  { id: 247, city: "Adana", country: "TURKEY", lat: 37.00, lng: 35.33, warhead: "SS-20", yieldKt: 150, casualties: 870_000, phase: 3, origin: "USSR" },
  { id: 248, city: "Bursa", country: "TURKEY", lat: 40.19, lng: 29.06, warhead: "SS-20", yieldKt: 150, casualties: 750_000, phase: 3, origin: "USSR" },
  { id: 249, city: "Patras", country: "GREECE", lat: 38.25, lng: 21.73, warhead: "SS-20", yieldKt: 150, casualties: 310_000, phase: 3, origin: "USSR" },
  { id: 250, city: "Florence", country: "ITALY", lat: 43.77, lng: 11.25, warhead: "SS-20", yieldKt: 150, casualties: 540_000, phase: 3, origin: "USSR" },
  { id: 251, city: "Palermo", country: "ITALY", lat: 38.12, lng: 13.36, warhead: "SS-20", yieldKt: 150, casualties: 620_000, phase: 3, origin: "USSR" },
  { id: 252, city: "Bologna", country: "ITALY", lat: 44.49, lng: 11.34, warhead: "SS-20", yieldKt: 150, casualties: 480_000, phase: 3, origin: "USSR" },
  { id: 253, city: "Zaragoza", country: "SPAIN", lat: 41.65, lng: -0.88, warhead: "SS-20", yieldKt: 150, casualties: 540_000, phase: 3, origin: "USSR" },
  { id: 254, city: "Bilbao", country: "SPAIN", lat: 43.26, lng: -2.93, warhead: "SS-20", yieldKt: 150, casualties: 420_000, phase: 3, origin: "USSR" },
  { id: 255, city: "Malaga", country: "SPAIN", lat: 36.72, lng: -4.42, warhead: "SS-20", yieldKt: 150, casualties: 380_000, phase: 3, origin: "USSR" },

  // --- More USA secondary (USSR strikes) ---
  { id: 256, city: "Charlotte", country: "USA", lat: 35.23, lng: -80.84, warhead: "SS-20", yieldKt: 150, casualties: 580_000, phase: 3, origin: "USSR" },
  { id: 257, city: "Nashville", country: "USA", lat: 36.16, lng: -86.78, warhead: "SS-N-18", yieldKt: 200, casualties: 620_000, phase: 3, origin: "USSR" },
  { id: 258, city: "Sacramento", country: "USA", lat: 38.58, lng: -121.49, warhead: "SS-20", yieldKt: 150, casualties: 540_000, phase: 3, origin: "USSR" },
  { id: 259, city: "Jacksonville", country: "USA", lat: 30.33, lng: -81.66, warhead: "SS-20", yieldKt: 150, casualties: 480_000, phase: 3, origin: "USSR" },
  { id: 260, city: "Memphis", country: "USA", lat: 35.15, lng: -90.05, warhead: "SS-N-18", yieldKt: 200, casualties: 540_000, phase: 3, origin: "USSR" },
  { id: 261, city: "Buffalo", country: "USA", lat: 42.89, lng: -78.88, warhead: "SS-20", yieldKt: 150, casualties: 480_000, phase: 3, origin: "USSR" },
  { id: 262, city: "Salt Lake City", country: "USA", lat: 40.76, lng: -111.89, warhead: "SS-20", yieldKt: 150, casualties: 420_000, phase: 3, origin: "USSR" },
  { id: 263, city: "Richmond", country: "USA", lat: 37.54, lng: -77.44, warhead: "SS-20", yieldKt: 150, casualties: 380_000, phase: 3, origin: "USSR" },
  { id: 264, city: "Groton Sub Base", country: "USA", lat: 41.35, lng: -72.08, warhead: "SS-19", yieldKt: 500, casualties: 50_000, phase: 3, origin: "USSR" },
  { id: 265, city: "Pantex Plant (Amarillo)", country: "USA", lat: 35.32, lng: -101.96, warhead: "R-36M", yieldKt: 750, casualties: 60_000, phase: 3, origin: "USSR" },
  { id: 266, city: "Oak Ridge", country: "USA", lat: 36.01, lng: -84.27, warhead: "SS-19", yieldKt: 500, casualties: 40_000, phase: 3, origin: "USSR" },
  { id: 267, city: "Hanford Site", country: "USA", lat: 46.55, lng: -119.49, warhead: "R-36M", yieldKt: 750, casualties: 30_000, phase: 3, origin: "USSR" },
  { id: 268, city: "Rocky Flats", country: "USA", lat: 39.89, lng: -105.18, warhead: "SS-19", yieldKt: 500, casualties: 35_000, phase: 3, origin: "USSR" },
  { id: 269, city: "Savannah River Site", country: "USA", lat: 33.35, lng: -81.74, warhead: "R-36M", yieldKt: 750, casualties: 25_000, phase: 3, origin: "USSR" },
  { id: 270, city: "Los Alamos", country: "USA", lat: 35.88, lng: -106.30, warhead: "SS-19", yieldKt: 500, casualties: 20_000, phase: 3, origin: "USSR" },
  { id: 271, city: "Offutt AFB (2nd strike)", country: "USA", lat: 41.12, lng: -95.91, warhead: "R-36M", yieldKt: 750, casualties: 45_000, phase: 3, origin: "USSR" },
  { id: 272, city: "Camp Lejeune", country: "USA", lat: 34.62, lng: -77.36, warhead: "SS-20", yieldKt: 150, casualties: 35_000, phase: 3, origin: "USSR" },
  { id: 273, city: "Fort Bragg", country: "USA", lat: 35.14, lng: -79.00, warhead: "SS-20", yieldKt: 150, casualties: 40_000, phase: 3, origin: "USSR" },
  { id: 274, city: "Fort Hood", country: "USA", lat: 31.13, lng: -97.78, warhead: "SS-20", yieldKt: 150, casualties: 45_000, phase: 3, origin: "USSR" },

  // --- More FRG / NATO bases ---
  { id: 275, city: "Kaiserslautern", country: "FRG", lat: 49.44, lng: 7.77, warhead: "SS-20", yieldKt: 150, casualties: 120_000, phase: 3, origin: "USSR" },
  { id: 276, city: "Grafenwohr", country: "FRG", lat: 49.72, lng: 11.91, warhead: "SS-20", yieldKt: 150, casualties: 25_000, phase: 3, origin: "USSR" },
  { id: 277, city: "Geilenkirchen", country: "FRG", lat: 50.96, lng: 6.04, warhead: "SS-20", yieldKt: 150, casualties: 20_000, phase: 3, origin: "USSR" },
  { id: 278, city: "Bitburg Air Base", country: "FRG", lat: 49.95, lng: 6.57, warhead: "SS-20", yieldKt: 150, casualties: 15_000, phase: 3, origin: "USSR" },
  { id: 279, city: "Bremerhaven Port", country: "FRG", lat: 53.55, lng: 8.59, warhead: "SS-20", yieldKt: 150, casualties: 80_000, phase: 3, origin: "USSR" },
  { id: 280, city: "Kiel", country: "FRG", lat: 54.32, lng: 10.14, warhead: "SS-20", yieldKt: 150, casualties: 240_000, phase: 3, origin: "USSR" },

  // --- More UK ---
  { id: 281, city: "Cardiff", country: "UK", lat: 51.48, lng: -3.18, warhead: "SS-20", yieldKt: 150, casualties: 420_000, phase: 3, origin: "USSR" },
  { id: 282, city: "Sheffield", country: "UK", lat: 53.38, lng: -1.47, warhead: "SS-20", yieldKt: 150, casualties: 540_000, phase: 3, origin: "USSR" },
  { id: 283, city: "Nottingham", country: "UK", lat: 52.95, lng: -1.15, warhead: "SS-20", yieldKt: 150, casualties: 450_000, phase: 3, origin: "USSR" },
  { id: 284, city: "Newcastle", country: "UK", lat: 54.98, lng: -1.61, warhead: "SS-20", yieldKt: 150, casualties: 380_000, phase: 3, origin: "USSR" },
  { id: 285, city: "Plymouth", country: "UK", lat: 50.38, lng: -4.14, warhead: "SS-20", yieldKt: 150, casualties: 280_000, phase: 3, origin: "USSR" },
  { id: 286, city: "Portsmouth Naval Base", country: "UK", lat: 50.80, lng: -1.10, warhead: "SS-19", yieldKt: 500, casualties: 300_000, phase: 3, origin: "USSR" },
  { id: 287, city: "Faslane Naval Base", country: "UK", lat: 56.07, lng: -4.82, warhead: "SS-19", yieldKt: 500, casualties: 40_000, phase: 3, origin: "USSR" },

  // --- More Canada ---
  { id: 288, city: "Calgary", country: "CANADA", lat: 51.05, lng: -114.07, warhead: "SS-20", yieldKt: 150, casualties: 480_000, phase: 3, origin: "USSR" },
  { id: 289, city: "Quebec City", country: "CANADA", lat: 46.81, lng: -71.21, warhead: "SS-20", yieldKt: 150, casualties: 420_000, phase: 3, origin: "USSR" },

  // --- More Warsaw Pact / USSR (USA strikes) ---
  { id: 290, city: "Kemerovo", country: "USSR", lat: 55.34, lng: 86.09, warhead: "W-76", yieldKt: 100, casualties: 460_000, phase: 3, origin: "USA" },
  { id: 291, city: "Penza", country: "USSR", lat: 53.20, lng: 45.00, warhead: "W-62", yieldKt: 170, casualties: 400_000, phase: 3, origin: "USA" },
  { id: 292, city: "Orenburg", country: "USSR", lat: 51.77, lng: 55.10, warhead: "W-78", yieldKt: 350, casualties: 420_000, phase: 3, origin: "USA" },
  { id: 293, city: "Dushanbe", country: "USSR", lat: 38.56, lng: 68.77, warhead: "W-76", yieldKt: 100, casualties: 480_000, phase: 3, origin: "USA" },
  { id: 294, city: "Ashkhabad", country: "USSR", lat: 37.96, lng: 58.38, warhead: "W-62", yieldKt: 170, casualties: 340_000, phase: 3, origin: "USA" },
  { id: 295, city: "Minsk (2nd strike)", country: "USSR", lat: 53.92, lng: 27.59, warhead: "B-61", yieldKt: 340, casualties: 500_000, phase: 3, origin: "USA" },
  { id: 296, city: "Katowice", country: "POLAND", lat: 50.26, lng: 19.02, warhead: "W-76", yieldKt: 100, casualties: 350_000, phase: 3, origin: "USA" },
  { id: 297, city: "Lublin", country: "POLAND", lat: 51.25, lng: 22.57, warhead: "W-62", yieldKt: 170, casualties: 300_000, phase: 3, origin: "USA" },
  { id: 298, city: "Plzen", country: "CZECHOSLOVAKIA", lat: 49.75, lng: 13.38, warhead: "W-76", yieldKt: 100, casualties: 160_000, phase: 3, origin: "USA" },
  { id: 299, city: "Schwerin", country: "GDR", lat: 53.63, lng: 11.41, warhead: "W-62", yieldKt: 170, casualties: 110_000, phase: 3, origin: "USA" },

  // --- THE LAST STRIKE ---
  { id: 300, city: "Lyon", country: "FRANCE", lat: 45.76, lng: 4.84, warhead: "SS-20", yieldKt: 150, casualties: 1_120_000, phase: 3, origin: "USSR" },
];

export const TOTAL_CASUALTIES = STRIKES.reduce((sum, s) => sum + s.casualties, 0);
export const TOTAL_WARHEADS = STRIKES.length;
export const NATIONS_AFFECTED = new Set(STRIKES.map((s) => s.country)).size;
