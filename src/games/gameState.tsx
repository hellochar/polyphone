import * as React from "react";

import { DatabaseGameState, DatabaseUsers } from "src/firebaseSchema";
import { RedVsBlue } from "./redVsBlue";

export interface GameStateProps {
    gameState: DatabaseGameState;
    users: DatabaseUsers<any>;
}
export class GameState extends React.Component<GameStateProps, {}> {
    render() {
        switch (this.props.gameState.type) {
            case "redvsblue":
                return <RedVsBlue gameState={this.props.gameState} users={this.props.users} />;
        }
    }
}