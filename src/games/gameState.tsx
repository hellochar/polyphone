import * as React from "react";

import { DatabaseGameState } from "src/firebaseSchema";
import { RedVsBlue } from "./redVsBlue";

export interface GameStateProps {
    gameState: DatabaseGameState;
}
export class GameState extends React.Component<GameStateProps, {}> {
    render() {
        switch (this.props.gameState.type) {
            case "redvsblue":
                return <RedVsBlue gameState={this.props.gameState} />;
        }
    }
}