import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, List } from "reactstrap";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import MatTableHead from "./MatTableHead";
import MatTableToolbar from "./MatTableToolbar";
import { useWeb3Context } from "src/hooks";
import "../../../teamManagement.scss";
import { airdropTeamNCTR, approveNCTR } from "../../../../../store/slices/teammanagement-slice";
import { useDispatch, useSelector } from "react-redux";
import { trim } from "../../../../../helpers/trim";

let counter = 0;

const createData = (id, wallet, directs, deposits, name, compounds, depth) => {
    counter += 1;
    return {
        id: counter,
        wallet,
        directs,
        deposits,
    };
};

const createDataSort = (id, wallet, directs, deposits, name, compounds, depth) => {
    counter += 1;
    return {
        id: counter,
        wallet,
        directs,
        deposits,
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

const optionsCampaign = [{ label: "Divide Budget", value: "divide" }];
const optionsDirects = [
    { label: "0", value: "0" },
    { label: "1", value: "1" },
    { label: "5", value: "5" },
    { label: "10", value: "10" },
];
const optionsDepth = [];
const optionsNet = [
    { label: "1+ $NCTR", value: "1" },
    { label: "50+ $NCTR", value: "50" },
    { label: "100+ $NCTR", value: "100" },
    { label: "250+ $NCTR", value: "250" },
    { label: "500+ $NCTR", value: "500" },
    { label: "1000+ $NCTR", value: "1000" },
    { label: "2000+ $NCTR", value: "2000" },
];
const optionsCompounds = [];

function MatTable({ downlines, nctrAmount }) {
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("calories");
    const [selected, setSelected] = useState(new Map([]));
    const [page, setPage] = useState(0);
    const [sellectedWallets, setSelectedWallets] = useState(0);
    const [slectedNumber, setSelectedNumber] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);
    let [data, setData] = useState([]);
    let [dataInitial, setDataInitial] = useState([]);

    const handleRequestSort = (event, property) => {
        const orderByTemp = property;
        let orderTemp = "desc";
        if (orderBy === property && order === "desc") {
            orderTemp = "asc";
        }
        setOrder(orderTemp);
        setOrderBy(orderByTemp);
    };
    const dispatch = useDispatch();

    const myGreeting = () => {
        if (downlines != undefined) {
            let newArr = data;
            if (downlines != undefined) {
                let getDownline = downlines.map(downline => {
                    newArr.push(createData(downline.id, downline[0], downline[1], downline[2]));
                });
            }
            setData(newArr);
            setDataInitial(newArr);
        }
    };
    useEffect(() => {
        myGreeting();
    }, []);

    const isSelected = id => !!selected.get(id);

    const handleSelectAllClick = (event, checked) => {
        if (checked) {
            const newSelected = new Map();
            data.map(n => newSelected.set(n.id, true));
            setSelected(newSelected);
            changeSetWallets(newSelected);
            return;
        }
        const selectedMap = new Map([]);
        setSelected(selectedMap);
        changeSetWallets(selectedMap);
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
        changeSetWallets(newSelected);
    };

    const changeSetWallets = newSelected => {
        let lisst = [];
        let isActive = false;
        let getSelected = data.map(d => {
            if (newSelected.get(d.id, isActive)) {
                lisst.push(d.wallet);
            }
        });

        setSelectedWallets(lisst.length);
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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    let downlineCount = 20;

    if (downlineCount > 0) {
        downlineCount = Number(data.length);
    }

    const fetchDownlines = async () => {};

    const [campaign, setValue] = React.useState("");
    const [directs, setValue2] = React.useState(0);
    const [depth, setValue3] = React.useState("");
    const [net, setValue4] = React.useState(1);
    const [compound, setValue5] = React.useState("");
    const [amountIn, setamountIn] = useState("0");

    let savedData = [];

    const handleChange = event => {
        setValue(event.target.value);
    };

    const handleChange2 = event => {
        setValue2(event.target.value);
    };

    const handleChange3 = event => {
        setValue3(event.target.value);
    };

    const handleChange4 = event => {
        setValue4(event.target.value);
    };

    const handleChange5 = event => {
        setValue5(event.target.value);
    };

    const handleFilterData = () => {
        let copyData = [...dataInitial];
        copyData = copyData.filter(obj => Number(obj.directs) >= Number(directs) && Number(obj.deposits >= Number(net)));
        setData(copyData);
    };

    const handleRefreshData = () => {
        setData(dataInitial);
    };

    const maxClickEvent = () => {
        setamountIn(trim(Number(nctrAmount), 2));
    };
    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();

    const handleChangeValue = value => {
        setamountIn(value);
    };

    const handleAirdrop = async () => {
        if (await checkWrongNetwork()) {
            return;
        } else {
            let lisst = [];
            let getSelected = data.map(d => {
                if (isSelected(d.id)) {
                    lisst.push(d.wallet);
                }
            });
            if (lisst.length > 0) {
                let amount = Number(amountIn);
                dispatch(airdropTeamNCTR({ lisst, amount, provider, address, networkID: chainID }));
            }
        }
    };

    const handleApprove = async () => {
        if (await checkWrongNetwork()) {
            return;
        } else {
            dispatch(approveNCTR({ provider, address, networkID: chainID }));
        }
    };

    return (
        <Col className="teammanagementCol2 flexCards2" md={12} lg={12}>
            <Card className="teamCard2 card flexCards1 ">
                <CardBody className="dashboard__card-widget">
                    <div className="airdropFlex">
                        <div className="tableHeader">
                            <div className="card__title">
                                <h5 className="bold-text">Downline Table</h5>
                            </div>
                            <MatTableToolbar numSelected={[...selected].filter(el => el[0]).length} handleDeleteSelected={handleDeleteSelected} onRequestSort={handleRequestSort} />
                        </div>
                        <div className="height101">
                            <div className="material-table__wrap">
                                <Table className="material-table">
                                    <MatTableHead
                                        numSelected={[...selected].filter(el => el[0]).length}
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
                                                            <Checkbox checked={select} className="material-table__checkbox marginepadding clor" />
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
                                                        ></TableCell>
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
                            <div className="bodySplit">
                                <TablePagination
                                    component="div"
                                    className="material-table__pagination clor break"
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    backIconButtonProps={{ "aria-label": "Previous Page" }}
                                    nextIconButtonProps={{ "aria-label": "Next Page" }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    rowsPerPageOptions={[5, 10, 15, Number(downlineCount)]}
                                    dir="ltr"
                                    SelectProps={{
                                        inputProps: { "aria-label": "rows" },
                                        native: true,
                                    }}
                                />
                                <div className="material-table__pagination newFlex">
                                    <div className="margin-right width50">
                                        {" "}
                                        <p className="clor textAlignLeft smallTexxt">SELECTED WALLETS : </p>
                                        <p className="clor textAlignLeft smallTexxt">AIRDROP PER WALLET : </p>
                                        <p className="clor textAlignLeft smallTexxt">TOTAL AIRDRIOP VALUE: </p>
                                    </div>
                                    <div className="margin-right width50">
                                        {" "}
                                        <p className="clor textAlignRight smallTexxt">{sellectedWallets}</p>
                                        <p className="clor textAlignRight smallTexxt">{Number(amountIn) > 0 && sellectedWallets > 0 ? trim(amountIn / sellectedWallets, 2) : 0}</p>
                                        <p className="clor textAlignRight smallTexxt">{amountIn}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flexOnFlex1">
                            <input className="getDownlineWallet doubleButton" type="submit" value="Airdrop" onClick={handleAirdrop} />
                            <input className="getDownlineWallet doubleButton" type="submit" value="Approve $NCTR" onClick={handleApprove} />
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card className="teamCard3 card flexCards1">
                <CardBody className="dashboard__card-widget1">
                    <div className="airdropFlex1">
                        <div className="tableHeader">
                            <div className="card__title">
                                <h5 className="bold-text">Filter Downlines</h5>
                            </div>
                        </div>
                        <div className="bodySplit">
                            <div className="blurMe">
                                {" "}
                                <label className="labelname">Wallet: </label>
                                <div className="fleex borrderr">
                                    <input className="getDownlineWallet input1" type="text" name="name" />
                                    <input className="getDownlineWallet1" type="submit" value="My" />
                                </div>
                            </div>
                            <div className="fleex additionalFlex">
                                <div className="setFlex">
                                    <label className="labelname">Campaign: </label>
                                    <select className="getDownlineWallet3 input1" value={campaign} onChange={handleChange}>
                                        {optionsCampaign.map(optionsCampaign => (
                                            <option value1={optionsCampaign.value}>{optionsCampaign.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="setFlex">
                                    <div className="valuesPad">
                                        <label className="labelname">Budget</label>
                                        <label className="labelname">{nctrAmount} $NCTR</label>
                                    </div>
                                    <div className="setFlex1 sto">
                                        <input
                                            name="price"
                                            type="number"
                                            placeholder="$NCTR"
                                            value={amountIn}
                                            className="getDownlineWallet osm input1"
                                            onChange={value => handleChangeValue(value.target.value ? value.target.value : "")}
                                        />
                                        <input className="getDownlineWallet dvs1" type="submit" value="Max" onClick={maxClickEvent} readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="fleex additionalFlex">
                                <div className="setFlex">
                                    <label className="labelname">Minimum Directs: </label>
                                    <select className="getDownlineWallet input1" value={directs} onChange={handleChange2}>
                                        {optionsDirects.map(optionsDirects => (
                                            <option value2={optionsDirects.value}>{optionsDirects.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="setFlex blurMeDaddy">
                                    <label className="labelname">Team Depth: </label>
                                    <select className="getDownlineWallet input1" value={depth} onChange={handleChange3}>
                                        {optionsDepth.map(optionsDepth => (
                                            <option value={optionsDepth.value}>{optionsDepth.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="fleex additionalFlex">
                                <div className="setFlex">
                                    <label className="labelname">Min. Net Deposit: </label>
                                    <select className="getDownlineWallet input1" value={net} onChange={handleChange4}>
                                        {optionsNet.map(optionsNet => (
                                            <option value={optionsNet.value}>{optionsNet.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="setFlex blurMeDaddy">
                                    <label className="labelname">Compounds (last 7 days): </label>
                                    <select className="getDownlineWallet input1" value={compound} onChange={handleChange5}>
                                        {optionsCompounds.map(optionsCompounds => (
                                            <option value={optionsCompounds.value}>{optionsCompounds.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flexOnFlex1">
                            <input className="getDownlineWallet doubleButton" type="submit" value="GET" onClick={handleFilterData} />
                            <input className="getDownlineWallet doubleButton" type="submit" value="REFRESH" onClick={handleRefreshData} />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
}

export default MatTable;
