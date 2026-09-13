import express from 'express';
import { supabase } from '../config/supabase.js';
import { generateServiceVisualization } from '../config/meshhy.js';

const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get service by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get service visualization (Meshhy AI)
router.get('/:id/visualization', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data: service, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    const visualization = await generateServiceVisualization(service);
    res.json(visualization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
