import { createContext } from "react";

export interface Context {
    playbackBeginTime: number;
}

export const Context = createContext<Context>({
    playbackBeginTime: -1
});