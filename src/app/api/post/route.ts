import { callRapidAPI } from "@/modules/rapid-api"
import { setUserHasTweeted } from "@/modules/supabase/users"
import { NextRequest, NextResponse } from "next/server"

import en from "../../../../messages/en.json"

const TWITTER_ACCOUNT = en.rewards.rewardProgram.follow.clientTwitterAcct

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)

    const tweetId = searchParams.get("tweet")
    if (!tweetId)
        return NextResponse.json({ hasTweeted: false, error: "Tweet not found" }, { status: 400 })

    const resp = await callRapidAPI(`/tweet/${tweetId}`)
    if (!resp.ok)
        return NextResponse.json({ hasTweeted: false, error: "Tweet not found" }, { status: 400 })

    const tweet = resp.data

    const TimelineAddEntries = tweet.threaded_conversation_with_injections.find((_tweet: any) => {
        return _tweet.type == "TimelineAddEntries"
    })

    const tweetObj = TimelineAddEntries.entries[0].content.itemContent.tweet_results.result.tweet
    const username = tweetObj.core.user_results.result.legacy.screen_name
    const fullText = tweetObj.legacy.full_text

    const hasTweeted = fullText.includes(`@${TWITTER_ACCOUNT}`)

    if (hasTweeted) await setUserHasTweeted(username, tweetId, fullText)

    return NextResponse.json({ hasTweeted: hasTweeted }, { status: 200 })
}
