import { fetchWithErrorHandling } from "@/lib/fetch"

export const callInsertUser = async (
    username: string,
    wallet: string,
    tweetId: string
): Promise<any> => {
    const response = await fetchWithErrorHandling(`/api/user`, {
        method: "POST",
        body: JSON.stringify({ username, wallet, tweetId })
    })
    return response.data.hasFollowed
}

export const callUpdateUserWallet = async (username: string, wallet: string): Promise<any> => {
    const response = await fetchWithErrorHandling(`/api/user`, {
        method: "PUT",
        body: JSON.stringify({ username, wallet })
    })
    return response.data
}
