export default function CultProfilePage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Cult Profile: {params.slug}</h1>
      {/* Add cult profile content here */}
    </div>
  );
}