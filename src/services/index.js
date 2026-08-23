export async function wakeServerUp() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/start`);
    return response;
  } catch (error) {
    if (error) throw error;
  }
}
