import React from "react";
import { Switch, Route } from "react-router-dom";
import { ViewList } from "./view-list";
import { Entry } from "./entry";
import { Header } from "../Header/header";

export class View extends React.Component {
    render() {
        return (
            <div>
                <Header />

                <Switch>
                    <Route exact path="/view" component={ViewList} />
                    <Route path={`/view/:entryId`} component={Entry} />}/>
                </Switch>
            </div>
        );
    }
}