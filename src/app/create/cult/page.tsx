'use client';

import { useRouter } from 'next/navigation';
import { useCult } from '@/contexts/CultContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function CreateCultPage() {
  const { createCult } = useCult();
  const router = useRouter();
  const [name, setName] = useState('');
  const [theme, setTheme] = useState('');
  const [manifesto, setManifesto] = useState('');
  const [rituals, setRituals] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createCult({
        name,
        theme,
        manifesto,
        rituals
      });
      router.push('/cult');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create a New Cult</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block font-medium">Cult Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-zinc-900 border-zinc-800"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Theme</label>
            <Input
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              required
              className="bg-zinc-900 border-zinc-800"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Manifesto</label>
            <Textarea
              value={manifesto}
              onChange={(e) => setManifesto(e.target.value)}
              required
              className="bg-zinc-900 border-zinc-800 min-h-[150px]"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Rituals (comma separated)</label>
            <Input
              onChange={(e) => setRituals(e.target.value.split(','))}
              className="bg-zinc-900 border-zinc-800"
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Cult'}
          </Button>
        </form>
      </div>
    </main>
  );
}