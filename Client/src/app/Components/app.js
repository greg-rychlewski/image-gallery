import React from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./Home/home";
import { View } from "./View Gallery/view";
import { New } from "./New Entry/new";
import "../utils/compatibility";

export class App extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path ="/" component={Home} />
                <Route path ="/view" component={View} />
                <Route exact path ="/new" component={New} />
            </Switch>
        );
    }
}