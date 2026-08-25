async function createMessage(text, sender, receiver) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, sender, receiver }),
    });
    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }
    return await response.json();
  } catch (error) {
    if (error) throw error;
  }
}

export { createMessage };
