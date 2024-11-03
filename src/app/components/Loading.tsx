import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

export default function Loading(): JSX.Element {
    return (
        <div className="absolute top-[40%] left-[50%] ">
            <Box sx={{ display: "flex" }}>
                <CircularProgress color="inherit" />
            </Box>
        </div>
    )
}
