import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FilterListIcon from "mdi-react/FilterListIcon";

const MatTableFilterButton = ({ onRequestSort }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSort = property => event => {
        onRequestSort(event, property);
        handleClose();
    };

    return (
        <div>
            <IconButton className="material-table__toolbar-button clor" aria-owns={anchorEl ? "simple-menu" : null} aria-haspopup="true" onClick={handleClick}>
                <FilterListIcon />
            </IconButton>
            <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} className="material-table__filter-menu ">
                <MenuItem onClick={handleSort("wallet")} className="material-table__filter-menu-item">
                    Wallet
                </MenuItem>
                <MenuItem onClick={handleSort("name")} className="material-table__filter-menu-item">
                    Name
                </MenuItem>
                <MenuItem onClick={handleSort("directs")} className="material-table__filter-menu-item">
                    Directs
                </MenuItem>
                <MenuItem onClick={handleSort("deposits")} className="material-table__filter-menu-item">
                    Deposits
                </MenuItem>
                <MenuItem onClick={handleSort("depth")} className="material-table__filter-menu-item">
                    Depth
                </MenuItem>
            </Menu>
        </div>
    );
};

MatTableFilterButton.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
};

export default MatTableFilterButton;
