
export interface DatabaseSchema {
    events: DatabaseEvents;
}

export interface DatabaseEvents {
    [eventId: string]: DatabaseEvent;
}

export interface DatabaseEvent {
    displayName: string;

    latitude: number;

    longitude: number;

    gameState: DatabaseGameState;

    users: DatabaseUsers<any>;

    /**
     * User ids of users waiting to join the game.
     */
    usersPending: string[]; 
}

export type DatabaseGameState = DatabaseGameStateRedVsBlue;

export interface DatabaseGameStateRedVsBlue {
    type: "redvsblue";
    redPoints: number;
    bluePoints: number;
    // unix time since game began
    timeGameStart: number;
    // how long the game should last in milliseconds
    gameDuration: number;
}

export type DatabaseUsers<UserState> = {
    [userId: string]: DatabaseUser<UserState>;
};

export interface DatabaseUser<UserState> {
    state: UserState;
}

export interface UserStateRedVsBlue {
    team: "red" | "blue";
}