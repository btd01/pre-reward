import { fetchWithErrorHandling } from "@/lib/fetch"

export const callHasFollowedXAccount = async (username: string): Promise<boolean> => {
    const response = await fetchWithErrorHandling(
        `/api/follow?username=${encodeURIComponent(username)}`
    )
    return response.data.hasFollowed
}

export const callHasTwittedOnX = async (tweetId: string): Promise<boolean> => {
    const response = await fetchWithErrorHandling(`/api/post?tweet=${encodeURIComponent(tweetId)}`)
    return response.data.hasTweeted
}
