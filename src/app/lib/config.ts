const supabaseUrl = process.env.NEXT_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_SUPABASE_ANON_KEY || ""
const rapidApiUrl = process.env.NEXT_RAPID_API_URL || ""
const rapidApiKey = process.env.NEXT_RAPID_API_KEY || ""
const reownProjectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || ""

if (!supabaseUrl) throw new Error("Supabase URL not found.")
if (!supabaseAnonKey) throw new Error("Supabase Anon key not found.")
if (!rapidApiUrl) throw new Error("Rapid API URL not found.")
if (!rapidApiKey) throw new Error("Rapid API Key not found.")
if (!reownProjectId) throw new Error("Reown project id not found.")

export const config = {
    supabaseUrl,
    supabaseAnonKey,
    rapidApiUrl,
    rapidApiKey,
    reownProjectId
}
