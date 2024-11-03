import { useEffect, useRef, useState } from "react"

interface OverflowDivProps {
    children: React.ReactNode
    className?: string
}

const ResponsiveDiv: React.FC<OverflowDivProps> = ({ children, className }) => {
    const [marginBottom, setmarginBottom] = useState<number>(0)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const checkOverflow = () => {
            if (containerRef.current) {
                const element = containerRef.current
                const isOverflowing =
                    element.scrollHeight > element.clientHeight ||
                    element.scrollWidth > element.clientWidth

                if (isOverflowing) {
                    setmarginBottom(350)
                } else {
                    setmarginBottom(0) // Reset margin if no overflow
                }
            }
        }

        checkOverflow()
        window.addEventListener("resize", checkOverflow) // Re-check on window resize

        return () => {
            window.removeEventListener("resize", checkOverflow)
        }
    }, [children, marginBottom])

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                marginBottom: `${marginBottom}px`,
                transition: "margin-top 0.3s ease"
            }}>
            {children}
        </div>
    )
}

export default ResponsiveDiv
