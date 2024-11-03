import { CountUpTimer } from "@/components/CountUpTimer"
import Dots from "@/components/Dots"
import Layout from "@/components/Layout"
import Navbar from "@/components/Navbar"
import ResponsiveHeader from "@/components/ResponsiveText"
import { useState } from "react"

import { useRouter } from "../../i18n/routing"

// Interface for the props
interface HomeProps {
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

interface HomePageProps {
    data: HomeProps
}

function Home({ data }: HomePageProps): JSX.Element {
    const router = useRouter()
    const countDownSubheadings = [data.countUpTimer.subheading.a, data.countUpTimer.subheading.b]

    const subHeadingA = data.subheading.a.split("\n")
    const subHeadingB = data.subheading.b.split("\n")

    // Structure each subheading as an object with `firstLine` and `otherLines`
    const subheadings = [
        {
            firstLine: subHeadingA[0], // First line as a paragraph
            otherLines: subHeadingA.slice(1) // Remaining lines as list items
        },
        {
            firstLine: subHeadingB[0],
            otherLines: subHeadingB.slice(1)
        }
    ]

    const [text] = useState<number>(0)

    const handleRoute = () => {
        router.push("/rewards")
    }

    return (
        <Layout>
            <Navbar
                logo={data.navbar.logo}
                buttonText={data.navbar.buttonText}
                location=""
                noWallet={true}
            />

            <main className="col-start-3 col-end-7 row-start-4 row-end-6 flex justify-start items-center flex-col text-center">
                <div className="w-full max-w-[415px]">
                    <ResponsiveHeader className="inline-block pb-4">
                        {data.heading.a} {data.heading.b} {data.heading.c}
                    </ResponsiveHeader>
                </div>

                <div className=" max-w-lg">
                    <p className="mb-1">{subheadings[text].firstLine}</p>

                    {subheadings[text].otherLines.map((line, index) => (
                        <div className="p" key={index}>
                            {line}
                            <Dots space={8} height={13} weight={13} style="ps-2" colour="" />
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleRoute}
                    className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg mt-5">
                    {data.buttonText}
                </button>
            </main>

            <div className="col-start-3 col-end-7 row-start-6 row-end-7">
                <CountUpTimer subheading={countDownSubheadings[text]} />
            </div>
        </Layout>
    )
}

export default Home
