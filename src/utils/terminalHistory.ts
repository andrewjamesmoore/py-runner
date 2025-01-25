export interface HistoryEntry {
  input: string;
  output?: string;
  error?: boolean;
}

export function createHistoryEntry(
  input: string,
  output?: string,
  error?: boolean
): HistoryEntry {
  return {
    input,
    output,
    error,
  };
}
