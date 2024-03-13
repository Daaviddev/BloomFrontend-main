import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { RTLProps } from "../../../../shared/prop-types/ReducerProps";
import "../../../../TeamManagement/teamManagement.scss";

const rows = [
    {
        id: "wallet",
        disablePadding: true,
        label: "Wallet",
    },
    {
        id: "name",
        disablePadding: true,
        label: "Name",
    },
    {
        id: "directs",
        disablePadding: false,
        label: "Directs",
    },
    {
        id: "deposits",
        disablePadding: false,
        label: "Deposits",
    },
    {
        id: "compounds",
        disablePadding: false,
        label: "Compounds",
    },
    {
        id: "depth",
        disablePadding: false,
        label: "Depth",
    },
];

const createSortHandler = (property, onRequestSort) => event => {
    onRequestSort(event, property);
};

const MatTableHead = ({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) => (
    <TableHead>
        <TableRow>
            <TableCell padding="checkbox">
                <Checkbox
                    className={`material-table__checkbox marginepadding clor ${numSelected === rowCount && "material-table__checkbox--checked"}`}
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={numSelected === rowCount}
                    onChange={onSelectAllClick}
                />
            </TableCell>
            {rows.map(row => (
                <TableCell
                    className="material-table__cell material-table__cell--sort material-table__cell-right labelname1 marginepadding clor"
                    key={row.id}
                    padding={row.disablePadding ? "none" : "none"}
                    sortDirection={orderBy === row.id ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === row.id}
                        direction={order}
                        onClick={createSortHandler(row.id, onRequestSort)}
                        className="material-table__sort-label clor"
                        color="white"
                        dir="ltr"
                    >
                        <p className="labelname1 textLeft clor">{row.label}</p>
                    </TableSortLabel>
                </TableCell>
            ))}
        </TableRow>
    </TableHead>
);

MatTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default MatTableHead;
