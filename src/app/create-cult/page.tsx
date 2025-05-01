'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function CreateCultPage() {
  const [theme, setTheme] = useState('');
  const [cultData, setCultData] = useState<null | {
    name: string;
    lore: string;
    rituals: string;
  }>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateCult = async () => {
    setLoading(true);
    // try {
    //   const res = await fetch('/api/cult', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ theme }),
    //   });
    //   const data = await res.json();
    //   setCultData(data);
    // } 
    try{
        console.log("done")
    }
    catch (err) {
      console.error('Failed to create cult', err);
      setCultData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Create Your Cult</h1>

      <Input
        placeholder="e.g. Lizard People, Pineapple Church"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="mb-4"
      />

      <Button onClick={handleCreateCult} disabled={loading || !theme}>
        {loading ? 'Summoning...' : 'Generate Cult'}
      </Button>

      {cultData && (
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">{cultData.name}</h2>
          <p className="text-sm text-gray-600 whitespace-pre-line">{cultData.lore}</p>
          <div>
            <h3 className="font-medium mt-4">Rituals</h3>
            <p className="text-sm text-gray-500 whitespace-pre-line">{cultData.rituals}</p>
          </div>
        </div>
      )}
    </div>
  );
}
