"use client"

import PriceStabilityPage from "@/pages/AnswerPage"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

interface AnswerData {
    version: {
        [key: string]: {
            heading: string
            subheading: string
            details: {
                a: string
                b: string
            }
            buttonText: string
            post: string
        }
    }
    navbar: {
        logo: string
        buttonText: string
    }
}

export default function AnswerPage() {
    const t = useTranslations()
    const [option, setOption] = useState<number>(0)
    const searchParams = useSearchParams()

    useEffect(() => {
        const selectedOption = Number(searchParams.get("option"))

        setOption(selectedOption)
    }, [searchParams, t])

    const answerData: AnswerData = {
        version: {
            [option]: {
                heading: t(`answer.version.${option}.heading`),
                subheading: t(`answer.version.${option}.subheading`),
                details: {
                    a: t(`answer.version.${option}.details.a`),
                    b: t(`answer.version.${option}.details.b`)
                },
                buttonText: t(`answer.version.${option}.buttonText`),
                post: t(`answer.version.${option}.post`)
            },
            default: {
                heading: "YES",
                subheading:
                    "Better price stability to your national currency is a very important function of a new super-stable.",
                details: {
                    a: "The new",
                    b: "is @BetterThanDollar when the price stability towards my national currency is  to that offered by the many USD-pegged tokens."
                },
                buttonText: "Post",
                post: "New super stablecoin BetterThanDollar is on the horizon!\nIt's the first coin to provide better international price stability than any USD-pegged coin. 🌍\nDo as I do: Follow here and share the post about a solution better than US$ 🔴🔴🔴 is coming."
            }
        },
        navbar: {
            logo: t("answer.navbar.logo"),
            buttonText: t("answer.navbar.buttonText")
        }
    }

    return (
        <PriceStabilityPage
            navbar={answerData.navbar}
            option={option}
            data={answerData.version[option] || answerData.version.default}
        />
    )
}
