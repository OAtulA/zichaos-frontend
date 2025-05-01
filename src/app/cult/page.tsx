'use client';

import { useCult } from '@/context/CultContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function CultDetailPage() {
  const { cults } = useCult();
  const router = useRouter();

  if (cults.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white bg-zinc-950">
        <div className="text-center space-y-4">
          <p className="text-lg">No cults found.</p>
          <Button onClick={() => router.push('/create')}>Create a Cult</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 flex flex-col items-center">
      <section className="max-w-3xl w-full space-y-8">
        <h1 className="text-3xl font-bold text-purple-400 text-center">🌌 All Cults</h1>

        {cults.map((cult, index) => (
          <div key={cult.id} className="bg-zinc-900 p-6 rounded-xl space-y-4">
            <h2 className="text-2xl font-semibold text-purple-300">{cult.name}</h2>
            <div>
              <h3 className="font-bold text-lg">📜 Manifesto</h3>
              <p className="text-gray-300">{cult.manifesto}</p>
            </div>
            <div>
              <h3 className="font-bold text-lg">🪄 Rituals</h3>
              <ul className="list-disc list-inside text-gray-300">
                {cult.rituals.map((ritual, i) => (
                  <li key={i}>{ritual}</li>
                ))}
              </ul>
            </div>
            <Button
              className="mt-4 bg-purple-700 hover:bg-purple-800"
              onClick={() => router.push(`/cult/${cult.id}`)}
            >
              Visit Cult
            </Button>
          </div>
        ))}
      </section>
    </main>
  );
}
