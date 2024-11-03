import { callRapidAPI } from "@/modules/rapid-api"
import { setUserHasFollowed } from "@/modules/supabase/users"
import { NextRequest, NextResponse } from "next/server"

import en from "../../../../messages/en.json"

const TWITTER_ACCOUNT = en.rewards.rewardProgram.follow.clientTwitterAcct.toLowerCase()

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)

    const username = searchParams.get("username")
    if (!username) return NextResponse.json({ error: "Username is required" }, { status: 400 })

    const convertUsernameToUserId = await callRapidAPI(`/username/to/id/${username}`)
    if (!convertUsernameToUserId.ok)
        return NextResponse.json(
            { hasFollowed: false, error: "Twitter user id not found" },
            { status: 400 }
        )

    const userId = convertUsernameToUserId.data.userId

    const getUserFollowers = await callRapidAPI(`/user/${userId}/followings?count=1000`)
    if (!getUserFollowers.ok)
        return NextResponse.json(
            { hasFollowed: false, error: "Twitter followers not found" },
            { status: 400 }
        )

    const followers = getUserFollowers.data.user

    /* eslint-disable */
    const instructions = (followers as any).result?.timeline?.timeline?.instructions
    if (!instructions || instructions.length < 4) {
        return NextResponse.json(
            { hasFollowed: false, error: "Twitter followers not found" },
            { status: 400 }
        )
    }

    const entries = instructions[3].entries
    const hasFollowed = entries.find((entry: any) => {
        const username = entry.content.itemContent?.user_results.result.legacy.screen_name
        // console.debug("username: ", username)
        if (username?.toLowerCase() == TWITTER_ACCOUNT) return true
    })

    const result = hasFollowed != undefined

    if (result) await setUserHasFollowed(username)

    return NextResponse.json({ hasFollowed: result }, { status: 200 })
}
