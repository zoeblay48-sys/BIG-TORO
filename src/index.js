import { supabase } from './config/supabase.js';

console.log('🚀 BIG-TORO - Travel and Tours Platform');
console.log('Connected to Supabase:', supabase.auth.session ? 'Yes' : 'Ready');
