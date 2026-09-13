import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { supabase } from './config/supabase.js';
import adminRoutes from './routes/admin.js';
import serviceRoutes from './routes/services.js';
import meshyRoutes from './routes/meshy.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/meshy', meshyRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'BIG-TORO server is running', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 BIG-TORO server running on http://localhost:${PORT}`);
  console.log('✈️ Travel and Tours Platform with Meshhy AI Integration');
});
