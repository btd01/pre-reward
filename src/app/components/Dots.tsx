"use client"

import Link from "next/link"

interface DotsProps {
    space?: number
    height: number
    weight: number
    style?: string
    colour?: string
}

export default function Dots({
    space,
    height,
    weight,
    style = "",
    colour = ""
}: DotsProps): JSX.Element {
    return (
        <Link
            href="/"
            className={`inline-flex ps-0.5 items-center min-h-[10px] min-w-[50px] ${style}`}
            style={space ? { gap: `${space}px` } : {}}>
            {[0, 1, 2].map((index) => (
                <div
                    key={index}
                    className={`bg-pink-500 rounded-full ${colour}`}
                    style={{
                        width: `${weight}px`,
                        height: `${height}px`
                    }}></div>
            ))}
        </Link>
    )
}
