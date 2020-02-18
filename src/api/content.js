import fetch from 'node-fetch';

const apiUrl = 'http://localhost:3005/api/content';

export const getContent = async () => {
  try {
    const res = await fetch(apiUrl, { method: 'GET' });
    console.log(res);
    const jsonData = res.json();
    console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const postContent = async (content) => {
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(content),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export default { getContent, postContent };
