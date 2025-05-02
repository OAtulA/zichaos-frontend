// app/create/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

export default function CreateCultPage() {
  const [theme, setTheme] = useState('');
  const [loading, setLoading] = useState(false);
  const [cultData, setCultData] = useState<null | {
    name: string;
    manifesto: string;
    rituals: string[];
  }>(null);

  const generateCult = async () => {
    setLoading(true);
    setCultData(null);
    // try {
    //   const res = await fetch('/api/generate-cult', {
    //     method: 'POST',
    //     body: JSON.stringify({ theme }),
    //     headers: { 'Content-Type': 'application/json' },
    //   });
    //   const data = await res.json();
    //   setCultData(data);
    // }
    try{
        alert("Cult created successfully. You can now publish it.");
    }
     catch (err) {
      console.error('Failed to generate cult:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 flex flex-col items-center">
      <section className="max-w-xl w-full space-y-6">
        <h1 className="text-3xl font-bold">Create a Cult</h1>
        <p className="text-sm text-gray-400">Enter a bizarre theme or idea. The AI will take care of the rest.</p>

        <Input
          placeholder="e.g. Flat Code Society, Moon Bouncers"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="text-white"
        />

        <Button onClick={generateCult} disabled={!theme || loading} className="w-full">
          {loading ? <Loader2 className="animate-spin mr-2" /> : null}
          Generate Cult
        </Button>

        {cultData && (
          <div className="mt-10 p-6 bg-zinc-900 rounded-xl space-y-4">
            <h2 className="text-2xl font-semibold text-purple-400">{cultData.name}</h2>
            <div>
              <h3 className="text-lg font-bold">📜 Manifesto:</h3>
              <p className="text-gray-300 mt-1">{cultData.manifesto}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold">🪄 Rituals:</h3>
              <ul className="list-disc list-inside text-gray-300 mt-1">
                {cultData.rituals.map((ritual, i) => (
                  <li key={i}>{ritual}</li>
                ))}
              </ul>
            </div>
            <Button variant="secondary" className="mt-4">
              Publish Cult 🚀
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}

/*You’ll Also Need:
POST /api/generate-cult API route
It uses Gemini/OpenAI to return name, manifesto, rituals
UI components: Button, Input, Textarea (if using shadcn/ui)
Optional: Save to DB with Prisma in the “Publish” step*/