"use client"

import Home from "@/pages/HomePage"
import { useTranslations } from "next-intl"

interface HomeData {
    heading: {
        a: string
        b: string
        c: string
    }
    subheading: {
        a: string
        b: string
    }
    buttonText: string
    countUpTimer: {
        subheading: {
            a: string
            b: string
        }
    }
    navbar: {
        logo: string
        buttonText: string
    }
}

export default function HomePage(): JSX.Element {
    const t = useTranslations("")
    const homeData: HomeData = {
        heading: {
            a: t("home.heading.a"),
            b: t("home.heading.b"),
            c: t("home.heading.c")
        },
        subheading: {
            a: t("home.subheading.a"),
            b: t("home.subheading.b")
        },
        buttonText: t("home.buttonText"),
        countUpTimer: {
            subheading: {
                a: t("home.countUpTimer.subheading.a"),
                b: t("home.countUpTimer.subheading.b")
            }
        },
        navbar: {
            logo: t("home.navbar.logo"),
            buttonText: t("home.navbar.buttonText")
        }
    }

    return <Home data={homeData} />
}
