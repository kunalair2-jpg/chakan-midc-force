import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Stateless client for public, read-only data. Unlike the cookie-based
// server client, this has no dependency on next/headers' cookies(), so it
// also works outside a request scope (e.g. generateStaticParams at build
// time, where cookies() throws "called outside a request scope").
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
