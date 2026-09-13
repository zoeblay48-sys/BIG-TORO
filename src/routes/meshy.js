import express from 'express';
import { generatePlaneModel, generateServiceVisualization } from '../config/meshhy.js';

const router = express.Router();

// Generate airplane 3D model
router.post('/plane-model', async (req, res) => {
  try {
    const { destination, flightPath, tourDetails } = req.body;
    
    const model = await generatePlaneModel({
      destination,
      flightPath,
      ...tourDetails,
    });
    
    res.json(model);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate service visualization
router.post('/service-visualization', async (req, res) => {
  try {
    const serviceData = req.body;
    const visualization = await generateServiceVisualization(serviceData);
    res.json(visualization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
