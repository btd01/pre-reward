import { supabase } from "@/modules/supabase/supabaseClient"

const USER_TABLE = "users"

export const setUserHasFollowed = async (username: string) => {
    const { data: upsertedData, error } = await supabase
        .from(USER_TABLE)
        .upsert({ username: username, followed: true }, { onConflict: "username" })
        .select()

    if (error) {
        console.error("Error inserting data:", error.message)
        return false
    } else {
        return upsertedData
    }
}

export const setUserHasTweeted = async (username: string, tweetId: string, tweet: string) => {
    const { data: upsertedData, error } = await supabase
        .from(USER_TABLE)
        .upsert({ username, tweetid: tweetId, tweet: tweet }, { onConflict: "username" })
        .select()

    if (error) {
        console.error("Error inserting data:", error.message)
        return false
    } else {
        return upsertedData
    }
}

export const setUserWallet = async (
    username: string,
    wallet: string
): Promise<{ updated: boolean; error?: string }> => {
    // Lower case to avoid checksum mismatch
    wallet = wallet.toLowerCase()

    const existingUser = await findUser(username, wallet)

    if (existingUser) {
        if (existingUser.username === username && existingUser.wallet) {
            return { updated: false, error: `Username${username} already registered` }
        }
        if (existingUser.wallet === wallet) {
            return { updated: false, error: `Wallet ${wallet} already registered` }
        }
    } else {
        return { updated: false, error: "User not found" }
    }

    const { error } = await supabase
        .from(USER_TABLE)
        .upsert({ username, wallet }, { onConflict: "username" })
        .select()

    if (error) {
        console.error("Error inserting data:", error.message)
        return { updated: false, error: error.message }
    }

    return { updated: true, error: undefined }
}

export const countUsers = async (): Promise<number> => {
    try {
        // Query the users USER_table to count all rows
        const { count, error } = await supabase
            .from(USER_TABLE)
            .select("*", { count: "exact", head: true }) // This fetches only the count, not the data itself

        if (error) {
            console.error("Error fetching user count:", error.message)
            return 0
        }

        return count || 0 // Return the count, or 0 if no users exist
    } catch (error) {
        console.error("Error during user count:", error)
        return -2 // Return -2 on unexpected error
    }
}

export const findUser = async (username: string, wallet: string): Promise<any | null> => {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .or(`username.eq.${username},wallet.eq.${wallet}`)

    if (error) {
        console.error("Error fetching user:", error.message)
        return null
    }
    return data[0]
}
