export async function wakeServerUp() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/start`);
  if (!response.ok) throw new Error('Something went wrong: Server unreachable');
  return await response.json();
}
