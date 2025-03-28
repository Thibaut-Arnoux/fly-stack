import ky from 'ky';

export async function fetchItemData() {
  try {
    // Make the GET request to the endpoint
    const response = await ky.get('https://api.flyff.com/item');

    // Parse the response as JSON
    const data = await response.json();

    // Log the data
    console.log(data);
  } catch (error) {
    console.error('Error fetching item data:', error);
  }
}
