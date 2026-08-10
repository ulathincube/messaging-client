async function editProfile(email, status) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, status }),
    });

    return response;
  } catch (error) {
    if (error) throw error;
  }
}

export { editProfile };
