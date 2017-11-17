export async function apiCall(url) {
  console.log('Requesting...');
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('Request successful!')
    return data;
  } catch (error) {
    console.log(error);
  }
}
