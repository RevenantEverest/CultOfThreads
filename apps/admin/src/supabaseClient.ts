import type { Database } from '@repo/ui';

import { createClient } from '@supabase/supabase-js';
import { ENV } from '@@admin/constants';

const supabase = createClient<Database>(ENV.SUPABASE_URL, ENV.SUPABASE_KEY);

export default supabase;