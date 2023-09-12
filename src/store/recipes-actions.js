import { recipesActions } from './recipes-slice';

const apiKey = process.env.REACT_APP_FIREBASE_DATABASE;

export async function sendUserData(userData) {
  try {
    const response = await fetch(apiKey + 'user.json', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Error sending data');
    }
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
}
