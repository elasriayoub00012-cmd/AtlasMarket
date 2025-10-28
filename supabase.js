import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://xxxx.supabase.co'  // <-- بدلها بالرابط ديالك من Supabase
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'  // <-- بدلها بالمفتاح ديالك

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
