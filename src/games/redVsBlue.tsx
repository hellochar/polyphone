import * as React from "react";

import { DatabaseGameStateRedVsBlue } from "src/firebaseSchema";
import classNames from "classnames";

export interface RedVsBlueProps {
    gameState: DatabaseGameStateRedVsBlue;
}
export interface RedVsBlueState {
    currentTime: number;
}

export class RedVsBlue extends React.Component<RedVsBlueProps, RedVsBlueState> {
    private intervalId?: number;
    state = {
        currentTime: Date.now(),
    };
    componentDidMount() {
        this.intervalId = (setInterval(() => {
            this.setState({
                currentTime: Date.now(),
            });
        }, 50) as any as number);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return (
            <div className="rvb">
                {this.renderContent()}
            </div>
        );
    }

    renderContent() {
        const { gameState } = this.props;
        // game hasn't started yet, show a countdown timer
        if (this.state.currentTime < gameState.timeGameStart) {
            const millisRemaining = gameState.timeGameStart - this.state.currentTime;
            return (
                <div className="rvb-countdown">
                    <h2>Game starts in</h2>
                    <h1>{Math.ceil(millisRemaining / 1000)}</h1>
                </div>
            );
        }
        // game is currently in play
        else if (this.state.currentTime >= gameState.timeGameStart && this.state.currentTime < gameState.timeGameStart + gameState.gameDuration) {
            const millisRemaining = gameState.timeGameStart + gameState.gameDuration - this.state.currentTime;
            return (
                <>
                    <div className="rvb-red">
                        <h1>Red</h1>
                        <h2>{gameState.redPoints}</h2>
                    </div>
                    <div className="rvb-blue">
                        <h1>Blue</h1>
                        <h2>{gameState.bluePoints}</h2>
                    </div>
                    <div className="rvb-timer">{Math.ceil(millisRemaining / 1000)}</div>
                </>
            );
        }
        // game ended
        else {
            const result =
                gameState.redPoints > gameState.bluePoints ? {
                    type: "win",
                    winningTeam: "Red",
                    winningPoints: gameState.redPoints,
                    losingTeam: "Blue",
                    losingPoints: gameState.bluePoints,
                } : gameState.bluePoints > gameState.redPoints ? {
                    type: "win",
                    winningTeam: "Blue",
                    winningPoints: gameState.bluePoints,
                    losingTeam: "Red",
                    losingPoints: gameState.redPoints,
                } : {
                    type: "tie",
                    points: gameState.redPoints
                };
            
            if (result.type === "tie") {
                return (
                    <div className="rvb-ended rvb-tie">
                        <h1>It's a tie!</h1>
                        Both teams scored {result.points}! Incredible!
                    </div>
                );
            } else {
                const className = classNames("rvb-ended", {
                    "rvb-win-red": result.winningTeam === "Red",
                    "rvb-win-blue": result.winningTeam === "Blue",
                });
                return (
                    <div className={className}>
                        <h1>{result.winningTeam} team wins!</h1>
                        <div className="rvb-winner-score-container">
                            <span className="rvb-winner-score">{result.winningPoints}</span> taps!
                        </div>
                        <div className="rvb-loser-score-container">
                            <span className="rvb-loser">{result.losingTeam}</span> <span className="rvb-loser-score">{result.losingPoints}</span> taps! Nice try!
                        </div>
                    </div>
                );
            }
        }
    }
}
