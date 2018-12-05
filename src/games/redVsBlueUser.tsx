import classnames from "classnames";
import * as React from "react";

import { DatabaseUser, UserStateRedVsBlue, DatabaseGameStateRedVsBlue } from "src/firebaseSchema";
import { addConfetti } from "../common/confetti";
import { randomAnimate } from "../common/randomAnimate";

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

export class RedvsBlueUser extends React.PureComponent<RedVsBlueUserProps, {}> {
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

    componentDidUpdate() {
        const props = this.props;
        const myTeamPointsRefUrl = props.user.state.team === "red" ? "redPoints" : "bluePoints";
        this.myTeamPointsRef = props.gameStateRef.child(myTeamPointsRefUrl);
    }

    private buttonRef: HTMLElement | null = null;
    private handleButtonRef = (ref: HTMLElement | null) => {
        this.buttonRef = ref;
    }

    private handleTouch = (e: React.SyntheticEvent<HTMLElement>) => {
        e.preventDefault();
        // if (this.buttonRef) {
            // addConfetti(this.buttonRef);
        // }
        this.setState({
            numTaps: this.state.numTaps + 1,
        });
        this.myTeamPointsRef.transaction((val: number) => {
            return val + 1;
        });
        return false;
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
                <div className="rvb-user-countdown animated bounceIn">
                    <h3>Red vs Blue</h3>
                    <h1>You are on {this.props.user.state.team} team!</h1>
                    <p>Tap your screen as fast as possible to earn points for your team. Most points wins!</p>
                    <div className="rvb-user-countdown-indicator">
                        Starting in {Math.ceil(millisRemaining / 1000)}... 
                    </div>
                </div>
            );
        }
        // game is currently in play
        else if (this.state.currentTime >= gameState.timeGameStart && this.state.currentTime < gameState.timeGameStart + gameState.gameDuration) {
            return (
                <div className="rvb-user-tap-collector animated slideInRight" onClick={this.handleTouch}>
                    <div className="rvb-user-tap-button" ref={this.handleButtonRef}>{this.state.numTaps}</div>
                </div>
            );
        }
        // game ended
        else {
            const yourTeamPoints = user.state.team === "red" ? gameState.redPoints : gameState.bluePoints;
            const otherTeamPoints = user.state.team === "red" ? gameState.bluePoints : gameState.redPoints;

            if (yourTeamPoints === otherTeamPoints) {
                return (
                    <div className="rvb-user-ended rvb-user-tie animated fadeIn">
                        <h1>It's a tie!</h1>
                        <p>
                        Holy moly! Both teams scored <span className="rvb-points">{yourTeamPoints} points!</span>
                        </p>

                        <div className="rvb-user-ended-contribution-container">
                            You contributed <span className="rvb-points">{this.state.numTaps} points!</span>
                        </div>
                    </div>
                );
            } else {
                const won = yourTeamPoints > otherTeamPoints;
                const result = won ? "won!" : "lost :(";
                if (won && Math.random() < 0.2) { // reduce confetti on mobile
                    addConfetti();
                }
                return (
                    <div className="rvb-user-ended animated fadeIn">
                        <h1>Your team {result}</h1>
                        <p className="rvb-user-ended-matchup"><span className="rvb-points" ref={randomAnimate}>{yourTeamPoints}</span> to <span className="rvb-points" ref={randomAnimate}>{otherTeamPoints}</span></p>
                        <div className="rvb-user-ended-contribution-container">
                            You contributed <span className="rvb-points">{this.state.numTaps} points!</span>
                        </div>
                    </div>
                );
            }
        }
    }
}