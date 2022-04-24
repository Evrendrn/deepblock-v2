import React, { useEffect, useState, useRef, useMemo } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { useWeb3React } from "@web3-react/core";
import useAuth from "../../hooks/useAuth";

const Header = () => {
    const { account } = useWeb3React();
    const { login, logout } = useAuth();

    const connectMetamask = () => {
        localStorage.setItem("connectorId", "injected");
        if (account) {
          logout();
        } else {
          login("injected");
        }
    };

    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    
    const list = (anchor) => (
        <Box
            sx={{ width: '100%' }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >   
            <ul className="d-flex flex-column align-items-center" style={{ padding: 0 }}>
                <li className="nav-item">
                    <Link to="/" >Home</Link>
                </li>

                <li className="nav-item">
                    <Link to="/token" >Token</Link>
                </li>

                <li className="nav-item">
                    <Link to="/team">Team</Link>
                </li>
            </ul>

            <Divider />
            <ul className="d-flex flex-column align-items-center" style={{ padding: 0, marginTop: '20px' }}>
                <li className="nav-item">
                    {account ? (
                        <button 
                            className="btn btn-primary"
                            onClick={logout}
                        >
                            <span>Disconnect</span>
                        </button>
                    ) : (
                        <button 
                            className="btn btn-primary"
                            onClick={connectMetamask}
                        >
                            <span>connect wallet</span>
                        </button>
                    )}      
                </li>
                <li>
                    <Link to="/" className="nav-item"><i className="fa-brands fa-twitter"></i></Link>
                </li>

                <li>
                    <Link to="/" className="nav-item"><i className="fa-brands fa-instagram"></i></Link>
                </li>

                <li>
                    <Link to="/" className="nav-item"><i className="fa-solid fa-telescope"></i></Link>
                </li>
            </ul>
        </Box>
    );

    return (
        <header className="header">
            <div className="header-top">
                <div className="container">
                    <div className="header-left d-flex align-items-center">
                        <Link to="/" className="logo">deepblock</Link>

                        <ul className="main-nav d-flex">
                            <li className="nav-item">
                                <Link to="/" >Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/token" >Token</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/team">Team</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="header-right">
                        <ul className="main-nav d-flex align-items-center">
                            <li className="nav-item">
                            {account ? (
                                <button 
                                    className="btn btn-primary"
                                    onClick={logout}
                                >
                                    <span>Disconnect</span>
                                </button>
                            ) : (
                                <button 
                                    className="btn btn-primary"
                                    onClick={connectMetamask}
                                >
                                    <span>connect wallet</span>
                                </button>
                            )}                               
                            </li>
                            <li>
                                <Link to="/" className="nav-item"><i className="fa-brands fa-twitter"></i></Link>
                            </li>

                            <li>
                                <Link to="/" className="nav-item"><i className="fa-brands fa-instagram"></i></Link>
                            </li>

                            <li>
                                <Link to="/" className="nav-item"><i className="fa-solid fa-telescope"></i></Link>
                            </li>
                        </ul>
                    </div>
                    <div className="menu-bar" onClick={toggleDrawer("right", true)}><i className="fas fa-bars"></i></div>
                </div>
            </div>            
            <div>
                <Drawer
                    anchor={"right"}
                    open={state["right"]}
                    onClose={toggleDrawer("right", false)}
                >
                    {list("right")}
                </Drawer>
            </div>
        </header >
    )
}

export default Header;