import { CircularProgress } from "@mui/material"
import homeStyles from "../../styles/HomeStyle/HomeStyle"

const Spinner = () => {
    return (
        <div style={homeStyles.spinnerStyle}>
                <div style={{ padding: '20px' }}>
                    <CircularProgress style={{ color: 'secondary' }} />
                </div>
        </div>
    )
}

export default Spinner