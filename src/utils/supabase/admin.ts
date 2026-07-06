import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Service-role client for privileged server-only operations (e.g. Storage
// uploads) that must bypass Row Level Security because this app has no
// real Supabase Auth session for owners. Never import this from client code.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
