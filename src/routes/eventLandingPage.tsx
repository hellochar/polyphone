import * as React from "react";

import { Link } from "react-router-dom";

export class EventLandingPage extends React.Component {
    state = {
        playerCount: 3,
    };

    render() {
        return (
            <div className="landing-page-container">
                <h1 className="landing-page-header"><span className="landing-page-name-prefix">Welcome to</span> <span className="landing-page-name">Gray Area Incubator Showcase 2018</span></h1>
                <div className="landing-page-player-count-indicator"><span className="landing-page-player-count">{this.state.playerCount}</span> people playing.</div>
                <Link to="/event/gais2018/play" className="landing-page-join">Join</Link>
            </div>
        );
    }
}