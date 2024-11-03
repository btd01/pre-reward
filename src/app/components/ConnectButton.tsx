import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function ConnectButtonComponent({
    paddingValue,
    buttonText
}: {
    paddingValue: string
    buttonText: string
}) {
    return (
        <ConnectButton.Custom>
            {({ account, openConnectModal, openAccountModal, mounted }) => {
                const connected = mounted && account
                return (
                    <button
                        onClick={
                            connected
                                ? openAccountModal // If connected, show the account modal
                                : openConnectModal // Otherwise, open the connect modal
                        }
                        style={{
                            background: "linear-gradient(to right, #ef4444, #ec4899, #ef4444)",
                            color: "#fff",
                            padding: paddingValue,
                            borderRadius: "10px"
                        }}>
                        {connected
                            ? `${account.displayName}` // Display the wallet address if connected
                            : buttonText}
                    </button>
                )
            }}
        </ConnectButton.Custom>
    )
}
