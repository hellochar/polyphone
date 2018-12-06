import * as firebase from "firebase";
import * as React from "react";
import { RouteComponentProps } from "react-router";

import { DatabaseGameState, DatabaseUser } from "../firebaseSchema";
import { getMyUserId } from "../user/userId";
import { UserState } from "../user/userState";

const db = firebase.database();

interface ClientRouteParams {
    eventId: string;
}

interface ClientProps extends RouteComponentProps<ClientRouteParams> {
}

interface ClientState {
    gameState?: DatabaseGameState;
    user?: DatabaseUser<any>;
}

export class EventPageClient extends React.Component<ClientProps, ClientState> {
    private gameStateRef!: firebase.database.Reference;
    private userRef!: firebase.database.Reference;
    state: ClientState = {};

    componentDidMount() {
        const userId = getMyUserId();
        // one-time put myself on the list of pending users
        db.ref(`events/${this.props.match.params.eventId}/usersPending`).transaction((pendingUsers) => {
            pendingUsers = (pendingUsers || []);
            pendingUsers.push(userId);
            return pendingUsers;
        });

        this.gameStateRef = db.ref(`events/${this.props.match.params.eventId}/gameState`);
        this.gameStateRef.on("value", (snapshot) => {
            if (snapshot != null) {
                const gameState: DatabaseGameState = snapshot.val();
                this.setState({
                    gameState,
                });
            }
        });
        this.userRef = db.ref(`events/${this.props.match.params.eventId}/users/${userId}`);
        this.userRef.on("value", (snapshot) => {
            if (snapshot != null) {
                const user: DatabaseUser<any> = snapshot.val();
                this.setState({
                    user,
                })
            }
        });

        window.addEventListener("beforeunload", () => {
            this.userRef.remove();
        });

        window.addEventListener("blur", () => {
            this.userRef.remove();
        });
    }

    render() {
        return (
            <div className="client-container">
                {this.maybeRenderUserState()}
            </div>
        );
    };

    private maybeRenderUserState() {
        const { gameState, user } = this.state;
        if (gameState == null || user == null) {
            return null;
        }
        return <UserState key={gameState.gameId} gameStateRef={this.gameStateRef} gameState={gameState} user={user} />
    }
}
