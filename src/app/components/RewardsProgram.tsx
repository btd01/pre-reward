"use client"

import { extractUsernameAndTweetId } from "@/lib/utils"
import { callHasFollowedXAccount, callHasTwittedOnX } from "@/modules/twitter"
import { callUpdateUserWallet } from "@/modules/user"
import { TaskAlt } from "@mui/icons-material"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import Link from "next/link"
import { FormEvent, useEffect, useState } from "react"
import { useAccount, useSignMessage } from "wagmi"

import { useRouter } from "../../i18n/routing"
import Loading from "./Loading"

interface RewardProgramProps {
    rewardsdata: {
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
}

const errorMessages = {
    invalidTwitterUrl: "Please enter a valid Twitter URL",
    invalidTwitterUrl_2:
        "Please enter a valid tweet URL like https://x.com/username/status/tweetId",
    signMessageError: "Please verify your tweet first",
    twitterNotFollowed: "Please follow us to X first.",
    twitterNotPosted: "Please post on X first."
}

export const RewardProgram = ({ rewardsdata }: RewardProgramProps) => {
    const router = useRouter()
    const { address, isConnected } = useAccount() // Get wallet connection status
    const { openConnectModal } = useConnectModal()

    const [url, setUrl] = useState<string>("")
    const [err, setErr] = useState<string>()
    const [username, setUsername] = useState<string>()
    const [loading, setLoading] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [connectionTriggered, setConnectionTriggered] = useState(false)

    useEffect(() => {
        if (err) {
            setLoading(false)
            setTimeout(() => {
                setErr("")
            }, 6000)
        }
    }, [err])

    useEffect(() => {
        if (connectionTriggered && isConnected) {
            handlePostConnection() // Call the function after successful connection
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected, connectionTriggered])

    const { signMessage } = useSignMessage({
        mutation: {
            async onSuccess(_data: `0x${string}`) {
                setLoading(true)
                const result = await callUpdateUserWallet(username!, address!)
                if (result.error) setErr(result.error)
                else router.push("/finished")

                setLoading(false)
            },
            onError(error: Error) {
                console.error("Error signing message:", error)
            }
        }
    })

    const handlePostClick = () => {
        router.push("/questionnaire")
    }

    const handleVerifyClick = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        if (isVerified) return

        const { found, username, tweetId } = extractUsernameAndTweetId(url)
        if (!found) {
            return setErr(errorMessages.invalidTwitterUrl_2)
        }

        setLoading(true)
        setUsername(username)

        ///
        setLoading(false)
        setIsVerified(true)
        return
        ///
        try {
            const hasFollowed = await callHasFollowedXAccount(username)
            if (hasFollowed === false) {
                return setErr(errorMessages.twitterNotFollowed)
            }

            const hasTweeted = await callHasTwittedOnX(tweetId)
            if (hasTweeted === false) {
                return setErr(errorMessages.twitterNotPosted)
            }

            setIsVerified(true)
            setErr("")
        } catch (error) {
            setErr(`Error during verification: ${error}`)
            console.error("Error during verification:", error)
        }
        setLoading(false)
    }

    const handlePostConnection = async () => {
        if (address) {
            signMessage({
                message: "Hello from BetterThanDollar!"
            })
        }
    }

    const handleSignMessageClick = async () => {
        if (!isConnected) {
            if (openConnectModal) {
                openConnectModal() // Open the wallet connection modal
                setConnectionTriggered(true) // Mark that connection was triggered
            } else {
                console.error("Connect modal is not available")
            }
        } else {
            console.log("Wallet is already connected")
            handlePostConnection() // Directly handle connection if already connected
        }
    }

    return (
        <div className=" bg-gradient-to-r from-[rgb(104,65,121)] to-[rgb(65,54,98)] text-white rounded-[30px] w-full p-1">
            <div className="p-4 mx-auto rounded-[30px] h-full w-full bg-gradient-to-tr from-[rgb(92,33,65)]  to-[rgb(50,42,57)]">
                <p className="mb-4">{rewardsdata.heading}</p>

                {/* Follow */}
                <div className="flex items-center space-x-2 mb-2">
                    <h3 className="min-w-10 min-h-10 flex items-center justify-center bg-white text-black rounded-md">
                        1
                    </h3>
                    <p>{rewardsdata.follow.text}</p>
                    <Link
                        href={`https://x.com/${rewardsdata.follow.clientTwitterAcct}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p inline-block bg-gradient-to-r from-red-500 via-pink-500 to-red-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition duration-300 ease-in-out hover:shadow-lg">
                        {rewardsdata.follow.button}
                    </Link>
                </div>

                {/* Post */}
                <div className="flex items-center space-x-2 mb-3">
                    <h3 className="min-w-10 min-h-10 flex items-center justify-center bg-white text-black rounded-md">
                        2
                    </h3>
                    <p> {rewardsdata.post.text}</p>
                    <button
                        onClick={handlePostClick}
                        className="p inline-block bg-gradient-to-r from-red-500 via-pink-500 to-red-500 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm transition duration-300 ease-in-out hover:shadow-lg">
                        {rewardsdata.post.button}
                    </button>
                </div>

                {/* Tweet Link Input */}
                <form
                    className="flex items-center space-x-2 mb-3 ms-[48px]"
                    onSubmit={handleVerifyClick}>
                    <div className="relative flex-grow max-w-[430px]">
                        <input
                            type="text"
                            placeholder={rewardsdata.verify.placeholder}
                            value={url}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setUrl(e.target.value)
                            }
                            className=" border border-gray-300 rounded px-2 py-1.5 w-full pr-10 text-black text-sm"
                        />
                        {isVerified && (
                            <TaskAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 " />
                        )}
                    </div>
                    <button
                        type="submit"
                        className="p bg-gradient-to-r from-red-500 via-pink-500 to-red-500 hover:bg-pink-700 text-white px-4 py-[9px] rounded-lg text-sm">
                        {rewardsdata.verify.button}
                    </button>
                </form>

                {/* Step 3 */}
                <div className="flex items-center space-x-2 mb-2">
                    <h3 className="min-w-10 min-h-10 flex items-center justify-center bg-white text-black rounded-md">
                        3
                    </h3>
                    <p>{rewardsdata.sign.text}</p>
                    <button
                        onClick={() => {
                            if (isVerified) handleSignMessageClick()
                            else setErr(errorMessages.signMessageError)
                        }}
                        className="p bg-gradient-to-r from-red-500 via-pink-500 to-red-500 hover:bg-pink-700 text-white px-4 py-2 rounded-lg lg:w-[18rem]">
                        {rewardsdata.sign.button}
                    </button>
                </div>

                <p className=" mt-3">
                    {rewardsdata.footer.split("\n").map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </p>

                {loading && (
                    <div
                        className={`absolute h-[170vh] lg:h-screen inset-0 bg-black bg-opacity-50`}>
                        <Loading />
                    </div>
                )}

                {err && (
                    <div className="absolute px-4 py-2 rounded-xl bottom-4 right-4 bg-red-500 text-white font-semibold">
                        <div className="sticky">{err}</div>
                    </div>
                )}
            </div>
        </div>
    )
}
