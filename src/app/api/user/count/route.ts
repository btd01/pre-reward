import { countUsers } from "@/modules/supabase/users"
import { NextResponse } from "next/server"

export async function GET() {
    const totalUsers = await countUsers()
    return NextResponse.json({ count: totalUsers }, { status: 200 })
}
