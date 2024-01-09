import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xlidhgtytiligyywfoob.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsaWRoZ3R5dGlsaWd5eXdmb29iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4MDU1NDYsImV4cCI6MjAyMDM4MTU0Nn0.RXjKH3g38KpD7hUXfnvlCzdA59NssBXqEjV_ndFJLoE'
const supabase = createClient(supabaseUrl, supabaseKey)

console.log('init supabase:', supabase);

export default function useSupabase () {
    return { supabase }
}
