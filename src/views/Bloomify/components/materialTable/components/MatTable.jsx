import React, { useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import MatTableHead from "./MatTableHead";
import MatTableToolbar from "./MatTableToolbar";
import "../../../../TeamManagement/teamManagement.scss";

let counter = 0;

const createData = (id, wallet, name, directs, deposits, compounds, depth) => {
    counter += 1;
    return {
        id: counter,
        wallet,
        name,
        directs,
        deposits,
        compounds,
        depth,
    };
};

const createDataSort = (id, wallet, name, directs, deposits, compounds, depth) => {
    counter += 1;
    return {
        id: counter,
        wallet,
        name,
        directs,
        deposits,
        compounds,
        depth,
    };
};

const getSorting = (order, orderBy) => {
    if (order === "desc") {
        return (a, b) => {
            if (a[orderBy] < b[orderBy]) {
                return -1;
            }
            if (a[orderBy] > b[orderBy]) {
                return 1;
            }
            return 0;
        };
    }
    return (a, b) => {
        if (a[orderBy] > b[orderBy]) {
            return -1;
        }
        if (a[orderBy] < b[orderBy]) {
            return 1;
        }
        return 0;
    };
};

const MatTable = () => {
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("calories");
    const [selected, setSelected] = useState(new Map([]));
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    let [data, setData] = useState([
        createData(1, "0xoo", "Pelton", 1, 50, 1, 1),
        createData(2, "0xoo", "ExpeditionDefi", 2, 100, 2, 2),
        createData(3, "0xoo", "Horde", 3, 200, 3, 3),
        createData(4, "0xoo", "Grape", 4, 350, 2, 2),
        createData(5, "0xoo", "CommunityWallet(CW)", 5, 450, 2, 2),
        createData(6, "0xoo", "Channel4News", 6, 550, 2, 2),
        createData(7, "0xoo", "BigMoose(BMB)", 6, 550, 2, 2),
        createData(8, "0xoo", "BlockChainBabes", 6, 550, 2, 2),
        createData(9, "0xoo", "Jake-Crypto", 6, 550, 2, 2),
        createData(10, "0xoo", "LiquidCapital", 6, 550, 2, 2),
        createData(11, "0xoo", "Exy-Crypto", 6, 550, 2, 2),
        createData(12, "0xoo", "BloomVerse(CVB)", 6, 550, 2, 2),
        createData(13, "0xoo", "BloomyFans", 6, 550, 2, 2),
        createData(14, "0xoo", "BlockChainBabes", 6, 550, 2, 2),
        createData(15, "0xoo", "BlockChainBabes", 6, 550, 2, 2),
    ]);

    const handleRequestSort = (event, property) => {
        const orderByTemp = property;
        let orderTemp = "desc";
        if (orderBy === property && order === "desc") {
            orderTemp = "asc";
        }
        setOrder(orderTemp);
        setOrderBy(orderByTemp);
    };

    const handleSelectAllClick = (event, checked) => {
        if (checked) {
            const newSelected = new Map();
            data.map(n => newSelected.set(n.id, true));
            setSelected(newSelected);
            return;
        }
        setSelected(new Map([]));
    };

    const handleClick = (event, id) => {
        const newSelected = new Map(selected);
        const value = newSelected.get(id);
        let isActive = true;
        if (value) {
            isActive = false;
        }
        newSelected.set(id, isActive);
        setSelected(newSelected);
    };

    const handleChangePage = (event, item) => {
        setPage(item);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(Number(event.target.value));
        setPage(0);
    };

    const handleDeleteSelected = () => {
        let copyData = [...data];
        for (let i = 0; i < [...selected].filter(el => el[1]).length; i += 1) {
            copyData = copyData.filter(obj => obj.id !== selected[i]);
        }
        setData(copyData);
        setSelected(new Map([]));
    };

    const isSelected = id => !!selected.get(id);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    let leader = 0;
    return (
        <Col className="teammanagementCol" md={12} lg={12}>
            <Card className="teamCard1">
                <CardBody className="dashboard__card-widget">
                    <div className="airdropFlex">
                        <div className="tableHeader">
                            <div></div>
                            <div className="card__title">
                                <h5 className="bold-text">LEADERBOARD</h5>
                            </div>
                            <MatTableToolbar numSelected={[...selected].filter(el => el[1]).length} handleDeleteSelected={handleDeleteSelected} onRequestSort={handleRequestSort} />
                        </div>
                        <div className="height100">
                            <div className="material-table__wrap">
                                <Table className="material-table">
                                    <MatTableHead
                                        numSelected={[...selected].filter(el => el[1]).length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={data.length}
                                    />
                                    <TableBody>
                                        {data
                                            .sort(getSorting(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map(d => {
                                                const select = isSelected(d.id);
                                                leader += 1;
                                                return (
                                                    <TableRow
                                                        className="material-table__row"
                                                        role="checkbox"
                                                        onClick={event => handleClick(event, d.id)}
                                                        aria-checked={select}
                                                        tabIndex={-1}
                                                        key={d.id}
                                                        selected={select}
                                                    >
                                                        <TableCell className="material-table__cell material-table__cell-right" padding="checkbox">
                                                            <p>{leader}</p>
                                                        </TableCell>
                                                        <TableCell
                                                            className="material-table__cell material-table__cell-right marginepadding"
                                                            component="th"
                                                            scope="row"
                                                            padding="none"
                                                        >
                                                            <p className="labelname1 textLeft">{d.wallet}</p>
                                                        </TableCell>
                                                        <TableCell
                                                            className="material-table__cell material-table__cell-right marginepadding"
                                                            component="th"
                                                            scope="row"
                                                            padding="none"
                                                        >
                                                            <p className="labelname1 textLeft">{d.name}</p>
                                                        </TableCell>
                                                        <TableCell
                                                            className="material-table__cell material-table__cell-right marginepadding"
                                                            component="th"
                                                            scope="row"
                                                            padding="none"
                                                        >
                                                            <p className="labelname1 textLeft">{d.directs}</p>
                                                        </TableCell>
                                                        <TableCell
                                                            className="material-table__cell material-table__cell-right marginepadding"
                                                            component="th"
                                                            scope="row"
                                                            padding="none"
                                                        >
                                                            <p className="labelname1 textLeft">{d.deposits}</p>
                                                        </TableCell>
                                                        <TableCell
                                                            className="material-table__cell material-table__cell-right marginepadding"
                                                            component="th"
                                                            scope="row"
                                                            padding="none"
                                                        >
                                                            <p className="labelname1 textLeft">{d.compounds}</p>
                                                        </TableCell>
                                                        <TableCell
                                                            className="material-table__cell material-table__cell-right marginepadding"
                                                            component="th"
                                                            scope="row"
                                                            padding="none"
                                                        >
                                                            <p className="labelname1 textLeft"> {d.depth}</p>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 49 * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                            <div>
                                <TablePagination
                                    component="div"
                                    className="material-table__pagination clor"
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    backIconButtonProps={{ "aria-label": "Previous Page" }}
                                    nextIconButtonProps={{ "aria-label": "Next Page" }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    rowsPerPageOptions={[5, 15, 25, 50, 100]}
                                    dir="ltr"
                                    SelectProps={{
                                        inputProps: { "aria-label": "rows" },
                                        native: true,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default MatTable;
