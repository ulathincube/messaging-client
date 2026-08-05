async function createUser(email, password) {
  try {
    const user = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return user;
  } catch (error) {
    if (error) throw error;
  }
}

export { createUser };
