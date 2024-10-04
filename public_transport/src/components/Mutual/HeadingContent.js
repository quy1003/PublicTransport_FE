import homeStyles from "../../styles/HomeStyle/HomeStyle"
import RoutingDetailStyle from "../../styles/RoutingStyle/RoutingDetailStyle"


const HeadingContent = (props) => {
    
    return (
        <div style={RoutingDetailStyle.divHeading}>
                <h1 style={homeStyles.detailHeading}>
                    {props.title}
                </h1>
        </div>
    )
}

export default HeadingContent