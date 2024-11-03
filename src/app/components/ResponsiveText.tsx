/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react"

interface ResponsiveHeaderProps {
    children: React.ReactNode
    className?: string
}

const ResponsiveHeader: React.FC<ResponsiveHeaderProps> = ({ children, className }) => {
    // Changed: Added maxFontSize and minFontSize constants
    const MAX_FONT_SIZE = 55
    const MIN_FONT_SIZE = 33

    const [fontSize, setFontSize] = useState<number>(MAX_FONT_SIZE)
    const headerRef = useRef<HTMLHeadingElement>(null)

    // Changed: Simplified overflow check function to calculate optimal font size
    const calculateOptimalFontSize = () => {
        if (!headerRef.current) return

        const element = headerRef.current
        let currentSize = MAX_FONT_SIZE

        const isOverflowing =
            element.scrollWidth > element.clientWidth ||
            element.scrollHeight > element.clientHeight ||
            element.clientWidth > window.innerWidth ||
            element.scrollWidth > document.body.clientWidth ||
            window.innerWidth > document.body.clientWidth

        // If overflowing, calculate the optimal size
        if (isOverflowing) {
            // Changed: Modified ratio calculation to be less aggressive
            const widthRatio = element.clientWidth / element.scrollWidth
            const heightRatio = element.clientHeight / element.scrollHeight
            const ratio = Math.min(widthRatio, heightRatio)

            // Changed: Adjusted scaling factor to be more conservative
            // Using square root to make the reduction more gradual
            // and adding a scaling factor of 0.8 to prevent over-reduction
            const adjustedRatio = Math.sqrt(ratio) * 0.8

            currentSize = Math.max(Math.floor(MAX_FONT_SIZE * (0.2 + adjustedRatio)), MIN_FONT_SIZE)
            if (currentSize > fontSize + 3 || currentSize < fontSize - 3) setFontSize(currentSize)
        }
    }

    // Changed: Simplified useEffect hooks to use new calculation
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => calculateOptimalFontSize())
        if (headerRef.current) {
            resizeObserver.observe(headerRef.current)
        }

        return () => {
            if (headerRef.current) {
                resizeObserver.unobserve(headerRef.current)
            }
        }
    }, [fontSize])

    useEffect(() => {
        const handleResize = () => calculateOptimalFontSize()
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [fontSize])

    useEffect(() => {
        calculateOptimalFontSize()
    }, [children])

    return (
        <div
            ref={headerRef}
            className={"h2 " + className}
            style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: `${fontSize}px`,
                lineHeight: `${fontSize + 10}px`
            }}>
            {children}
        </div>
    )
}

export default ResponsiveHeader
