import express from 'express';
import { supabaseAdmin } from '../config/supabase.js';

const router = express.Router();

// Middleware to verify admin
const verifyAdmin = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Get all services
router.get('/services', verifyAdmin, async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create service
router.post('/services', verifyAdmin, async (req, res) => {
  try {
    const { name, description, images, attributes, category, active } = req.body;
    
    const { data, error } = await supabaseAdmin
      .from('services')
      .insert([
        {
          name,
          description,
          images: images || [],
          attributes: attributes || {},
          category,
          active: active || true,
          created_at: new Date(),
        },
      ])
      .select();
    
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update service
router.put('/services/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, images, attributes, category, active } = req.body;
    
    const { data, error } = await supabaseAdmin
      .from('services')
      .update({
        name,
        description,
        images,
        attributes,
        category,
        active,
        updated_at: new Date(),
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete service
router.delete('/services/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabaseAdmin
      .from('services')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
