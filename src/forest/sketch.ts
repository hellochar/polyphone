import { database } from "firebase";
import * as THREE from "three";

import PostPass from "../post";
import { AudioManager } from "./audioManager";
import { Noise } from "../common/noise";

// let frequencyAmplitudes: Uint8Array;

// interface Thing extends THREE.Object3D {
//     animate(): void;
// }

export class ForestSketch {
//     public renderer: THREE.WebGLRenderer;
//     public scene: ForestScene;
//     public camera: THREE.PerspectiveCamera;
//     private composer: THREE.EffectComposer;
//     private diControls?: THREE.DeviceOrientationControls;
//     private orbitControls?: THREE.OrbitControls;
//     public users: Map<string, User> = new Map();
//     // public audio: AudioPlayer;

//     private dummyCamera = new THREE.PerspectiveCamera();
//     private keys: Set<number> = new Set();

//     get aspectRatio() {
//         return this.renderer.domElement.height / this.renderer.domElement.width;
//     }

//     get self() {
//         return this.users.get(getMyUserId());
//     }

    constructor(public db: database.Database, public audioManager: AudioManager, public canvas: HTMLCanvasElement) {
    }
//         frequencyAmplitudes = this.audioManager.getFrequencyAmplitudes();
//         (window as any).sketch = this;
//         this.renderer = this.initRenderer();
//         this.scene = new ForestScene(this);

//         this.updateCanvasSize();
//         window.addEventListener("resize", () => {
//             this.updateCanvasSize();
//         });

//         this.camera = new THREE.PerspectiveCamera(60, 1 / this.aspectRatio, 1, 5000);
//         // this.scene.add(this.camera);
//         // this.dummyCamera = new THREE.PerspectiveCamera(60, 1 / this.aspectRatio, 1, 5000);
//         // this.scene.add(this.dummyCamera);

//         this.orbitControls = new THREE.OrbitControls(this.dummyCamera, this.canvas);
//         window.addEventListener("deviceorientation", (evt) => {
//             if (evt.alpha && evt.gamma && evt.beta) {
//                 this.diControls = new THREE.DeviceOrientationControls(this.dummyCamera);
//                 this.orbitControls = undefined;
//             }
//         }, {
//             once: true,
//         });

//         this.composer = this.initComposer();

//         this.initMyUser();
//         this.setupUsersListeners();

//         requestAnimationFrame(this.animate);

//         this.setupEvents();

//         // this.audio.prepare();
//     }

//     private touches = 0;
//     private setupEvents() {
//         this.canvas.addEventListener("touchstart", () => {
//             this.touches++;
//         });
//         this.canvas.addEventListener("touchend", () => {
//             this.touches--;
//         });
//         document.addEventListener("keydown", (evt) => {
//             this.keys.add(evt.keyCode);
//         });
//         document.addEventListener("keyup", (evt) => {
//             this.keys.delete(evt.keyCode);
//         });
//     }

//     private syncUsersWithDatabase(dbUsers: DatabaseUsers) {
//         // add new users (they will autosync)
//         // delete old users, TODO
//         // const oldUserIds = this.users.keys();
//         for (const userId in dbUsers) {
//             if (!this.users.has(userId)) {
//                 const ref = this.db.ref(`users/${userId}`);
//                 const user = new User(ref);
//                 this.users.set(userId, user);
//                 this.scene.add(user);
//             }
//         }
//     }

//     private async initMyUser() {
//         // Add myself to the database
//         try {
//             const myUserId = getMyUserId();

//             // const myUserIdRef = this.db.ref(`userIds/${myUserId}`);
//             // await myUserIdRef.set(true);

//             const myUserRef = this.db.ref(`users/${myUserId}`);
//             const newUser: DatabaseUser = {
//                 position: {
//                     x: THREE.Math.randFloat(-200, 200),
//                     y: THREE.Math.randFloat(0, 20),
//                     z: THREE.Math.randFloat(-200, 200),
//                 },
//                 rotation: {
//                     x: 0,
//                     y: 0,
//                     z: 0,
//                 },
//                 color: (new THREE.Color(Math.random(), Math.random(), Math.random())).getHex(),
//             };
//             await myUserRef.set(newUser);
//         } catch (e) {
//             throw e;
//         }
//     }

//     private setupUsersListeners() {
//         const usersRef = this.db.ref("users/");
//         usersRef.on("value", (snapshot) => {
//             if (snapshot != null) {
//                 const users: DatabaseUsers = snapshot.val();
//                 this.syncUsersWithDatabase(users);
//             }
//         });
//     }

//     private initRenderer() {
//         const renderer = new THREE.WebGLRenderer({
//             canvas: this.canvas,
//             antialias: true,
//         });
//         renderer.autoClear = true;
//         renderer.setClearColor(0x808080);

//         renderer.shadowMap.enabled = true;
//         renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//         renderer.toneMapping = THREE.Uncharted2ToneMapping;
//         renderer.toneMappingExposure = 0.9;
//         renderer.toneMappingWhitePoint = 1.1;

//         return renderer;
//     }

//     private initComposer() {
//         const composer = new THREE.EffectComposer(this.renderer);

//         composer.addPass(new THREE.RenderPass(this.scene, this.camera));

//         // const ssaa = new (THREE as any).SSAARenderPass(this.scene, this.camera);
//         // ssaa.unbiased = true;
//         // ssaa.sampleLevel = 2;
//         // composer.addPass(ssaa);

//         // const sao = new THREE.SAOPass(this.scene, this.camera, false, true);
//         // // sao.params.output = THREE.SAOPass.OUTPUT.SAO;
//         // sao.params.saoBias = 0.2;
//         // sao.params.saoIntensity = 0.030;
//         // sao.params.saoScale = 90;
//         // sao.params.saoKernelRadius = 40;
//         // sao.params.saoBlur = true;
//         // composer.addPass(sao);

//         const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(this.canvas.width, this.canvas.height), 0.4, 0.7, 0.85);
//         composer.addPass(bloomPass);

//         // const adaptiveToneMappingPass = new THREE.AdaptiveToneMappingPass(true, 256);
//         // composer.addPass(adaptiveToneMappingPass);

//         const post = new PostPass();
//         composer.addPass(post);

//         composer.passes[composer.passes.length - 1].renderToScreen = true;
//         return composer;
//     }

//     public animate = (millisDt: number) => {
//         try {
//             this.audioManager.update();
//             if (this.diControls) {
//                 this.diControls.update();
//             }
//             if (this.orbitControls) {
//                 this.orbitControls.update();
//             }
//             // console.log(this.camera.rotation);
//             this.scene.animate();
//             for (const user of this.users.values()) {
//                 user.animate();
//             }
            
//             if (this.self != null) {
//                 if (this.camera.parent == null) {
//                     this.self.add(this.camera);
//                     this.camera.position.set(0, 50, 50);
//                     this.camera.position.setLength(200);
//                     this.camera.lookAt(this.self.position.x, this.self.position.y + 25, this.self.position.z);
//                 }
//                 this.self.quaternion.copy(this.dummyCamera.quaternion);
//                 if (this.touches > 0) {
//                     this.self.move(0, 0, -2);
//                 }
//                 console.log(this.keys);
//                 if (this.keys.has(37)) { // left
//                     this.self.move(-2, 0, 0);
//                 }
//                 if (this.keys.has(38)) { // up
//                     this.self.move(0, 0, -2);
//                 }
//                 if (this.keys.has(39)) { // right
//                     this.self.move(2, 0, 0);
//                 }
//                 if (this.keys.has(40)) { // down
//                     this.self.move(0, 0, 2);
//                 }
//                 this.self.pushSharedState();
//             }

//             this.composer.render();
//             requestAnimationFrame(this.animate);
//         } catch (e) {
//             document.body.innerText = `Error: ${e.name} - ${e.message}. ${e.stack}`;
//         }
//     };

//     dispose() {
//         this.renderer.dispose();
//     }

//     private updateCanvasSize() {
//         const parent = this.canvas.parentElement;
//         if (parent != null) {
//             this.renderer.setSize(parent.clientWidth, parent.clientHeight);
//             // console.log(parent.clientWidth, parent.clientHeight);
//             if (this.camera != null) {
//                 this.camera.aspect = 1 / this.aspectRatio;
//                 this.camera.updateProjectionMatrix();
//             }
//         }
//     }
// }

// class ForestScene extends THREE.Scene implements Thing {
//     things: Thing[] = [];
//     private sky: Sky;

//     constructor(public sketch: ForestSketch) {
//         super();

//         this.things.push(new Ground());
//         this.things.push(new Spheres());

//         const lights = new Lights();
//         this.things.push(lights);

//         this.sky = new Sky();
//         this.sky.sky.material.uniforms.sunPosition.value.copy(lights.light1.position);
//         this.things.push(this.sky);

//         this.add(...this.things);
//     }

//     animate() {
//         if (this.sketch.audioManager.isPlaying()) {
//             this.sky.setNightTime();
//         } else {
//             this.sky.setDayTime();
//         }
//         for(const t of this.things) {
//             t.animate();
//         }
//     }
// }

// class Ground extends THREE.Mesh implements Thing {
//     private noise: Noise;
//     private t: number;
//     constructor() {
//         const geom = new THREE.PlaneGeometry(1000, 1000, 50, 50);
//         geom.rotateX(-Math.PI / 2);
//         const material = new THREE.MeshStandardMaterial({
//             roughness: 1,
//             color: "#202020",
//             side: THREE.DoubleSide,
//             metalness: 0,
//         });
//         super(geom, material);
//         this.noise = new Noise(0);
//         this.t = 0;
//         this.position.y = -200;
//         this.castShadow = true;
//         this.receiveShadow = true;
//     }

//     animate() {
//         this.t += frequencyAmplitudes[0] / 255 / 100;
//         for (const vertex of (this.geometry as THREE.PlaneGeometry).vertices) {
//             vertex.y = this.noise.simplex3(vertex.x / 250, vertex.z / 250, this.t) * 250 * (frequencyAmplitudes[0] / 255);
//         }
//         (this.geometry as THREE.PlaneGeometry).verticesNeedUpdate = true;
//     }
// }

// class Spheres extends THREE.Object3D implements Thing {
//     public meshes = (() => {
//         const meshes = [];
//         const geom = new THREE.SphereGeometry(50, 35, 35);
//         const colorOptions = [
//             // "#0f9960",
//             "#d9822b",
//             // "#db3737",
//             // "#00b3a4",
// "#5C7080",
// "#BFCCD6",
//         ];
//         const materials = colorOptions.map((c) => new THREE.MeshStandardMaterial({
//             color: c,
//             roughness: 1,
//             metalness: 0,
//         }));
//         for (let i = 0; i < 100; i++) {
//             const mesh = new THREE.Mesh(geom, materials[THREE.Math.randInt(0, materials.length - 1)]);
//             const spread = 1000;
//             mesh.position.x = THREE.Math.randFloat(-spread, spread);
//             mesh.position.z = THREE.Math.randFloat(-spread, spread);
//             mesh.position.y = THREE.Math.randFloat(0, spread);
//             mesh.scale.setScalar(THREE.Math.randFloat(0.5, 1.0));
//             mesh.castShadow = true;
//             mesh.receiveShadow = true;
//             meshes.push(mesh);
//         }
//         return meshes;
//     })();

//     constructor() {
//         super();
//         this.add(...this.meshes);
//     }

//     animate() {
//         const scale = THREE.Math.mapLinear(frequencyAmplitudes[5], 0, 255, 0.1, 10);
//         this.scale.setScalar(scale);
//         this.rotation.x += 0.002;
//         this.rotation.z += 0.0045;
//     }
// }

// class Lights extends THREE.Object3D implements Thing {
//     public light1: THREE.Light;
//     constructor() {
//         super();
//         const light1 = this.light1 = new THREE.DirectionalLight("#f5f8fa", 0.8);
//         light1.position.set(0.2, 1, 0.3).setLength(1000);
//         light1.target = this;
//         light1.castShadow = true;

//         light1.shadow.mapSize.width = 2048 * 2;
//         light1.shadow.mapSize.height = 2048 * 2;

//         light1.shadow.bias = 0.000;
//         light1.shadow.radius = 1.5; // 1 is normal; 1.5 makes it a bit blurrier
//         light1.shadow.camera.near = 100;
//         light1.shadow.camera.far = 2000;
//         light1.shadow.camera.left = -1000;
//         light1.shadow.camera.right = 1000;
//         light1.shadow.camera.top = 1000;
//         light1.shadow.camera.bottom = -1000;
//         light1.shadow.camera.updateProjectionMatrix();

//         this.add(light1);

//         this.add(new THREE.DirectionalLightHelper(light1));
//         this.add(new THREE.CameraHelper(light1.shadow.camera));

//         this.add(new THREE.AmbientLight("#182026", 3));

//         this.add(new THREE.HemisphereLight("#E3F9F7", "#182026", 0.3));
//     }

//     animate() {}
// }

// class Sky extends THREE.Object3D implements Thing {
//     public sky: THREE.Sky;
//     constructor() {
//         super();
//         this.sky = new THREE.Sky();
//         this.sky.scale.setScalar(500000);
//         this.setDayTime();

//         this.add(this.sky);
//     }

//     setDayTime() {
//         const uniforms = this.sky.material.uniforms;
//         uniforms.turbidity.value = 1;
//         uniforms.rayleigh.value = 0.8;
//         uniforms.mieCoefficient.value = 0.03;
//         uniforms.mieDirectionalG.value = 0.87;
//         uniforms.luminance.value = 1.01;
//     }

//     setNightTime() {
//         const uniforms = this.sky.material.uniforms;
//         // turbidity affects how brightly the sun/moon shines. You want turbidity ~8 for nighttime.
//         uniforms.turbidity.value = 5;
//         // rayleigh is the big thing that affects "daytime" or "nighttime". rayleigh 0 = full night, rayleigh 1 = full day
//         uniforms.rayleigh.value = 0.0;

//         uniforms.mieCoefficient.value = 0.012;
//         uniforms.mieDirectionalG.value = 0.70;
//     }

//     animate() {

//     }
// }

// class User extends THREE.Mesh implements Thing {
//     private static geometry = new THREE.TorusKnotBufferGeometry(20, 3, 100, 16);
//     constructor(public myRef: database.Reference) {
//         super(User.geometry, new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.5, roughness: 0.5 }));
//         this.castShadow = true;
//         this.receiveShadow = true;
//         // this handles updating
//         myRef.on("value", (snapshot) => {
//             if (snapshot != null) {
//                 const value: DatabaseUser = snapshot.val();
//                 this.updateSharedState(value);
//             } else {
//                 // TODO handle null
//             }
//         });

//         this.add(new THREE.AxesHelper(100));
//     }

//     public async pushSharedState() {
//         try {
//             const newUser: DatabaseUser = {
//                 position: {
//                     x: this.position.x,
//                     y: this.position.y,
//                     z: this.position.z,
//                 },
//                 rotation: {
//                     x: this.rotation.x,
//                     y: this.rotation.y,
//                     z: this.rotation.z,
//                 },
//                 color: (this.material as THREE.MeshStandardMaterial).color.getHex(),
//             };
//             await this.myRef.set(newUser);
//         } catch (e) {
//             console.error(e);
//         }
//     }

//     public move(dx: number, dy: number, dz: number) {
//         const newPosition = this.localToWorld(new THREE.Vector3(dx, dy, dz));
//         this.position.copy(newPosition);
//     }

//     private updateSharedState(databaseUser: DatabaseUser) {
//         const { position, rotation, color } = databaseUser;
//         this.position.set(position.x, position.y, position.z);
//         this.rotation.set(rotation.x, rotation.y, rotation.z);
//         if ((this.material as THREE.MeshStandardMaterial).color.getHex() !==
//             color) {
//             (this.material as THREE.MeshStandardMaterial).color.setHex(color);
//             (this.material as THREE.MeshStandardMaterial).needsUpdate = true;
//         }
//     }

//     animate() {
//         // const scale = THREE.Math.mapLinear(frequencyAmplitudes[8], 0, 255, 0.5, 2);
//         // this.scale.setScalar(scale);
//     }
}