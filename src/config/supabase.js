import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key. Please check your .env file.');
}

// Client for user operations
export const supabase = createClient(supabaseUrl, supabaseKey);

// Admin client for privileged operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
