import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const MESHHY_AI_API_KEY = process.env.MESHHY_AI_API_KEY;
const MESHHY_AI_ENDPOINT = process.env.MESHHY_AI_ENDPOINT || 'https://api.meshhy.ai';

if (!MESHHY_AI_API_KEY) {
  console.warn('Warning: Meshhy AI API Key not set in environment variables');
}

export const meshhyClient = axios.create({
  baseURL: MESHHY_AI_ENDPOINT,
  headers: {
    'Authorization': `Bearer ${MESHHY_AI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Generate 3D plane model for display
export async function generatePlaneModel(tourDetails) {
  try {
    const response = await meshhyClient.post('/models/generate', {
      type: 'airplane',
      destination: tourDetails.destination,
      flightPath: tourDetails.flightPath,
      style: 'realistic',
      metadata: tourDetails,
    });
    return response.data;
  } catch (error) {
    console.error('Error generating plane model:', error);
    throw error;
  }
}

// Process 3D visualization for service display
export async function generateServiceVisualization(serviceData) {
  try {
    const response = await meshhyClient.post('/models/generate', {
      type: 'service',
      name: serviceData.name,
      description: serviceData.description,
      images: serviceData.images,
      style: 'modern',
      interactiveElements: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error generating service visualization:', error);
    throw error;
  }
}
