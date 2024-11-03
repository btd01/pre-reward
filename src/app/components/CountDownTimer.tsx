/* eslint-disable react-hooks/exhaustive-deps */
"use client"

// pages/boost-rewards.tsx
import React, { useEffect, useState } from "react"

interface CountdownTimerProps {
    launchDate: string
}

const CountdownTimer: React.FC<CountdownTimerProps> = (launchDate) => {
    const targetDate = new Date(launchDate.launchDate).getTime()

    const calculateTimeLeft = () => {
        const now = new Date().getTime()
        const difference = targetDate - now

        const timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        }

        return timeLeft
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="flex space-x-1.5 justify-center">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center bg-black text-white p-1">
                    <div className="text-[10px] uppercase w-[55px]">{unit}</div>
                    <div className="text-4xl font-bold pb-1 rounded">
                        {value.toString().padStart(2, "0")}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CountdownTimer
