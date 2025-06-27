const API_BASE = "http://localhost:8001";

export async function fetchFunctions() {
  const res = await fetch(`${API_BASE}/functions`);
  return res.json();
}

export async function fetchMethods() {
  const res = await fetch(`${API_BASE}/methods`);
  return res.json();
}
