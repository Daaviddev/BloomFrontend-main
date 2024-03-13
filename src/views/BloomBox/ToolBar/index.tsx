import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import FlowerButton from "./flowerButton";
import "./toolbar.scss";
import { DRAWER_WIDTH, TRANSITION_DURATION } from "../../../constants/style";
import { IFlowerInfoDetails } from "../../../store/slices/account-slice";

const useStyles = makeStyles(theme => ({
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: "100%",
            padding: "20px 0 30px 0",
        },
        justifyContent: "flex-end",
        alignItems: "flex-end",
        background: "transparent",
        backdropFilter: "none",
        zIndex: 10,
    },
    topBar: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: TRANSITION_DURATION,
        }),
        marginLeft: DRAWER_WIDTH,
    },
    topBarShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: TRANSITION_DURATION,
        }),
        marginLeft: 0,
    },
}));

interface IToolBarProps {
    planets: IFlowerInfoDetails[];
}

function ToolBar({ planets }: IToolBarProps) {
    const classes = useStyles();

    const count = planets.length;

    let enabledCount = 0;

    let timestamp = 0;

    for (let index = 0; index < count; index++) {
        const actionTime = planets[index].lastProcessingTimestamp + planets[index].compoundDelay;
        if (timestamp < actionTime) timestamp = actionTime;
        if (actionTime <= Math.floor(Date.now() / 1000)) enabledCount++;
    }

    const isSmallScreen = useMediaQuery("(max-width: 710px)");

    // const actionTime = timestamp == 0 ? 0 : new Date(timestamp * 1000).toISOString().substring(11, 19);
    // const actionTime = timestamp == 0 ? "0" : new Date(timestamp * 1000).toISOString().substring(11, 19);

    return (
        <div className={`${classes.topBar} ${classes.topBarShift}`}>
            <AppBar position="sticky" className={classes.appBar} elevation={0}>
                {/* <Toolbar disableGutters className="dapp-topbar">
                    <div className="dapp-topbar-btns-wrap">
                        {/* {!isVerySmallScreen && <TimeMenu />} 
                        {count >= 0 && <FlowerButton action="create" />}
                        {enabledCount > 1 && <FlowerButton action="merge" />}
                        {!isSmallScreen && (
                            <>
                                {enabledCount == count && <FlowerButton action="compoundall" />}
                                {enabledCount == count && <FlowerButton action="claimall" />}
                            </>
                        )}
                    </div>
                </Toolbar>
                {isSmallScreen && enabledCount == count && (
                    <Toolbar disableGutters className="dapp-topbar">
                        <div className="dapp-topbar-btns-wrap">
                            {enabledCount == count && <FlowerButton action="compoundall" />}
                            {enabledCount == count && <FlowerButton action="claimall" />}
                        </div>
                    </Toolbar>
                )} */}
            </AppBar>
        </div>
    );
}

export default ToolBar;
