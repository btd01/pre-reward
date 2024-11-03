"use client"

import { ArrowForward } from "@mui/icons-material"

interface InformationProps {
    info: {
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
}
export default function Information({ info }: InformationProps): JSX.Element {
    return (
        <div className="col-start-3 col-end-7 lg:col-end-4 row-start-5 row-end-6 lg:row-end-7 text-sm">
            <p className="mb-2">{info.a}</p>
            <p className="mb-2">{info.b}</p>
            <ul className="list-[upper-alpha] pl-6 mb-2">
                <li>{info.list.a}</li>
                <li>{info.list.b}</li>
                <li>{info.list.c}</li>
                <li>{info.list.d}</li>
            </ul>
            <br />
            <div className="inline p pb-10">
                {info.c}
                <ArrowForward />
            </div>
        </div>
    )
}
