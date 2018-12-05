import { DatabaseGameStateRedVsBlue, DatabaseGameState, DatabaseUsers, UserStateRedVsBlue } from "./firebaseSchema";

// EventManager kicks off starting and cycling through games
// and assigns initial states to users
export class EventManager {
    private gameState!: DatabaseGameState;
    private gameStateRef: firebase.database.Reference;
    private usersRef: firebase.database.Reference;
    private users!: DatabaseUsers<any>;
    private usersPendingRef: firebase.database.Reference;
    private timeoutId?: number;
    constructor(public eventRef: firebase.database.Reference) {
        this.gameStateRef = eventRef.child("gameState");
        this.gameStateRef.on("value", (snapshot) => {
            if (snapshot != null) {
                this.gameState = snapshot.val();
            }
        });


        this.usersRef = eventRef.child("users");
        this.usersRef.on("value", (snapshot) => {
            if (snapshot != null) {
                this.users = snapshot.val();
            }
        });

        this.usersPendingRef = eventRef.child("usersPending");
        this.usersPendingRef.on("value", (snapshot) => {
            if (snapshot != null) {
                const userIds: string[] = snapshot.val();
                if (userIds == null || userIds.length === 0) {
                    return;
                }
                // process all users in the queue
                switch (this.gameState.type) {
                    case "redvsblue":
                        const newUsers = createRedVsBlueUsers(userIds, this.users);
                        this.usersRef.transaction((existingUsers) => {
                            return {
                                ...existingUsers,
                                ...newUsers,
                            };
                        });
                        this.usersPendingRef.set([]);
                        break;
                }
            }
        });
    }

    public start() {
        this.scheduleNextGame();
    }

    public stop() {
        clearTimeout(this.timeoutId);
    }

    private scheduleNextGame() {
        // to start the games cycle, we:
        // update the GameState to a new game and set it immediately
        const newGameState = this.selectNewGame();
        this.gameStateRef.set(newGameState);

        // wait until the game has ended
        const timeGameWillEnd = (newGameState.timeGameStart + newGameState.gameDuration);
        const resultsScreenDuration = 15 * 1000;
        const waitDuration = timeGameWillEnd - Date.now() + resultsScreenDuration;
        this.timeoutId = setTimeout(() => {
            // and then do another one
            this.scheduleNextGame();
        }, waitDuration) as unknown as number;
    }

    private selectNewGame() {
        return createRedVsBlueGameState();
    }
}

function createRedVsBlueGameState(): DatabaseGameStateRedVsBlue {
    return {
        gameId: Math.random().toString(16).substr(2),
        bluePoints: 0,
        gameDuration: (5 * 60 + 30) * 1000,
        redPoints: 0,
        timeGameStart: Date.now() + 20 * 1000,
        type: "redvsblue",
    };
}

function createRedVsBlueUsers(userIds: string[], existingUsers: DatabaseUsers<UserStateRedVsBlue>): DatabaseUsers<UserStateRedVsBlue> {
    // let numRed = 0, numBlue = 0;
    // for (const userId in existingUsers) {
    //     const user = existingUsers[userId];
    //     user.state.team === "red" ? numRed++ : numBlue++;
    // }
    // return {
    //     team
    // }
    const newUsers: DatabaseUsers<UserStateRedVsBlue> = {};
    for (const id of userIds) {
        newUsers[id] = {
            state: {
                team: Math.random() < 0.5 ? "red" : "blue",
            },
        }
    }
    return newUsers;
}