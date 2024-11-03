// src/components/BoostRewardsPage.tsx (Client Component)
"use client"

import CountdownTimer from "@/components/CountDownTimer"
import Dots from "@/components/Dots"
import Layout from "@/components/Layout"
import Navbar from "@/components/Navbar"
import ResponsiveDiv from "@/components/ResponsiveDiv"
import ResponsiveHeader from "@/components/ResponsiveText"
import { RewardProgram } from "@/components/RewardsProgram"
import { ArrowForward } from "@mui/icons-material"
import React, { useEffect, useState } from "react"

interface BoostRewardsProps {
    heading: {
        head: string
        month: {
            a: string
            b: string
            c: string
            d: string
        }
    }
    details: {
        a: string
        b: string
        c: string
        d: string
        e: string
    }
    rewardProgram: {
        heading: string
        follow: {
            text: string
            clientTwitterAcct: string
            button: string
        }
        post: {
            text: string
            button: string
        }
        verify: {
            placeholder: string
            button: string
        }
        sign: {
            text: string
            button: string
        }
        footer: string
    }
    launchDate: string
    footer: string
    navbar: {
        logo: string
        buttonText: string
    }
}

interface RewardsData {
    rewardsData: BoostRewardsProps
}

type Value = {
    a: number
    b: number
    month: string
}

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

const BoostRewardsPage: React.FC<RewardsData> = ({ rewardsData }) => {
    const [value, setValue] = useState<Value>({ a: 1, b: 0, month: "" })
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)

        const currentMonth = new Date().getMonth() // getMonth() returns 0 for January, 1 for February, etc.
        const currentMonthName = monthNames[currentMonth]

        switch (currentMonth) {
            // case 9: // October
            // 	setValue({
            // 		a: 3,
            // 		b: 0,
            // 		month: currentMonthName,
            // 	});
            // 	break;
            // case 10: // November
            // 	setValue({
            // 		a: 2,
            // 		b: 0,
            // 		month: currentMonthName,
            // 	});
            // 	break;
            // case 11: // December
            // 	setValue({
            // 		a: 1,
            // 		b: 5,
            // 		month: currentMonthName,
            // 	});
            // 	break;
            default:
                setValue({
                    a: 3,
                    b: 0,
                    month: currentMonthName
                })
                break
        }
    }, [])

    if (!isClient) {
        // Return a fallback while we wait for the client-side rendering to take over
        return null
    }

    return (
        <Layout>
            <Navbar
                logo={rewardsData.navbar.logo}
                buttonText={rewardsData.navbar.buttonText}
                location="rewards"
            />

            <ResponsiveHeader className="col-start-3 col-end-4 row-start-4 row-end-5 font-[600]">
                {rewardsData.heading.head} x
                <span className="bg-black text-white inline">{value.a}</span>
                {value.b !== 0 && (
                    <span className="inline">
                        .<span className="bg-black text-white inline">{value.b}</span>
                    </span>
                )}
                !
            </ResponsiveHeader>

            <div className="col-start-3 col-end-7 row-start-5 row-end-5 lg:col-end-4 lg:row-end-6">
                <p className="mb-3">{rewardsData.details.a}</p>
                <div className="mb-3 p">
                    {rewardsData.heading.month.a}{" "}
                    <p className="font-bold inline">{value.month} 22</p>{" "}
                    {rewardsData.heading.month.b}
                    <Dots space={5} height={10} weight={10} style="justify-center items-center" />
                    {rewardsData.heading.month.c} x{value.a}
                    {value.b !== 0 && <span className="inline">.{value.b}</span>}{" "}
                    {rewardsData.heading.month.d}
                </div>
                <div className="mb-2 p">
                    {rewardsData.details.b}
                    <ArrowForward />
                </div>
                <div className="mb-2 p">
                    {rewardsData.details.c}
                    <Dots space={5} height={10} weight={10} style="justify-center items-center" />
                    {rewardsData.details.d}
                </div>
                <p>{rewardsData.details.e}</p>
            </div>

            <ResponsiveDiv className=" col-end-7 row-start-6 col-start-6 lg:row-start-5 row-end-6">
                <RewardProgram rewardsdata={rewardsData.rewardProgram} />
            </ResponsiveDiv>

            <div
                className={`mb-1 col-start-3 col-end-7 row-start-6 row-end-9 flex justify-center items-center flex-col`}>
                <CountdownTimer launchDate={rewardsData.launchDate} />
                <p className=" text-center mt-2">{rewardsData.footer}</p>
            </div>
        </Layout>
    )
}

export default BoostRewardsPage
