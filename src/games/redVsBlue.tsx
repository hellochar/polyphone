import classNames from "classnames";
import * as React from "react";

import { DatabaseGameStateRedVsBlue, DatabaseUsers, UserStateRedVsBlue } from "src/firebaseSchema";
import { addConfetti } from "../common/confetti";
import { randomAnimate } from "../common/randomAnimate";

export interface RedVsBlueProps {
    gameState: DatabaseGameStateRedVsBlue;
    users: DatabaseUsers<UserStateRedVsBlue>;
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
        const { gameState, users } = this.props;
        // game hasn't started yet, show a countdown timer
        if (this.state.currentTime < gameState.timeGameStart) {
            const playersConnected = Object.keys(users || {}).length;
            const playersElements: JSX.Element[] = [];
            if (users != null) {
                for (const userId in users) {
                    const user = users[userId];
                    const url = user.state.team === "red" ? "/assets/tap_red.png" : "/assets/tap_blue.png";
                    const rand = (userId.charCodeAt(0) * userId.charCodeAt(1) * userId.charCodeAt(2) * 59123021) % 511 / 511;
                    const el = <img className="rvb-player-phone" style={{animationDelay: `${-rand * 15}s`}} key={userId} src={url} width="100px" />;
                    playersElements.push(el);
                }
            }
            const playersConnectedElement = playersConnected > 0 ? <p>{playersConnected} players connected.</p> : <h1>Join by visiting <a href="">polyphone.io</a> on your phone!</h1>;
            const millisRemaining = gameState.timeGameStart - this.state.currentTime;
            return (
                <div className="rvb-countdown">
                    <h1 className="rvb-countdown-title"><span className="smaller">Next Up:</span> Red vs Blue</h1>
                    <div className="rvb-countdown-columns-container">
                        <div className="rvb-countdown-column rvb-countdown-side-column">
                            <img className="qr-small" src="/assets/qr-code.png" width="200px" />
                            <p>Join by visiting <a href="">polyphone.io</a> on your phone!</p>
                        </div>
                        <div className="rvb-countdown-column rvb-countdown-center-column">
                            <div>{...playersElements}</div>
                            {playersConnectedElement}
                            <p className="rvb-countdown-instructions">
                                <ul>
                                    <li>Tap your screen to earn points for your team.</li>
                                    <li>Rounds last 90 seconds.</li>
                                    <li>Most points wins!</li>
                                </ul>
                            </p>
                            <h1 className="rvb-countdown-indicator">Starts in <span className="rvb-countdown-time">{Math.ceil(millisRemaining / 1000)}</span>...</h1>
                        </div>
                        <div className="rvb-countdown-column rvb-countdown-side-column">
                            <img className="qr-small" src="/assets/qr-code.png" width="200px" />
                            <p>Join by visiting <a href="">polyphone.io</a> on your phone!</p>
                        </div>
                    </div>
                </div>
            );
            }
            // game is currently in play
            else if (this.state.currentTime >= gameState.timeGameStart && this.state.currentTime < gameState.timeGameStart + gameState.gameDuration) {
                const millisRemaining = gameState.timeGameStart + gameState.gameDuration - this.state.currentTime;
                return (
                <div className="rvb-play">
                    <p className="rvb-instructions">Tap your screen!</p>
                    <div className="rvb-team rvb-red">
                        <div className="rvb-score-container">
                            <h1 className="rvb-team-name">Red</h1>
                            <h2 className="rvb-team-points" ref={randomAnimate}>{gameState.redPoints}</h2>
                        </div>
                    </div>
                    <div className="rvb-team rvb-blue">
                        <div className="rvb-score-container">
                            <h1 className="rvb-team-name">Blue</h1>
                            <h2 className="rvb-team-points" ref={randomAnimate}>{gameState.bluePoints}</h2>
                        </div>
                    </div>
                    <div className="rvb-timer">{(new Date(millisRemaining).toISOString().substring(14, 19))} remaining</div>
                </div>
            );
        }
        // game ended
        else {
            addConfetti();

            gameState.redPoints = 12;
            gameState.bluePoints = 320;

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
                        <div className="rvb-ended-container">
                            <h1>It's a tie!</h1>
                            Both teams scored {result.points}! Incredible!
                        </div>
                    </div>
                );
            } else {
                const className = classNames("rvb-ended", {
                    "rvb-win-red": result.winningTeam === "Red",
                    "rvb-win-blue": result.winningTeam === "Blue",
                });
                return (
                    <div className={className}>
                        <div className="rvb-ended-container">
                            <h1 className="rvb-winner-banner">{result.winningTeam} team wins!</h1>
                            <h2 className="rvb-winner-score-container animated" ref={randomAnimate}>
                                <span className="rvb-winner-score">{result.winningPoints}</span> points!
                            </h2>
                            <div className="rvb-loser-score-container">
                                <span className="rvb-loser">{result.losingTeam}</span> team <span className="rvb-loser-score">{result.losingPoints}</span> points! Nice try!
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }
}
