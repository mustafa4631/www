"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: (callback: () => void) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  startTransition: () => {},
});

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = useCallback((callback: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    }, 600);
  }, []);

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}

export const useTransitionContext = () => useContext(TransitionContext);
