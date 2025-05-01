'use client';

import { useRouter } from 'next/navigation';
import { useCult } from '@/context/CultContext';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function CultSinglePage() {
  const { cults } = useCult();
  const { cultid } = useParams();
  const router = useRouter();

  const cult = cults.find((c) => c.id === cultid);

  if (!cult) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg">Cult not found 🕳️</p>
          <Button  onClick={() => router.push('/cult')}>Back to Cults</Button>&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="secondary" onClick={() => router.push('/')}>Back to Home</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 flex flex-col items-center">
      <section className="max-w-2xl w-full space-y-6">
        <h1 className="text-4xl font-bold text-purple-400">{cult.name}</h1>

        <div className="bg-zinc-900 p-6 rounded-xl space-y-4">
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
        </div>
      </section>
    </main>
  );
}
