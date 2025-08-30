import UrlForm from '../components/UrlForm';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Site X-Ray</h1>
      <p className="mb-6 text-gray-600 max-w-xl text-center">Paste a public URL to analyze its structure, assets, and signals. No login required. Example: <code>https://example.com</code></p>
      <UrlForm />
    </main>
  );
}
