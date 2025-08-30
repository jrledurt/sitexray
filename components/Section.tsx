import { ReactNode } from 'react';

export default function Section({ title, children }: { title: string, children: ReactNode }) {
  return (
    <section className="mb-4">
      <h3 className="font-semibold mb-1">{title}</h3>
      <div>{children}</div>
    </section>
  );
}
