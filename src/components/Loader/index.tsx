import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Audio, Triangle } from "react-loader-spinner";

import "./loader.scss";

function Loader() {
    return (
        <div className="loader-wrap">
            <Triangle height="100" width="100" color="grey" ariaLabel="getting ready to BLOOM" />
        </div>
    );
}

export default Loader;
