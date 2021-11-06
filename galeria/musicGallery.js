import * as THREE from '../libs/three.js/r131/three.module.js';
import { OrbitControls } from '../libs/three.js/r131/controls/OrbitControls.js';

let renderer = null, scene = null, camera = null, orbitControls = null;

let currentTime = Date.now();
let spotLight = null;
let ambientLight = null;

const SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 2048;

function animate() {
    const now = Date.now();
    const deltat = now - currentTime;
    currentTime = now;
}

function update() {
    requestAnimationFrame(() => update());

    renderer.render(scene, camera);

    animate();

    orbitControls.update();
}

function createScene(canvas) {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(canvas.width, canvas.height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 4000);
    camera.position.set(30, 10, 20);

    orbitControls = new OrbitControls(camera, renderer.domElement);

    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-30, 15, -10);
    spotLight.target.position.set(0, 0, 0);

    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 200;
    spotLight.shadow.camera.fov = 45;
    spotLight.shadow.mapSize.width = SHADOW_MAP_WIDTH;
    spotLight.shadow.mapSize.height = SHADOW_MAP_HEIGHT;
    scene.add(spotLight);

    ambientLight = new THREE.AmbientLight(0xbbbbbb, 1.0);
    scene.add(ambientLight);

    //#region Piso de galeria 
    let marbleAlphaMap, marbleMap, marbleNormalMap, grassMap;
    marbleMap = new THREE.TextureLoader().load("assets/Textures/BazaltMarble/BAZALT-diffuse.jpg"), [];
    marbleMap.wrapS = THREE.MirroredRepeatWrapping;
    marbleMap.wrapT = THREE.MirroredRepeatWrapping;
    marbleMap.repeat.set(4.6, 4.6);

    marbleAlphaMap = new THREE.TextureLoader().load("assets/Textures/BazaltMarble/BAZALT-ao.jpg"), [];
    marbleAlphaMap.wrapS = THREE.MirroredRepeatWrapping;
    marbleAlphaMap.wrapT = THREE.MirroredRepeatWrapping;
    marbleAlphaMap.repeat.set(4.6, 4.6);

    marbleNormalMap = new THREE.TextureLoader().load("assets/Textures/BazaltMarble/BAZALT-normal.jpg"), [];
    marbleNormalMap.wrapS = THREE.MirroredRepeatWrapping;
    marbleNormalMap.wrapT = THREE.MirroredRepeatWrapping;
    marbleNormalMap.repeat.set(4.6, 4.6);

    grassMap = new THREE.TextureLoader().load("assets/Textures/Grass/GrassGreenTexture0002.jpg"), [];
    grassMap.wrapS = THREE.RepeatWrapping;
    grassMap.wrapT = THREE.RepeatWrapping;
    grassMap.repeat.set(70, 70);

    let color = 0xffffff;

    const geometry = new THREE.PlaneGeometry(400, 400);
    const floor = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: color, map: marbleMap, side: THREE.DoubleSide }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -25;
    floor.position.z = 22;
    floor.castShadow = false;
    floor.receiveShadow = true;
    //#endregion Piso de galeria

    //#region paredes galeria
    const mapUrl = "assets/Textures/BiancoMarble/BIANCO-ao.jpg";
    const texture = new THREE.TextureLoader().load(mapUrl);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(20, 20);

    const geometryWallFront = new THREE.BoxGeometry(400, 50, 1);
    const wallFront = new THREE.Mesh(geometryWallFront, new THREE.MeshPhongMaterial({ color: color, map: marbleAlphaMap, side: THREE.DoubleSide }));
    wallFront.position.z = -178;
    wallFront.castShadow = false;
    wallFront.receiveShadow = true;

    const geometryWallBack = new THREE.BoxGeometry(400, 50, 1);
    const wallBack = new THREE.Mesh(geometryWallBack, new THREE.MeshPhongMaterial({ color: color, map: marbleAlphaMap, side: THREE.DoubleSide }));
    wallBack.position.z = 220;
    wallBack.castShadow = false;
    wallBack.receiveShadow = true;

    const geometryWallLeft = new THREE.BoxGeometry(1, 50, 399);
    const wallLeft = new THREE.Mesh(geometryWallLeft, new THREE.MeshPhongMaterial({ color: color, map: marbleAlphaMap, side: THREE.DoubleSide }));
    wallLeft.position.x = -200;
    wallLeft.position.z = 20;
    wallLeft.castShadow = false;
    wallLeft.receiveShadow = true;

    const geometryWallRight = new THREE.BoxGeometry(1, 50, 399);
    const wallRight = new THREE.Mesh(geometryWallRight, new THREE.MeshPhongMaterial({ color: color, map: marbleAlphaMap, side: THREE.DoubleSide }));
    wallRight.position.x = 200;
    wallRight.position.z = 20.5;
    wallRight.castShadow = false;
    wallRight.receiveShadow = true;

    const geometryWallTop = new THREE.BoxGeometry(400, 1, 400);
    const wallTop = new THREE.Mesh(geometryWallTop, new THREE.MeshPhongMaterial({ color: color, map: marbleAlphaMap, side: THREE.DoubleSide }));
    wallTop.position.y = 25;
    wallTop.position.z = 20.5;
    wallTop.castShadow = false;
    wallTop.receiveShadow = true;
    //#endregion paredes galeria

    scene.add(floor, wallFront, wallBack, wallLeft, wallRight, wallTop);
}

function resize() {
    const canvas = document.getElementById("webglcanvas");

    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    camera.aspect = canvas.width / canvas.height;

    camera.updateProjectionMatrix();
    renderer.setSize(canvas.width, canvas.height);
}

function main() {
    const canvas = document.getElementById("webglcanvas");
    window.addEventListener('resize', resize, false);

    createScene(canvas);

    resize();

    update();
}

main();
