import { getAddresses, TOKEN_DECIMALS, DEFAULD_NETWORK } from "../../../constants";
import { useSelector } from "react-redux";
import CartIcon from "../../../assets/icons/cart.png";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { IReduxState } from "../../../store/slices/state.interface";
import "../button-styles.scss";
import "./buy-button.scss";

function BuyButton() {
    const networkID = useSelector<IReduxState, number>(state => {
        return (state.app && state.app.networkID) || DEFAULD_NETWORK;
    });

    const addresses = getAddresses(networkID);

    const NCTR_ADDRESS = addresses.NCTR_ADDRESS;

    const isVerySmallScreen = useMediaQuery("(max-width: 600px)");

    const clickFunc = () => {
        window.open(`https://traderjoexyz.com/trade?outputCurrency=${NCTR_ADDRESS}`, "_blank");
    };

    return (
        <div>
            {!isVerySmallScreen ? (
                ""
            ) : (
                <div className="time-menu-root" onClick={clickFunc}>
                    <div className="time-menu-btn">{!isVerySmallScreen ? "" : <img alt="" width="20" src={CartIcon} />}</div>
                </div>
            )}
        </div>
    );
}

export default BuyButton;
