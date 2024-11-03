"use client"

import { API_ENDPOINTS } from "@/lib/endpoints"
import { fetchWithErrorHandling } from "@/lib/fetch"
import { useMount } from "ahooks"
import React, { useState } from "react"

interface CountUpTimerProps {
    subheading: string
}

const CountUpTimer = ({ subheading }: CountUpTimerProps) => {
    const [count, setCount] = useState(0)
    useMount(async () => {
        const response = await fetchWithErrorHandling(API_ENDPOINTS.user.count)
        setCount(response.data.count)
    })

    return (
        <div>
            <div className="flex justify-center space-x-0.5 text-4xl font-bold">
                {count
                    .toString()
                    .padStart(5, "0")
                    .split("")
                    .map((digit, index) => (
                        <div key={index} className="bg-black text-white p-2">
                            {digit}
                        </div>
                    ))}
            </div>
            <p className="mt-4 text-center text-paragraph">{subheading}</p>
        </div>
    )
}

export { CountUpTimer }
