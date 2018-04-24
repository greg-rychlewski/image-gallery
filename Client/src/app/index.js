import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "react-dom";
import { App } from "./Components/app";
import "./index.css";

// Main container for entire page
render(<Router><App /></Router>, document.getElementById("root"));