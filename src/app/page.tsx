// app/page.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-12">
      <section className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Welcome to <span className="text-purple-500">ZiChaos</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          A semi-anonymous, chaos-fueled platform where cults are born, conspiracies die, and memes rule all.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/create/cult">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white text-lg">
              Create a Cult
            </Button>
          </Link>
          <Link href="/cult">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black text-lg">
              Browse Cults
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="ghost" className="text-sm text-gray-400 hover:text-purple-400 mt-2 sm:mt-0">
              Enter as Burner →
            </Button>
          </Link>
        </div>
      </section>

      <section className="mt-20 max-w-4xl w-full">
        <h2 className="text-2xl font-semibold mb-4">🔥 Trending Cults</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Placeholder cults — replace with real dynamic data later */}
          {['Moon Truthers', 'Flat Code Society', 'Lizard Lobby'].map((cult) => (
            <div key={cult} className="p-4 bg-zinc-900 rounded-xl border border-zinc-700">
              <h3 className="text-xl font-bold">{cult}</h3>
              <p className="text-sm text-gray-400 mt-1">“Join us or be assimilated.”</p>
              <Link href={`/cult/${cult.toLowerCase().replace(/ /g, '-')}`}>
                <Button variant="link" className="text-purple-400 mt-2 p-0">
                  View Cult →
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
