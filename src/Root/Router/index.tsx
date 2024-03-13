import { Route, Redirect, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAddress, useWeb3Context } from "../../hooks";
import { loadAppDetails } from "../../store/slices/app-slice";
import { loadAccountDetails } from "../../store/slices/account-slice";
import { IReduxState } from "../../store/slices/state.interface";
import Loading from "../../components/Loader";
import ViewBase from "../../components/ViewBase";
import { Bloomify, NotFound, BloomBox, TeamManagement, Mint, Landing, Swap } from "../../views";

export default () => (
    <div>
        <ViewBase>
            <Switch>
                <Route exact path="/bloomify/:id">
                    <Bloomify />
                </Route>
                <Route exact path="/bloomify">
                    <Bloomify />
                </Route>
                <Route exact path="/swap">
                    <Swap />
                </Route>

                <Route exact path="/teammanagement">
                    <TeamManagement />
                </Route>

                <Route exact path="/bloombox">
                    <BloomBox />
                </Route>

                <Route exact path="/mint">
                    <Mint />
                </Route>
                <Route component={NotFound} />
            </Switch>
        </ViewBase>
    </div>
);
