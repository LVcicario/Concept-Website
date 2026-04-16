import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "../lib/gsap";
import { playKeystroke } from "../lib/audio";

/**
 * Types text as the element scrolls into view.
 * Returns the currently displayed portion of the text.
 */
export function useScrollTypewriter(text: string, speed = 30) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!triggerRef.current) return;

    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => setStarted(true),
    });

    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i > text.length) {
        clearInterval(interval);
        return;
      }
      setDisplayed(text.slice(0, i));
      if (text[i - 1] !== " " && i % 3 === 0) playKeystroke();
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed]);

  return { triggerRef, displayed, isDone: displayed.length >= text.length };
}
