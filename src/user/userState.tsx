import * as React from "react";

import { DatabaseGameState, DatabaseUser } from "src/firebaseSchema";
import { RedvsBlueUser } from "../games/redVsBlueUser";

export interface GameStateProps {
    gameStateRef: firebase.database.Reference;
    gameState: DatabaseGameState;
    user: DatabaseUser<any>;
}

export class UserState extends React.Component<GameStateProps, {}> {
    render() {
        switch (this.props.gameState.type) {
            case "redvsblue":
                return <RedvsBlueUser gameStateRef={this.props.gameStateRef} gameState={this.props.gameState} user={this.props.user} />;
        }
    }
}
