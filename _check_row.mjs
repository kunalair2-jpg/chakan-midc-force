import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8').trim().split('\n').map(l => {
    const i = l.indexOf('=');
    return [l.slice(0, i), l.slice(i + 1)];
  })
);
const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const { data, error } = await admin.from('warehouses').select('slug, title, images').ilike('title', 'Debug Test Warehouse').order('slug', { ascending: false }).limit(1);
console.log(JSON.stringify(data, null, 2), error);
