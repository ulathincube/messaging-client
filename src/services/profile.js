async function editProfile(email, status) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, status }),
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

async function getProfileStatus(email) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/profile/${email}`,
    );

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }
    return await response.json();
  } catch (error) {
    if (error) throw error;
  }
}

export { editProfile, getProfileStatus };
