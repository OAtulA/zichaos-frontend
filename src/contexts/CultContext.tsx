'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { api } from '@/lib/api';
import toast, { Toaster } from 'react-hot-toast';

export type CultData = {
  id: string;
  name: string;
  theme: string;
  manifesto: string;
  rituals: string[];
  _count?: {
    members: number;
    comments: number;
  };
  createdAt?: string;
  updatedAt?: string;
};

type CultContextType = {
  theme: string;
  setTheme: (t: string) => void;
  cults: CultData[];
  loading: boolean;
  error: string | null;
  generateCult: () => Promise<void>;
  fetchCults: (search?: string, theme?: string) => Promise<void>;
  getCultById: (id: string) => Promise<CultData | null>;
  createCult: (cultData: Omit<CultData, 'id'>) => Promise<void>;
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
  const [error, setError] = useState<string | null>(null);

  const fetchCults = async (search?: string, themeFilter?: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (themeFilter) params.append('theme', themeFilter);
      
      const { data } = await api.get(`/cults?${params.toString()}`);
      setCults(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch cults');
      console.error('Error fetching cults:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCultById = async (id: string): Promise<CultData | null> => {
    try {
      const { data } = await api.get(`/cults/${id}`);
      return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch cult');
      console.error('Error fetching cult:', err);
      return null;
    }
  };

  const generateCult = async () => {
    setLoading(true);
    setError(null);
    try {
      const cultData = {
        name: `${theme} Collective`,
        theme,
        manifesto: `We are the ${theme} believers. Our truth is absolute.`,
        rituals: [
          `Daily chant of '${theme}' at 3:33am.`,
          `Weekly symbolic meme offering.`,
          `Annual pilgrimage to the sacred Reddit thread.`,
        ],
      };

      const { data } = await api.post('/cults', cultData);
      setCults((prev) => [...prev, data]);
      if(data){
       toast.success('Cult created successfully!');        
      }

      return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create cult');
      console.error('Error creating cult:', err);
    } finally {
      setLoading(false);
    }
  };

  const createCult = async (cultData: Omit<CultData, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/cults', cultData);
      setCults((prev) => [...prev, data]);  
      
      if(data){
        toast.success('Cult created successfully!');
        console.log('Cult created:', data);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create cult');
      console.error('Error creating cult:', err);
      toast.error(err.response?.data?.message || 'Failed to create cult');
      throw err;

    } finally {
      setLoading(false);
    }
  };

  return (
    <CultContext.Provider
      value={{ 
        theme, 
        setTheme, 
        cults, 
        loading, 
        error,
        generateCult,
        fetchCults,
        getCultById,
        createCult
      }}
    >
      <Toaster position='bottom-right' />
      {children}
    </CultContext.Provider>
  );
}
