import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fgsuzbmvikgwqupchjpt.supabase.co';
const supabaseKey = 'sb_publishable_i4fuGAK7dEhtMOC-ax6rTQ_f9VtzpfP';

export const supabase = createClient(supabaseUrl, supabaseKey);
