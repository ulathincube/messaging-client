async function createUser(email, password) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      },
    );
    return response;
  } catch (error) {
    if (error) throw error;
  }
}

async function findUser(email) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/search?query=${email}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  } catch (error) {
    if (error) throw error;
  }
}

async function loginUser(email, password) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      },
    );

    return response;
  } catch (error) {
    if (error) throw error;
  }
}

async function findChats(sender, receiver) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/chats?sender=${sender}&receiver=${receiver}`,
    );

    return response;
  } catch (error) {
    if (error) throw error;
  }
}

async function findContacts(email) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/user/${email}`,
    );
    return response;
  } catch (error) {
    if (error) throw error;
  }
}

export { createUser, findUser, loginUser, findChats, findContacts };
