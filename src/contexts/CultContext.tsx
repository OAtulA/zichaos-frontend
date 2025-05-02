'use client';

import { createContext, useContext } from 'react';

interface Cult {
  id: string;
  name: string;
  manifesto: string;
  rituals: string[];
}

interface CultContextType {
  cults: Cult[];
}

const CultContext = createContext<CultContextType>({
  cults: [],
});

export const useCult = () => useContext(CultContext);

export const CultProvider = ({ children }: { children: React.ReactNode }) => {
  const dummyCults: Cult[] = [
    {
      id: '1',
      name: 'The Cosmic Order',
      manifesto: 'We seek to understand the mysteries of the universe and our place within it.',
      rituals: [
        'Daily meditation under the stars',
        'Weekly cosmic energy sharing circles',
        'Monthly full moon ceremonies'
      ]
    },
    {
      id: '2',
      name: 'The Eternal Flame',
      manifesto: 'We keep the fire of knowledge burning through generations.',
      rituals: [
        'Daily candle lighting rituals',
        'Weekly knowledge sharing sessions',
        'Monthly fire dancing ceremonies'
      ]
    },
    {
      id: '3',
      name: 'The Silent Watchers',
      manifesto: 'We observe and protect the balance of nature.',
      rituals: [
        'Daily nature observation',
        'Weekly silent meditation retreats',
        'Monthly forest cleanups'
      ]
    }
  ];

  return (
    <CultContext.Provider value={{ cults: dummyCults }}>
      {children}
    </CultContext.Provider>
  );
};