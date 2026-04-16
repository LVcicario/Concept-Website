import { useState, useCallback, useEffect } from "react";
import { LaunchTerminal } from "./LaunchTerminal";
import { WarMap } from "./WarMap";
import { Aftermath } from "./Aftermath";
import { startSiren, stopSiren, killAllAudio } from "./useNuclearAudio";
import { useEasterEggStore } from "../../stores/easterEggStore";
import { stopSiteAmbient } from "../../lib/audio";

type Act = "launch" | "war" | "aftermath" | "done";

export function NuclearSequence() {
  const [act, setAct] = useState<Act>("launch");
  const setNuclearDone = useEasterEggStore((s) => s.setNuclearDone);

  // Kill site ambient and start siren immediately
  useEffect(() => {
    stopSiteAmbient();
    startSiren();
  }, []);

  const handleLaunchComplete = useCallback(() => setAct("war"), []);

  const handleWarComplete = useCallback(() => {
    stopSiren();
    killAllAudio();
    setAct("aftermath");
  }, []);

  const handleAftermathComplete = useCallback(() => {
    setAct("done");
    setNuclearDone();
  }, [setNuclearDone]);

  if (act === "done") return null;

  return (
    <>
      {act === "launch" && <LaunchTerminal onComplete={handleLaunchComplete} />}
      {act === "war" && <WarMap onComplete={handleWarComplete} />}
      {act === "aftermath" && <Aftermath onComplete={handleAftermathComplete} />}
    </>
  );
}
