"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UrlForm() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');
      router.push(`/report/${data.id}`);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-3">
      <input
        type="url"
        className="border rounded px-3 py-2 text-lg"
        placeholder="Paste a public URL (https://...)"
        value={url}
        onChange={e => setUrl(e.target.value)}
        required
        disabled={loading}
      />
      <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 font-semibold" disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
      <button type="button" className="underline text-sm" onClick={() => setUrl('https://example.com')} disabled={loading}>
        Analyze example.com
      </button>
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </form>
  );
}
