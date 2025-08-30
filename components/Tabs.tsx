"use client";
import { useState } from 'react';
import Section from './Section';

export default function Tabs({ report }: { report: any }) {
  const [tab, setTab] = useState<'summary' | 'json' | 'markdown'>('summary');
  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button className={tab==='summary'? 'font-bold underline' : ''} onClick={()=>setTab('summary')}>Summary</button>
        <button className={tab==='json'? 'font-bold underline' : ''} onClick={()=>setTab('json')}>JSON</button>
        <button className={tab==='markdown'? 'font-bold underline' : ''} onClick={()=>setTab('markdown')}>Markdown</button>
      </div>
      {tab==='summary' && <Section title="Summary"><pre>{report.reportMarkdown}</pre></Section>}
      {tab==='json' && <Section title="JSON"><pre>{JSON.stringify(report.reportJson, null, 2)}</pre></Section>}
      {tab==='markdown' && <Section title="Markdown"><pre>{report.reportMarkdown}</pre></Section>}
    </div>
  );
}
