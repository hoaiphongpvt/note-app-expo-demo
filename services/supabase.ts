import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ydltnchgcwuzbxcafrkx.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkbHRuY2hnY3d1emJ4Y2Fmcmt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4NjU5ODAsImV4cCI6MjA0ODQ0MTk4MH0.68ojUcFUmTwrOWbjyLO_xkMZPpzxq-HpntY4yONtbhA'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase