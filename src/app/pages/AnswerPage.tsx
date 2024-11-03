"use client"

// pages/price-stability.tsx
import Dots from "@/components/Dots"
import Layout from "@/components/Layout"
import Navbar from "@/components/Navbar"
import ResponsiveHeader from "@/components/ResponsiveText"
import React from "react"

import { useRouter } from "../../i18n/routing"

// Define interfaces for the data structure
interface PriceStabilityData {
    heading: string
    subheading: string
    details: {
        a: string
        b: string
    }
    buttonText: string
    post: string
}

interface PriceStabilityProps {
    data: PriceStabilityData
    option: number
    navbar: {
        logo: string
        buttonText: string
    }
}

const PriceStabilityPage: React.FC<PriceStabilityProps> = ({ data, option, navbar }) => {
    const router = useRouter()

    const handlePost = () => {
        router.push(`/rewards?posted=true`)
        const twitterUrl = "https://twitter.com/intent/tweet"
        const postHref = `${twitterUrl}?text=${encodeURIComponent(data.post)}`
        window.open(postHref, "_blank")
    }

    return (
        <Layout>
            <Navbar
                logo={navbar.logo}
                buttonText={navbar.buttonText}
                location={`answer?option=${option}`}
            />
            <div className="col-start-3 col-end-7 row-start-3 row-end-7 text-center flex flex-col items-center justify-center">
                <h2 className="font-semibold">{data.heading}</h2>
                <ResponsiveHeader className="font-semibold mb-8">
                    {data.subheading}
                </ResponsiveHeader>

                <div className="mb-8 max-w-[500px]">
                    <div className="p inline">
                        {data.details.a}{" "}
                        <Dots
                            space={5}
                            height={10}
                            weight={10}
                            style="items-center justify-center"
                            colour=""
                        />{" "}
                        {data.details.b}
                    </div>
                </div>

                <button
                    onClick={handlePost}
                    className="p bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold px-6 py-2 rounded-lg">
                    {data.buttonText}
                </button>
            </div>
        </Layout>
    )
}

export default PriceStabilityPage
