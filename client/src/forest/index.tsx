import * as React from "react";

import { ForestSketch } from "./sketch";
import { database } from "firebase";

export class Forest extends React.Component<{db: database.Database}, {}> {
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

    render() {
        return (
            <div className="forest-container">
                <canvas ref={this.handleCanvasRef} />
            </div>
        )
    }
}
