import WhatMakesClient from "@/pages/QuestionnarePage"
import { useTranslations } from "next-intl"

interface QuestionnaireData {
    heading: {
        a: string
        b: string
    }
    information: {
        a: string
        b: string
        list: {
            a: string
            b: string
            c: string
            d: string
        }
        c: string
    }
    options: string[]
    navbar: {
        logo: string
        buttonText: string
    }
}

// Fetching data directly in the server component
export default function WhatMakesPage() {
    const t = useTranslations("") // Initialize translations

    const questionnaireData: QuestionnaireData = {
        heading: {
            a: t("questionnaire.heading.a"),
            b: t("questionnaire.heading.b")
        },
        information: {
            a: t("questionnaire.information.a"),
            b: t("questionnaire.information.b"),
            list: {
                a: t("questionnaire.information.list.a"),
                b: t("questionnaire.information.list.b"),
                c: t("questionnaire.information.list.c"),
                d: t("questionnaire.information.list.d")
            },
            c: t("questionnaire.information.c")
        },
        options: [
            t("questionnaire.options.0"),
            t("questionnaire.options.1"),
            t("questionnaire.options.2"),
            t("questionnaire.options.3")
        ],
        navbar: {
            logo: t("questionnaire.navbar.logo"),
            buttonText: t("questionnaire.navbar.buttonText")
        }
    }

    return (
        <WhatMakesClient
            heading={questionnaireData.heading}
            information={questionnaireData.information}
            options={questionnaireData.options}
            navbar={questionnaireData.navbar}
        />
    )
}
