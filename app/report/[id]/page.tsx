import Summary from '../../../components/Summary';
import Tabs from '../../../components/Tabs';
import { getReport } from '../../../lib/store';
import { notFound } from 'next/navigation';

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = getReport(id);
  if (!entry) return notFound();
  const { report } = entry;
  return (
    <main className="max-w-3xl mx-auto p-4">
      <Summary report={report} />
      <Tabs report={report} />
    </main>
  );
}
