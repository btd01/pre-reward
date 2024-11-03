import { setUserWallet } from "@/modules/supabase/users"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
    try {
        const body = await request.json()
        const { username, wallet } = body
        const { updated, error } = await setUserWallet(username, wallet)
        return NextResponse.json({ updated, error }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to update user" }, { status: 400 })
    }
}
