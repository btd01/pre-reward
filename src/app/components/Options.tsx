"use client"

import { useRouter } from "../../i18n/routing"

interface OptionsProps {
    opt: Array<string>
}
export default function Options({ opt }: OptionsProps): JSX.Element {
    const router = useRouter()
    const handleQuestion = (option: number) => {
        //massive oppurtinity of fuckup fix refactor
        router.push(`/answer?option=${option}`)
    }

    return (
        <div className="flex col-start-3 lg:col-start-6 justify-center col-end-7 row-start-6 lg:row-start-5 row-end-8 lg:row-end-7">
            <div className="flex flex-col space-y-4 w-full max-w-[500px] lg:max-w-full ">
                {opt.map((option, index) => (
                    <button
                        key={option}
                        onClick={() => {
                            handleQuestion(index)
                        }}
                        className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-5 rounded-full text-lg font-semibold">
                        {option}
                    </button>
                ))}
            </div>
        </div>
    )
}
