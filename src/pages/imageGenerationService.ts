import axios from 'axios';

const API_KEY = 'AIzaSyCcrvK3Ebnvf9KlXY_sCtqAYK3vuKe0Kcw';
const API_URL = 'https://api.gemini.ai/v1/images/generate'; // Ajusta esta URL según la documentación de Gemini.

export const generateImage = async (prompt: string): Promise<any> => {
  try {
    const response = await axios.post(API_URL, {
      prompt: prompt,
    }, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data; // Ajusta según la estructura de la respuesta de la API
  } catch (error) {
    console.error('Error generando la imagen:', error);
    throw error;
  }
};
