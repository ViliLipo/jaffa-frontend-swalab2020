import fetch from 'node-fetch';
import tokenstore from './tokenstore';

const apiUrl = 'http://localhost:3005/api/content';

export const getContent = async () => {
  try {
    const res = await fetch(apiUrl, { method: 'GET' });
    console.log(res);
    const jsonData = await res.json();
    console.log(jsonData);
    if (res.ok) {
      return jsonData;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const postContent = async (content) => {
  const token = tokenstore.getToken();
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({ ...content, token }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(res);
    return await res.json();
  } catch (error) {
    console.error(error);
    return {};
  }
};

export default { getContent, postContent };
