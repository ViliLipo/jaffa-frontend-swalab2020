import fetch from 'node-fetch';

const apiUrl = 'http://localhost:3001/api/content';

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

export default { getContent };
