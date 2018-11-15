import * as React from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
export class HomePage extends React.Component<{}, {}> {
    state = {
        hasGeolocation: true,
        shouldRedirect: false,
    };
    componentDidMount() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                // do_something(position.coords.latitude, position.coords.longitude);
            });
        } else {
            this.setState({
                hasGeolocation: false,
            })
        }

        setTimeout(() => {
            this.setState({
                shouldRedirect: true,
            });
        }, 3000);
    }
    render() {
        if (!this.state.hasGeolocation) {
            return (
                <div className="home-page-container">
                    <h1>Select your event</h1>
                    <Link to="/events/gais2018">Gray Area Incubator Showcase 2018</Link>
                </div>
            );
        }
        if (!this.state.shouldRedirect) {
            return (
                <div className="home-page-container">
                    <h1>Finding your closest event...</h1>
                    <a>Find manually</a>
                </div>
            );
        } else {
            return (
                <div className="home-page-container">
                    <h1>Found! Redirecting...</h1>
                    <Redirect to="/event/gais2018" />
                </div>
            );
        }
    }
}