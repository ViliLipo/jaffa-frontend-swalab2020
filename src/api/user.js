const fetch = require('node-fetch');

const apiUrl = 'http://localhost:3005/api/user';

export const postUser = async (username, password) => {
  try {
    const content = { username, password };
    const res = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(content),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default { postUser };
