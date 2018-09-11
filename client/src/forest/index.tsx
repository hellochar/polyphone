import * as React from "react";

import { ForestSketch } from "./sketch";

export class Forest extends React.Component<{}, {}> {
    private sketch?: ForestSketch;
    private handleCanvasRef = (canvas: HTMLCanvasElement | null) => {
        if (canvas == null) {
            if (this.sketch != null) {
                this.sketch.dispose();
            }
        } else {
            this.sketch = new ForestSketch(canvas);
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
