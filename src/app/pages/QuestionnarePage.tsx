"use client"

import Dots from "@/components/Dots"
import Information from "@/components/Info"
import Layout from "@/components/Layout"
import Navbar from "@/components/Navbar"
import Options from "@/components/Options"
import ResponsiveHeader from "@/components/ResponsiveText"

// Interface for Information data structure
interface Information {
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

// Main props interface for the client component
interface WhatMakesProps {
    heading: {
        a: string
        b: string
    }
    information: Information
    options: Array<string>
    navbar: {
        logo: string
        buttonText: string
    }
}

// Client component to render the page layout
const WhatMakesClient = ({ heading, information, options, navbar }: WhatMakesProps) => {
    return (
        <Layout>
            <Navbar logo={navbar.logo} buttonText={navbar.buttonText} location="questionnare" />
            <div className="h2 font-bold inline-flex flex-row w-full flex-wrap col-start-3 row-start-4 row-end-5 col-end-4 mb-10">
                <div className="w-full max-h-full">
                    <ResponsiveHeader className=" inline-flex flex-wrap justify-start items-center gap-x-2 w-full">
                        {heading.a}{" "}
                        <Dots
                            space={7}
                            height={20}
                            weight={20}
                            style="ps-0 inline-flex justify-center items-center mt-2 w-[70px]"
                            colour=""
                        />
                        {heading.b}
                        {"?"}
                    </ResponsiveHeader>
                </div>
            </div>

            <Information info={information} />
            <Options opt={options} />
        </Layout>
    )
}

export default WhatMakesClient
