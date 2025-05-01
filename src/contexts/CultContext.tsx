'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// context/CultContext.tsx
import { v4 as uuidv4 } from 'uuid';

export type CultData = {
  id: string;
  name: string;
  manifesto: string;
  rituals: string[];
};

type CultContextType = {
  theme: string;
  setTheme: (t: string) => void;
  cults: CultData[];
  loading: boolean;
  generateCult: () => void;
};

const CultContext = createContext<CultContextType | undefined>(undefined);

export const useCult = () => {
  const context = useContext(CultContext);
  if (!context) {
    throw new Error('useCult must be used within a CultProvider');
  }
  return context;
};

export function CultProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('');
  const [cults, setCults] = useState<CultData[]>([]);
  const [loading, setLoading] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('ziChaos.cults');
    if (stored) {
      try {
        setCults(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse cults from localStorage:', e);
      }
    }
  }, []);

  // Save to localStorage when cults change
  useEffect(() => {
    localStorage.setItem('ziChaos.cults', JSON.stringify(cults));
  }, [cults]);

  const generateCult = () => {
    setLoading(true);

    setTimeout(() => {
      const newCult: CultData = {
        id: uuidv4(),
        name: `${theme} Collective`,
        manifesto: `We are the ${theme} believers. Our truth is absolute.`,
        rituals: [
          `Daily chant of '${theme}' at 3:33am.`,
          `Weekly symbolic meme offering.`,
          `Annual pilgrimage to the sacred Reddit thread.`,
        ],
      };

      setCults((prev) => [...prev, newCult]);
      setLoading(false);
    }, 1500);
  };

  return (
    <CultContext.Provider
      value={{ theme, setTheme, cults, loading, generateCult }}
    >
      {children}
    </CultContext.Provider>
  );
}
