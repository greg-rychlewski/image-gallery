import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

export class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="header-menu">
                    <Link to="/view">
                        <div id="menu-view" className="menu-item">
                            <i className="menu-icon fa fa-picture-o"> </i>
                            <span className="menu-item-first-word">View </span> 
                            <span className="menu-item-second-word">Gallery</span>
                        </div>
                    </Link>

                    <Link to="/new">
                        <div id="menu-new" className="menu-item">
                            <i className="menu-icon fa fa-upload"></i>
                            <span className="menu-item-first-word">New </span>
                            <span className="menu-item-second-word">Entry</span>
                        </div>
                    </Link> 
                </div>
            </div>
        );
    }
}