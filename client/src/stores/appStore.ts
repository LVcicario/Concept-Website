import { create } from "zustand";

type Phase = "boot" | "transition" | "site";

interface AppState {
  phase: Phase;
  terminalOverlayOpen: boolean;
  muted: boolean;
  setPhase: (phase: Phase) => void;
  toggleTerminalOverlay: () => void;
  closeTerminalOverlay: () => void;
  toggleMute: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  phase: "boot",
  terminalOverlayOpen: false,
  muted: false,
  setPhase: (phase) => set({ phase }),
  toggleTerminalOverlay: () =>
    set((state) => ({ terminalOverlayOpen: !state.terminalOverlayOpen })),
  closeTerminalOverlay: () => set({ terminalOverlayOpen: false }),
  toggleMute: () => set((state) => ({ muted: !state.muted })),
}));
