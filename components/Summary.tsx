import Badges from './Badges';
import Section from './Section';

export default function Summary({ report }: { report: any }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">Summary</h2>
      <Badges report={report} />
      <Section title="Overview">
        <pre className="bg-gray-100 rounded p-2 text-sm overflow-x-auto">{JSON.stringify(report.reportJson, null, 2)}</pre>
      </Section>
    </div>
  );
}
