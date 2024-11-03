// src/app/rewards/page.tsx (Server Component)
import BoostRewardsPage from "@/pages/RewardsPage"
import { useTranslations } from "next-intl"

interface RewardsData {
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

export default function RewardsPage() {
    const t = useTranslations("") // Initialize translations

    // Constructing the rewardsData object
    const rewardsData: RewardsData = {
        heading: {
            head: t("rewards.heading.head"),
            month: {
                a: t("rewards.heading.month.a"),
                b: t("rewards.heading.month.b"),
                c: t("rewards.heading.month.c"),
                d: t("rewards.heading.month.d")
            }
        },
        details: {
            a: t("rewards.details.a"),
            b: t("rewards.details.b"),
            c: t("rewards.details.c"),
            d: t("rewards.details.d"),
            e: t("rewards.details.e")
        },
        rewardProgram: {
            heading: t("rewards.rewardProgram.heading"),
            follow: {
                text: t("rewards.rewardProgram.follow.text"),
                clientTwitterAcct: t("rewards.rewardProgram.follow.clientTwitterAcct"),
                button: t("rewards.rewardProgram.follow.button")
            },
            post: {
                text: t("rewards.rewardProgram.post.text"),
                button: t("rewards.rewardProgram.post.button")
            },
            verify: {
                placeholder: t("rewards.rewardProgram.verify.placeholder"),
                button: t("rewards.rewardProgram.verify.button")
            },
            sign: {
                text: t("rewards.rewardProgram.sign.text"),
                button: t("rewards.rewardProgram.sign.button")
            },
            footer: t("rewards.rewardProgram.footer")
        },
        launchDate: t("rewards.launchDate"),
        footer: t("rewards.footer"),
        navbar: {
            logo: t("rewards.navbar.logo"),
            buttonText: t("rewards.navbar.buttonText")
        }
    }

    // Render the client-side component with fetched data as props
    return <BoostRewardsPage rewardsData={rewardsData} />
}
