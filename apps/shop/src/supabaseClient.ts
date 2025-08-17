import { createClient } from '@supabase/supabase-js';
import { ENV } from '@@shop/constants';

console.log("ENV => ", ENV.SUPABASE_KEY, ENV.SUPABASE_URL);

const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_KEY);

export default supabase;