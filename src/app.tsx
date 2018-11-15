import * as React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import { EventLandingPage } from "./routes/eventLandingPage";
import { EventPageDisplay } from "./routes/eventPageDisplay";
import { EventPageClient } from "./routes/eventPageClient";
import { HomePage } from "./routes/homePage";

export class App extends React.Component<{}, {}> {
    render() {
        return (
            <HashRouter>
                <Routes />
            </HashRouter>
        );
    }
};

const Routes = () => (
    <Switch>
        <Route path="/event/:eventId" exact component={EventLandingPage} />
        <Route path="/event/:eventId/play" component={EventPageClient} />
        <Route path="/event/:eventId/display" component={EventPageDisplay} />
        <Route path="/" component={HomePage} />
        <Redirect from="*" to="/" />}
    </Switch>
)