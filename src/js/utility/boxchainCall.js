export const request = async () => {
  console.log('Requesting...');
  try {
    const response = await fetch('http://localhost:1111/workers');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
  return request();
};
