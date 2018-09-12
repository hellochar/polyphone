import "./forest/monkeypatchThree";

import * as React from "react";
import * as ReactDOM from "react-dom";
import io from "socket.io-client";
import * as firebase from "firebase";

import { Forest } from "./forest";

import "./index.scss";

class App extends React.Component<{db: firebase.database.Database}, {}> {
    render() {
        return (
            <>
                <Forest db={db} />
                <div style={{position: "relative"}}>
                    <h1>Polyphone.io</h1>
                    <FooListener db={db}/>
                </div>
            </>
        );
    }
};

class FooListener extends React.PureComponent<{db: firebase.database.Database}, { val?: any }> {
    state = { val: undefined };

    private ref: firebase.database.Reference;
    constructor(props: any, context?: any) {
        super(props, context);
        this.ref = this.props.db.ref("foo");
        this.ref.on("value", (snapshot) => {
            console.log(snapshot);
            if (snapshot != null) {
                this.setState({
                    val: snapshot.val(),
                });
            } else {
                this.setState({
                    val: undefined,
                })
            }
        });
    }

    public render() {
        return (
            <div>
                <button onClick={this.handleClick}>+</button>
                <FooRenderer val={this.state.val} />
            </div>
        );
    }

    private handleClick = () => {
        this.ref.set(this.state.val! + 1);
    }
}

const FooRenderer: React.StatelessComponent<{val: any}> = ({ val }) => (
    <div>
        Foo is:
        <pre>{JSON.stringify(val)}</pre>
    </div>
);

// const server = io();
// server.send("hello");

const config = {
    apiKey: "AIzaSyBT3hTYRj0u-ApZE1_Z1fyXf2ZiV9mgXr0",
    authDomain: "polyphone-io.firebaseapp.com",
    databaseURL: "https://polyphone-io.firebaseio.com",
    projectId: "polyphone-io",
    storageBucket: "polyphone-io.appspot.com",
    messagingSenderId: "255218178256"
};
firebase.initializeApp(config);

const db = firebase.database();
console.log(db);

// const fooRef = db.ref("foo");
// fooRef.on("value", (snapshot) => {
//     if (snapshot != null) {
//         snapshot.val;
//     }
// });

const root = document.getElementById("root");

try {
    ReactDOM.render(<App db={db} />, root);
} catch (e) {
    root!.innerHTML = JSON.stringify(e);
}