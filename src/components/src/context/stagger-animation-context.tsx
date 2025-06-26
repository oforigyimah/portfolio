import React, { createContext, useContext, useState } from 'react';

type StaggerAnimationContextType = {
  triggerAnimation: (x: number, y: number) => void;
  lastClickPosition: { x: number, y: number } | null;
};

const StaggerAnimationContext = createContext<StaggerAnimationContextType>({
  triggerAnimation: () => {},
  lastClickPosition: null
});

export const AnimationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [lastClickPosition, setLastClickPosition] = useState<{x: number, y: number} | null>(null);

  const triggerAnimation = (x: number, y: number) => {
    setLastClickPosition({ x, y });
  };

  return (
    <StaggerAnimationContext.Provider value={{ triggerAnimation, lastClickPosition }}>
      {children}
    </StaggerAnimationContext.Provider>
  );
};

export const useStaggerAnimationTrigger = () => useContext(StaggerAnimationContext);