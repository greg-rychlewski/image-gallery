import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

export class Home extends React.Component {
    componentDidMount() {
        // Give title final state if browser doesn't support css animations on svg elements
        let docElement = document.documentElement;

        if (docElement.classList.contains("no-svgtransformations")) {
            let titleTop = document.getElementById("title-group-top");
            titleTop.setAttribute("transform", "rotate(5)");

            let titleBottom = document.getElementById("title-group-bottom");
            titleBottom.setAttribute("transform", "rotate(-5)");
        }
    }

    render() {
        return (
            <div id="home-container">
                <div id="home-title">
                    <svg width="100%" height="100%" viewBox="0 0 100 35" overflow="visible">
                        <g id="title-group-top">
                            <rect className="title-rect" x="9" y="0" width="55" height="20" />
                            <text className="title-text" x="13" y="15">{"Ellen's"}</text>
                        </g>
                        <g id="title-group-bottom">
                            <rect className="title-rect" x="56" y="15" width="35" height="20" />
                            <text className="title-text" x="62" y="30">Art</text>
                        </g>
                    </svg>
                </div>

                <div id="home-menu">
                    <Link to="/view">
                        <div id="home-view" className="menu-button">VIEW</div>
                    </Link>
                    <Link to="/new">
                        <div id="home-new" className="menu-button">
                            <span id="add-first-word">NEW </span>
                            <span id="add-second-word">ENTRY</span>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}