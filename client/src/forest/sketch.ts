import * as THREE from "three";

export class ForestSketch {
    public renderer: THREE.WebGLRenderer;
    public scene = new ForestScene();
    public camera: THREE.PerspectiveCamera;

    get aspectRatio() {
        return this.renderer.domElement.height / this.renderer.domElement.width;
    }

    constructor(public canvas: HTMLCanvasElement) {
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        });
        this.renderer.autoClear = true;
        this.renderer.setClearColor(0x808080);
        this.updateCanvasSize();
        window.addEventListener("resize", () => {
            this.updateCanvasSize();
        })

        this.camera = new THREE.PerspectiveCamera(60, 1 / this.aspectRatio, 1, 5000);
        this.camera.position.set(0, 350, 700);
        this.camera.lookAt(0, 0, 0);

        requestAnimationFrame(this.animate);
    }

    public animate = (millisDt: number) => {
        this.renderer.render(this.scene, this.camera);
    };

    dispose() {
        this.renderer.dispose();
    }

    private updateCanvasSize() {
        const parent = this.canvas.parentElement;
        if (parent != null) {
            this.renderer.setSize(parent.clientWidth, parent.clientHeight);
        }
    }
}

class ForestScene extends THREE.Scene {
    constructor() {
        super();

        this.initializeGround();
    }

    private initializeGround() {
        const geom = new THREE.PlaneBufferGeometry(1000, 1000, 10, 10);
        const material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
        const ground = new THREE.Mesh(geom, material);
        this.add(ground);
    }
}
