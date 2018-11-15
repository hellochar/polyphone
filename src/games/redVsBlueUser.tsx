import classnames from "classnames";
import * as React from "react";

import { DatabaseUser, UserStateRedVsBlue, DatabaseGameStateRedVsBlue } from "src/firebaseSchema";

export interface RedVsBlueUserProps {
    gameStateRef: firebase.database.Reference;
    gameState: DatabaseGameStateRedVsBlue;
    user: DatabaseUser<UserStateRedVsBlue>;
}

export interface RedVsBlueUserState {
    currentTime: number;
    // this is held client side
    numTaps: number;
}

export class RedvsBlueUser extends React.Component<RedVsBlueUserProps, {}> {
    private intervalId?: number;
    state = {
        currentTime: Date.now(),
        numTaps: 0,
    };

    private myTeamPointsRef: firebase.database.Reference;
    
    constructor(props: RedVsBlueUserProps) {
        super(props);
        const myTeamPointsRefUrl = props.user.state.team === "red" ? "redPoints" : "bluePoints";
        this.myTeamPointsRef = props.gameStateRef.child(myTeamPointsRefUrl);
    }

    private handleTouch = () => {
        this.setState({
            numTaps: this.state.numTaps + 1,
        });
        this.myTeamPointsRef.transaction((val: number) => {
            return val + 1;
        });
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
        const className = classnames("rvb-user", {
            "rvb-user-team-red": this.props.user.state.team === "red",
            "rvb-user-team-blue": this.props.user.state.team === "blue",
        });
        return (
            <div className={className}>
                {this.renderContent()}
            </div>
        );
    }

    renderContent() {
        const { gameState, user } = this.props;
        // game hasn't started yet, show instructions and your team
        if (this.state.currentTime < gameState.timeGameStart) {
            const millisRemaining = gameState.timeGameStart - this.state.currentTime;
            return (
                <>
                    <h3>Red vs Blue</h3>
                    <h1>You are on {this.props.user.state.team} team!</h1>
                    <p>Tap your screen as fast as possible to earn points for your team. Most points wins!</p>
                    <div className="rvb-user-countdown">
                        Starting in {Math.ceil(millisRemaining / 1000)}... 
                    </div>
                </>
            );
        }
        // game is currently in play
        else if (this.state.currentTime >= gameState.timeGameStart && this.state.currentTime < gameState.timeGameStart + gameState.gameDuration) {
            return (
                <div className="rvb-user-tap-collector" onTouchStart={this.handleTouch} onMouseDown={this.handleTouch}>
                    <div className="rvb-user-tap-button">{this.state.numTaps}</div>
                </div>
            );
        }
        // game ended
        else {
            const yourTeamPoints = user.state.team === "red" ? gameState.redPoints : gameState.bluePoints;
            const otherTeamPoints = user.state.team === "red" ? gameState.bluePoints : gameState.redPoints;


            if (yourTeamPoints === otherTeamPoints) {
                return (
                    <div className="rvb-user-ended rvb-user-tie">
                        <h1>It's a tie!</h1>
                        Holy moly it's a tie! Both teams scored {yourTeamPoints}!

                        <div className="rvb-user-ended-contribution-container">
                            Your contribution: <span className="rvb-user-ended-contribution">{this.state.numTaps}</span> taps!
                        </div>
                    </div>
                );
            } else {
                const result = yourTeamPoints > otherTeamPoints ? "won!" : "lost :(";
                return (
                    <div className="rvb-user-ended">
                        <h1>Your team {result}</h1>
                        <div className="rvb-user-ended-contribution-container">
                            Your contribution: <span className="rvb-user-ended-contribution">{this.state.numTaps}</span> taps!
                        </div>
                    </div>
                );
            }
        }
    }
}