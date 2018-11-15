import "./forest/monkeypatchThree";
import "./initializeFirebase";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./app";

import "./index.scss";

const body = document.body;
(body.requestFullscreen && body.requestFullscreen()) ||
(body.mozRequestFullScreen && body.mozRequestFullScreen()) ||
(body.webkitRequestFullScreen && body.webkitRequestFullScreen());

const root = document.getElementById("root");


try {
    ReactDOM.render(<App />, root);
} catch (e) {
    if (e instanceof Error) {
        root!.innerText = `Error: ${e.name} - ${e.message}. ${e.stack}`;
    }
}