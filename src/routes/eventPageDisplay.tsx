import * as React from "react";
import * as firebase from "firebase";
import { RouteComponentProps } from "react-router";

import { DatabaseEvent } from "../firebaseSchema";
import { EventManager } from "../eventManager";
import { GameState } from "../games/gameState";

const db = firebase.database();

interface EventPageDisplayRouteParams {
    eventId: string;
}

interface EventPageDisplayProps extends RouteComponentProps<EventPageDisplayRouteParams> {
}

interface EventPageDisplayState {
    event?: DatabaseEvent;
}

export class EventPageDisplay extends React.Component<EventPageDisplayProps, EventPageDisplayState> {
    private eventRef!: firebase.database.Reference;
    private gamesManager!: EventManager;
    state: EventPageDisplayState = {

    };

    componentDidMount() {
        // As soon as this page is visited we'll begin cycling through games.
        this.eventRef = db.ref(`events/${this.props.match.params.eventId}`);
        this.eventRef.on("value", (snapshot) => {
            if (snapshot != null) {
                const event: DatabaseEvent = snapshot.val();
                this.setState({
                    event,
                });
            }
        });
        this.gamesManager = new EventManager(this.eventRef);
        this.gamesManager.start();
    }

    componentWillUnmount() {
        this.gamesManager.stop();
    }

    render() {
        return (
            <div className="event-page-display-container">
                {this.maybeRenderGame()}
            </div>
        );
    };

    private maybeRenderGame() {
        const { event } = this.state;
        if (event == null) {
            return null;
        }
        return <GameState key={event.gameState.gameId} gameState={event.gameState} />
    }
}