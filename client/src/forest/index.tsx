import * as React from "react";

import { ForestSketch } from "./sketch";
import { database } from "firebase";
import { AudioClip } from "../audio/audioClip";

export class Forest extends React.Component<{db: database.Database, isAdmin?: boolean}, { audioPlaybackBegin: number, now: number }> {
    state = {
        now: Date.now(),
        audioPlaybackBegin: -1,
    };

    private audioClip: AudioClip = new AudioClip({
        autoplay: false,
        srcs: ["june_3rd.mp3", "june_3rd.wav"],
    });

    private playbackBeginRef: database.Reference;
    constructor(props: any, context: any) {
        super(props, context);
        this.playbackBeginRef = this.props.db.ref("audioPlaybackBegin");
        this.playbackBeginRef.on("value", (snapshot) => {
            if (snapshot != null) {
                this.setState({audioPlaybackBegin: snapshot.val()});
                this.syncAudioClip(snapshot.val());
            }
        });
    }

    private syncAudioClip(playbackBegin: number) {
        if (playbackBegin < 0) {
            this.audioClip.element.pause();
            this.audioClip.element.currentTime = 0;
        } else if (playbackBegin > Date.now()) {
            // schedule it in the future
            // TODO maybe make this more precize
            setTimeout(() => {
                this.audioClip.play();
            }, playbackBegin - Date.now());
        } else {
            // we're already playing
            const curPosition = (Date.now() - playbackBegin) / 1000;
            this.audioClip.element.currentTime = curPosition;
            this.audioClip.play();
        }
    }


    private sketch?: ForestSketch;
    private handleCanvasRef = (canvas: HTMLCanvasElement | null) => {
        if (canvas == null) {
            if (this.sketch != null) {
                this.sketch.dispose();
            }
        } else {
            this.sketch = new ForestSketch(this.props.db, canvas);
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
                        23 people connected.
                    </p>
                    <p>
                        Six songs prepared: Burn the Witch, Separator, Jigsaw Falling Into Place, Where I End and You Begin, I Might Be Wrong, Idioteque
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
