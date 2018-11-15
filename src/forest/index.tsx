import * as React from "react";

import { ForestSketch } from "./sketch";
import { database } from "firebase";
import { AudioManager } from "./audioManager";

export class Forest extends React.Component<{db: database.Database, isAdmin?: boolean}, { audioPlaybackBegin: number, now: number }> {
    state = {
        now: Date.now(),
        audioPlaybackBegin: -1,
    };
    private playbackBeginRef: database.Reference;
    private audioManager: AudioManager;
    constructor(props: any, context: any) {
        super(props, context);

        this.audioManager = new AudioManager(!!this.props.isAdmin);

        this.playbackBeginRef = this.props.db.ref("audioPlaybackBegin");
        this.playbackBeginRef.on("value", (snapshot) => {
            if (snapshot != null) {
                this.setState({audioPlaybackBegin: snapshot.val()});
                this.audioManager.syncAudioClip(snapshot.val());
            }
        });
    }

    private sketch?: ForestSketch;
    private handleCanvasRef = (canvas: HTMLCanvasElement | null) => {
        if (canvas == null) {
            if (this.sketch != null) {
                // this.sketch.dispose();
            }
        } else {
            this.sketch = new ForestSketch(this.props.db, this.audioManager, canvas);
        }
    }

    componentDidUpdate() {
        setTimeout(() => {
            this.setState({
                now: Date.now(),
            })
        }, 100);
    }

    render() {
        return (
            <div className="forest-container">
                <canvas ref={this.handleCanvasRef} />
                {this.maybeRenderAdminControls()}
            </div>
        )
    }

    private maybeRenderAdminControls() {
        if (this.props.isAdmin) {
            return (
                <div className="admin">
                    <h2>polyphone.io admin</h2>
                    <p>
                        23 people connected. Song 1 of 6. 
                    </p>
                    {this.renderPlaybackState()}
                </div>
            );
        }
    }

    private renderPlaybackState() {
        if (this.state.audioPlaybackBegin < 0) {
            return (
                <div>
                    Not playing.
                    <button onClick={this.handleBeginPlaybackClick}>Begin playback</button>
                </div>
            );
        } 
        const dt = this.state.audioPlaybackBegin - Date.now();
        if (dt > 0) {
            return (
                <div>
                    Starting in {(dt / 1000).toFixed(1)} seconds...
                    <button onClick={this.handleCancelPlayback}>Cancel</button>
                </div>
            );
        } else {
            return (
                <div>
                    Playing... {-Math.floor(dt / 1000)}
                    <button onClick={this.handleCancelPlayback}>Stop</button>
                </div>
            );
        }
    }

    private handleBeginPlaybackClick = () => {
        // starts in 5 seconds
        const playbackTime = Date.now() + 5000;
        this.playbackBeginRef.set(playbackTime);   
    }

    private handleCancelPlayback = () => {
        this.playbackBeginRef.set(-1);
    }
}
