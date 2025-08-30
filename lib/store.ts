import { v4 as uuidv4 } from 'uuid';

export interface ReportEntry {
  createdAt: number;
  report: any;
}

const TTL = 2 * 60 * 60 * 1000; // 2 hours in ms
const store = new Map<string, ReportEntry>();

export function setReport(report: any): string {
  const id = uuidv4();
  store.set(id, { createdAt: Date.now(), report });
  purgeOld();
  return id;
}

export function getReport(id: string): ReportEntry | undefined {
  purgeOld();
  return store.get(id);
}

function purgeOld() {
  const now = Date.now();
  for (const [id, entry] of store.entries()) {
    if (now - entry.createdAt > TTL) {
      store.delete(id);
    }
  }
}
