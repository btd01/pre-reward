"use client"

// components/Layout.tsx
import Dots from "@/components/Dots"
import LanguageIcon from "@mui/icons-material/Language"
import { InputBase, MenuItem, Paper, Select, SelectChangeEvent } from "@mui/material"
import { styled } from "@mui/system"
import { useLocale } from "next-intl"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import ConnectButtonComponent from "./ConnectButton"

interface NavbarProps {
    logo: string
    buttonText: string
    location: string
    noWallet?: boolean
}

const Navbar = ({ logo, buttonText, location, noWallet }: NavbarProps) => {
    const router = useRouter()
    const localActive = useLocale()
    const [width, setWidth] = useState(0)

    const [isOpen, setIsOpen] = useState(false)

    const paddingValue = width < 550 ? "10px 14px" : "10px 20px"

    // Customizing the InputBase to remove the border and control styling
    const CustomSelect = styled(Select)(({}) => ({
        ".MuiSelect-icon": {
            color: "red", // Change icon color to red
            paddingLeft: "2px", // Add space between value and icon
            transform: "rotate(0deg) !important" // Reset rotation
        },
        "& .MuiOutlinedInput-notchedOutline": {
            border: "none" // Remove border
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none" // Remove hover border (if applicable)
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none" // Remove focused border (if applicable)
        },

        "& .MuiInputBase-input": {
            paddingRight: "47px !important"
            // padding: "4px 0 4px !important",
        }
    }))

    // const customMenuProps = {
    // 	PaperProps: {
    // 		style: {
    // 			backgroundColor:
    // 				"rgba(255, 255, 255, 0.8)",
    // 			borderRadius: "14px",
    // 		},
    // 	},
    // };

    // Custom MenuItem with padding and alignment
    const CustomMenuItem = styled(MenuItem)({
        paddingTop: "0px !important",
        paddingBottom: "0px !important",
        justifyContent: "end !important",
        alignItems: "end !important",
        "&.Mui-selected": {
            backgroundColor: "white !important" // Selected background color
        }
    })

    // Custom Paper for Menu styling
    const CustomPaper = styled(Paper)({
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "14px !important"
    })

    const customMenuProps = {
        PaperProps: {
            component: CustomPaper
        }
    }

    const onSelectChange = (event: SelectChangeEvent<unknown>) => {
        const nextLocale = event.target.value

        router.replace(`/${nextLocale}/${location}`) // Update locale
    }

    useEffect(() => {
        setWidth(document.documentElement.scrollWidth)
    }, [])

    return (
        <nav className="col-start-2 col-end-8 row-start-3 row-end-4 overflow-visible">
            <div className="w-full  flex flex-row justify-between">
                {width < 550 ? (
                    <div className="flex flex-col">
                        <Dots space={9} height={11} weight={11} style="" colour="" />
                        <Link href="/">
                            <p>{logo}</p>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <Dots space={9} height={10} weight={10} style="" colour="" />
                        <Link href="/">
                            <p>{logo}</p>
                        </Link>
                    </div>
                )}

                <div className={`flex items-center space-x-1 md:space-x-4 `}>
                    <CustomSelect
                        value={width > 550 ? localActive : undefined}
                        onChange={onSelectChange}
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        onOpen={() => setIsOpen(true)}
                        MenuProps={customMenuProps}
                        IconComponent={LanguageIcon}
                        input={<InputBase />}>
                        <CustomMenuItem
                            value="en"
                            style={{
                                color: localActive === "en" ? "red" : "inherit"
                            }}>
                            English
                        </CustomMenuItem>
                        <CustomMenuItem
                            value="pt"
                            style={{
                                color: localActive === "pt" ? "red" : "inherit"
                            }}>
                            Portuguese
                        </CustomMenuItem>
                        <CustomMenuItem
                            value="zh"
                            style={{
                                color: localActive === "zh" ? "red" : "inherit"
                            }}>
                            Mandarin
                        </CustomMenuItem>
                        <CustomMenuItem
                            value="hi"
                            style={{
                                color: localActive === "hi" ? "red" : "inherit"
                            }}>
                            Hindi
                        </CustomMenuItem>
                        <CustomMenuItem
                            value="ru"
                            style={{
                                color: localActive === "ru" ? "red" : "inherit"
                            }}>
                            Russian
                        </CustomMenuItem>
                    </CustomSelect>

                    {!noWallet && (
                        <ConnectButtonComponent
                            paddingValue={`${paddingValue}`}
                            buttonText={`${buttonText}`}
                        />
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
