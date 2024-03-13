import React, { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Social from "./social";
import DFIcon from "../../../assets/icons/dflogo.png";
import DFKyc from "../../../assets/icons/DFKyc.png";
import { IoMdBookmark, IoMdCall, IoMdChatboxes, IoMdClipboard, IoMdClose, IoMdHammer, IoMdHome, IoMdImage, IoMdMenu, IoMdPerson } from "react-icons/io";
import { MdDashboard, MdPeople, MdPhotoAlbum, MdViewInAr, MdOutlineDoubleArrow, MdOutlineSwapHorizontalCircle } from "react-icons/md";
import { useAddress } from "../../../hooks";
import "./drawer-content.scss";
import "./drawer-styling.scss";
import { Link } from "react-router-dom";

function NavContent() {
    const [isActive] = useState();
    const address = useAddress();

    const [active, setActive] = useState(false);

    const activateNav = () => {
        setActive(!active);
    };

    const checkPage = useCallback((location: any, page: string): boolean => {
        const currentPath = location.pathname.replace("/", "");
        if (currentPath.indexOf("bloomify") >= 0 && page === "bloomify") {
            return true;
        }
        if (currentPath.indexOf("bloombox") >= 0 && page === "bloombox") {
            return true;
        }
        return false;
    }, []);

    return (
        <div className={active ? "header" : "header-mobile"}>
            <div className={!active ? "menu-icon" : "menu-icon-center"} onClick={activateNav}>
                {!active ? <MdOutlineDoubleArrow className="menu" /> : <IoMdClose className="menu" />}
            </div>

            <nav className="wwirdth">
                <ul className="ul-item">
                    <li>
                        <Link
                            className={active ? "hideme" : "sidebarLink showme"}
                            to={{
                                pathname: "/bloomify",
                                state: { setActive: false },
                            }}
                        >
                            <MdDashboard className="icon-small" /> <p className="hiddenme">Bloomify</p>
                        </Link>

                        <Link
                            className={active ? "showme fill-div" : "hideme"}
                            to={{
                                pathname: "/bloomify",
                                state: { setActive: false },
                            }}
                        >
                            <MdDashboard className="icon" />
                            Bloomify
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={active ? "hideme" : "sidebarLink showme"}
                            to={{
                                pathname: "/swap",
                                state: { fromBloomify: true },
                            }}
                        >
                            <MdOutlineSwapHorizontalCircle className="icon-small" />
                            <p className="hiddenme">Swap</p>
                        </Link>

                        <Link
                            className={active ? "showme fill-div" : "hideme"}
                            to={{
                                pathname: "/swap",
                                state: { fromBloomify: true },
                            }}
                        >
                            <MdOutlineSwapHorizontalCircle className="icon" />
                            Swap
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={active ? "hideme" : "sidebarLink showme"}
                            to={{
                                pathname: "/teammanagement",
                                state: { setActive: false },
                            }}
                        >
                            <MdPeople className="icon-small" /> <p className="hiddenme">Team Management</p>
                        </Link>

                        <Link
                            className={active ? "showme fill-div" : "hideme"}
                            to={{
                                pathname: "/teammanagement",
                                state: { fromBloomify: true },
                            }}
                        >
                            <MdPeople className="icon" />
                            Team Management
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={active ? "hideme" : "sidebarLink showme"}
                            to={{
                                pathname: "/mint",
                                state: { fromBloomify: true },
                            }}
                        >
                            <MdPhotoAlbum className="icon-small" /> <p className="hiddenme">Mint NFT</p>
                        </Link>

                        <Link
                            className={active ? "showme fill-div" : "hideme"}
                            to={{
                                pathname: "/mint",
                                state: { fromBloomify: true },
                            }}
                        >
                            <MdPhotoAlbum className="icon" />
                            Mint
                        </Link>
                    </li>

                    <li>
                        <Link
                            className={active ? "hideme" : "sidebarLink showme"}
                            to={{
                                pathname: "/bloombox",
                                state: { fromBloomify: true },
                            }}
                        >
                            <MdViewInAr className="icon-small" /> <p className="hiddenme">BloomBox</p>
                        </Link>

                        <Link
                            className={active ? "showme fill-div" : "hideme"}
                            to={{
                                pathname: "/bloombox",
                                state: { fromBloomify: true },
                            }}
                        >
                            <MdViewInAr className="icon" />
                            BloomBox
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavContent;
