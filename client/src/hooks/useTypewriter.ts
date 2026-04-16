import { useState, useEffect, useRef, useCallback } from "react";

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export function useTypewriter({
  text,
  speed = 40,
  delay = 0,
  onComplete,
}: UseTypewriterOptions) {
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const indexRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const skip = useCallback(() => {
    setDisplayed(text);
    setIsTyping(false);
    setIsDone(true);
    onCompleteRef.current?.();
  }, [text]);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed("");
    setIsDone(false);

    const delayTimer = setTimeout(() => {
      setIsTyping(true);

      const interval = setInterval(() => {
        indexRef.current += 1;
        if (indexRef.current >= text.length) {
          setDisplayed(text);
          setIsTyping(false);
          setIsDone(true);
          clearInterval(interval);
          onCompleteRef.current?.();
        } else {
          setDisplayed(text.slice(0, indexRef.current));
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [text, speed, delay]);

  return { displayed, isTyping, isDone, skip };
}
