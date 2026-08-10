"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";

const AUDIO_SRC = "/sound/kk.mp3";
const TARGET_VOLUME = 0.1;
const FADE_IN_DURATION = 1;
const FADE_OUT_DURATION = 0.8;

type SoundContextValue = {
  soundEnabled: boolean;
  toggleSound: () => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeTweenRef = useRef<gsap.core.Tween | null>(null);
  const operationRef = useRef(0);
  const soundRequestedRef = useRef(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const setAudioRef = useCallback((audio: HTMLAudioElement | null) => {
    audioRef.current = audio;

    if (audio) {
      audio.volume = 0;
    }
  }, []);

  const killVolumeTween = useCallback(() => {
    volumeTweenRef.current?.kill();
    volumeTweenRef.current = null;
  }, []);

  const resetToOff = useCallback(() => {
    const audio = audioRef.current;

    operationRef.current += 1;
    soundRequestedRef.current = false;
    killVolumeTween();
    setSoundEnabled(false);

    if (audio) {
      audio.pause();
      audio.volume = 0;
    }
  }, [killVolumeTween]);

  useEffect(() => {
    return () => {
      resetToOff();
    };
  }, [resetToOff]);

  const toggleSound = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const operation = operationRef.current + 1;
    operationRef.current = operation;
    killVolumeTween();

    if (soundRequestedRef.current) {
      soundRequestedRef.current = false;
      setSoundEnabled(false);

      volumeTweenRef.current = gsap.to(audio, {
        volume: 0,
        duration: FADE_OUT_DURATION,
        ease: "power2.out",
        overwrite: "auto",
        onComplete: () => {
          if (operationRef.current !== operation) return;

          audio.pause();
          audio.volume = 0;
          volumeTweenRef.current = null;
        },
      });
      return;
    }

    soundRequestedRef.current = true;
    audio.volume = Math.min(audio.volume, TARGET_VOLUME);

    void audio
      .play()
      .then(() => {
        if (operationRef.current !== operation || !soundRequestedRef.current) {
          return;
        }

        setSoundEnabled(true);
        volumeTweenRef.current = gsap.to(audio, {
          volume: TARGET_VOLUME,
          duration: FADE_IN_DURATION,
          ease: "power2.out",
          overwrite: "auto",
          onComplete: () => {
            if (operationRef.current === operation) {
              volumeTweenRef.current = null;
            }
          },
        });
      })
      .catch(() => {
        if (operationRef.current !== operation) return;

        soundRequestedRef.current = false;
        setSoundEnabled(false);
        audio.pause();
        audio.volume = 0;
      });
  }, [killVolumeTween]);

  const value = useMemo(
    () => ({ soundEnabled, toggleSound }),
    [soundEnabled, toggleSound],
  );

  return (
    <SoundContext.Provider value={value}>
      <audio
        ref={setAudioRef}
        src={AUDIO_SRC}
        loop
        preload="metadata"
        aria-hidden="true"
        onError={resetToOff}
      />
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const sound = useContext(SoundContext);

  if (!sound) {
    throw new Error("useSound must be used within a SoundProvider.");
  }

  return sound;
}
