export const ZERO_ADDRESS = `0x0000000000000000000000000000000000000000`

export const extractUsernameAndTweetId = (
    tweetURL: string
): { found: boolean; username: string; tweetId: string } => {
    const regex = /https:\/\/x\.com\/([^/]+)\/status\/(\d+)/
    const match = tweetURL.match(regex)

    if (!match) {
        return { found: false, username: "", tweetId: "" }
    }

    const username = match[1]
    const tweetId = match[2]

    return { found: true, username, tweetId }
}
