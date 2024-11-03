import { fetchWithErrorHandling } from "@/lib/fetch"

const API_URL = process.env.NEXT_RAPID_API_URL!
const API_KEY = process.env.NEXT_RAPID_API_KEY!
const API_HOST = new URL(API_URL).host

export const callRapidAPI = async (endpoint: string, method = "GET") => {
    const response = await fetchWithErrorHandling(`${API_URL}${endpoint}`, {
        method: method,
        headers: {
            "x-rapidapi-host": API_HOST,
            "x-rapidapi-key": API_KEY
        }
    })
    console.debug("response", response)
    return response
}
