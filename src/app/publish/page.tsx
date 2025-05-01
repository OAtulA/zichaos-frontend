'use client';

import { useRouter } from 'next/navigation';
import { useCult } from '@/context/CultContext';
import { Button } from '@/components/ui/button';

export default function PublishCultPage() {
  const router = useRouter();
  const { cults } = useCult();
  const latestCult = cults.length > 0 ? cults[cults.length - 1] : null;

  if (!latestCult) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white p-6 flex flex-col items-center justify-center">
        <p className="text-gray-400 text-lg">No cult data to publish. Please create a cult first.</p>
        <Button className="mt-4" onClick={() => router.push('/create')}>
          Create a Cult
        </Button>
      </main>
    );
  }

  const handlePublish = async () => {
    try {
      // Optional: POST to backend
      // await fetch('/api/save-cult', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(latestCult),
      // });

      alert('Cult published successfully! 🚀');
      router.push('/cult');
    } catch (err) {
      console.error('Publish failed:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 flex flex-col items-center">
      <section className="max-w-xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-purple-400">🚀 Publish Your Cult</h1>
        <div className="bg-zinc-900 p-4 rounded-xl space-y-4">
          <h2 className="text-2xl font-semibold">{latestCult.name}</h2>
          <div>
            <h3 className="font-medium">📜 Manifesto:</h3>
            <p className="text-sm text-gray-300 mt-1">{latestCult.manifesto}</p>
          </div>
          <div>
            <h3 className="font-medium">🪄 Rituals:</h3>
            <ul className="list-disc list-inside text-gray-300 mt-1">
              {latestCult.rituals.map((ritual, i) => (
                <li key={i}>{ritual}</li>
              ))}
            </ul>
          </div>
        </div>

        <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handlePublish}>
          Confirm & Publish
        </Button>
      </section>
    </main>
  );
}
