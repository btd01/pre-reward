import { config } from "@/lib/config"
import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = config.supabaseUrl
const SUPABASE_KEY = config.supabaseAnonKey

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export { supabase }
