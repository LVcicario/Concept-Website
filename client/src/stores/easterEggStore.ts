import { create } from "zustand";

type EggId = "konami" | "terminal" | "console";

interface EasterEggState {
  found: EggId[];
  nuclearTriggered: boolean;
  nuclearDone: boolean;
  discover: (id: EggId) => void;
  setNuclearTriggered: () => void;
  setNuclearDone: () => void;
  reset: () => void;
}

function loadFound(): EggId[] {
  try {
    const raw = localStorage.getItem("lv_eggs");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

function saveFound(found: EggId[]) {
  localStorage.setItem("lv_eggs", JSON.stringify(found));
}

export const useEasterEggStore = create<EasterEggState>((set, get) => ({
  found: loadFound(),
  nuclearTriggered: false,
  nuclearDone: localStorage.getItem("lv_nuclear_done") === "1",

  discover: (id) => {
    const { found } = get();
    if (found.includes(id)) return;
    const next = [...found, id];
    saveFound(next);
    set({ found: next });
  },

  setNuclearTriggered: () => set({ nuclearTriggered: true }),

  setNuclearDone: () => {
    localStorage.setItem("lv_nuclear_done", "1");
    set({ nuclearDone: true, nuclearTriggered: false });
  },

  reset: () => {
    localStorage.removeItem("lv_eggs");
    localStorage.removeItem("lv_nuclear_done");
    set({ found: [], nuclearTriggered: false, nuclearDone: false });
  },
}));
