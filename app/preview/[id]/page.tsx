export default async function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="w-full h-screen">
      <iframe
        src={`/api/preview/${id}`}
        className="w-full h-full border-0"
        title="Restaurant Preview"
      />
    </div>
  );
}
