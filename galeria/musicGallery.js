import * as THREE from '../libs/three.js/r131/three.module.js'
import { GLTFLoader } from '../libs/three.js/r131/loaders/GLTFLoader.js';
import { DRACOLoader } from '../libs/three.js/r125/loaders/DRACOLoader.js';
import { PointerLockControls } from '../libs/three.js/r131/controls/PointerLockControls.js';

let camera, scene, renderer, controls, raycaster;

let objects = [];

let blocker, instructions;

let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;

let prevTime = Date.now();
let velocity, direction;

let directionalLight = null, spotLight = null, ambientLight = null;

const floorUrl = "assets/Textures/piso-marmol.jpg";

function initPointerLock() {
    blocker = document.getElementById('blocker');
    instructions = document.getElementById('instructions');

    controls = new PointerLockControls(camera, document.body);

    controls.addEventListener('lock', function () {
        instructions.style.display = 'none';
        blocker.style.display = 'none';
    });

    controls.addEventListener('unlock', function () {
        blocker.style.display = 'block';
        instructions.style.display = '';
    });

    instructions.addEventListener('click', function () {
        controls.lock();
    }, false);

    scene.add(controls.getObject());
}

function onKeyDown(event) {
    switch (event.keyCode) {

        case 38: // up
        case 87: // w
            moveForward = true;
            break;

        case 37: // left
        case 65: // a
            moveLeft = true;
            break;

        case 40: // down
        case 83: // s
            moveBackward = true;
            break;

        case 39: // right
        case 68: // d
            moveRight = true;
            break;
    }

}

function onKeyUp(event) {
    switch (event.keyCode) {
        case 38: // up
        case 87: // w
            moveForward = false;
            break;

        case 37: // left
        case 65: // a
            moveLeft = false;
            break;

        case 40: // down
        case 83: // s
            moveBackward = false;
            break;

        case 39: // right
        case 68: // d
            moveRight = false;
            break;
    }
}

async function loadGLTF() {
    try {
        //#region ventanas y tragaluz
        const dracoLoad = new DRACOLoader();
        dracoLoad.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.4.0/");

        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoad);
        const WindowNoGlassL = await gltfLoader.loadAsync("assets/3D/WindowNoGlassL/scene.gltf");
        const WindowNoGlassR = await gltfLoader.loadAsync("assets/3D/WindowNoGlassR/scene.gltf");
        const WindowTopNoGlass1 = await gltfLoader.loadAsync("assets/3D/TopNoGlass/scene.gltf");
        const WindowTopNoGlass2 = await gltfLoader.loadAsync("assets/3D/TopNoGlass/scene.gltf");
        const WindowTopNoGlass3 = await gltfLoader.loadAsync("assets/3D/TopNoGlass/scene.gltf");
        const WindowTopNoGlass4 = await gltfLoader.loadAsync("assets/3D/TopNoGlass/scene.gltf");
        const bancoMetal1 = await gltfLoader.loadAsync("assets/3D/Bench/scene.gltf");
        const bancoMetal2 = await gltfLoader.loadAsync("assets/3D/Bench/scene.gltf");
        let newMaterial = new THREE.MeshPhysicalMaterial();

        let windowLeft = WindowNoGlassL.scene.children[0];
        windowLeft.scale.set(0.08, 0.08, 0.08);
        windowLeft.position.x = -499;
        windowLeft.position.z = 190;
        windowLeft.rotation.z = -Math.PI / 2;
        windowLeft.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                child.material = newMaterial;;
                child.receiveShadow = true;
                child.material.metalness = 0.9;
                child.material.clearcoat = 1;
                child.material.clearcoatRoughness = 0.6;
                child.material.roughness = 0.9;
            }
        });

        let windowRight = WindowNoGlassR.scene.children[0];
        windowRight.scale.set(0.08, 0.08, 0.08);
        windowRight.position.x = -499;
        windowRight.position.z = -85;
        windowRight.rotation.z = -Math.PI / 2;
        windowRight.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                child.material = newMaterial;;
                child.receiveShadow = true;
                child.material.metalness = 0.9;
                child.material.clearcoat = 1;
                child.material.clearcoatRoughness = 0.6;
                child.material.roughness = 0.9;
            }
        });

        let windowTop1 = WindowTopNoGlass1.scene.children[0];
        windowTop1.scale.set(30, 30, 30);
        windowTop1.position.y = 120;
        windowTop1.position.z = 25;
        windowTop1.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                child.material = newMaterial;;
                child.receiveShadow = true;
                child.material.metalness = 0.9;
                child.material.clearcoat = 1;
                child.material.clearcoatRoughness = 0.6;
                child.material.roughness = 0.9;
            }
        });

        let windowTop2 = WindowTopNoGlass2.scene.children[0];
        windowTop2.scale.set(30, 30, 30);
        windowTop2.rotation.z = 32.99;
        windowTop2.position.y = 120;
        windowTop2.position.z = 25;
        windowTop2.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                child.material = newMaterial;;
                child.receiveShadow = true;
                child.material.metalness = 0.9;
                child.material.clearcoat = 1;
                child.material.clearcoatRoughness = 0.6;
                child.material.roughness = 0.9;
            }
        });

        let windowTop3 = WindowTopNoGlass3.scene.children[0];
        windowTop3.scale.set(30, 30, 30);
        windowTop3.rotation.z = 110;
        windowTop3.position.x = -3;
        windowTop3.position.y = 120;
        windowTop3.position.z = 25;
        windowTop3.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                child.material = newMaterial;;
                child.receiveShadow = true;
                child.material.metalness = 0.9;
                child.material.clearcoat = 1;
                child.material.clearcoatRoughness = 0.6;
                child.material.roughness = 0.9;
            }
        });

        let windowTop4 = WindowTopNoGlass4.scene.children[0];
        windowTop4.scale.set(30, 30, 30);
        windowTop4.rotation.z = 80.1;
        windowTop4.position.x = -3;
        windowTop4.position.y = 120;
        windowTop4.position.z = 25;
        windowTop4.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                child.material = newMaterial;;
                child.receiveShadow = true;
                child.material.metalness = 0.9;
                child.material.clearcoat = 1;
                child.material.clearcoatRoughness = 0.6;
                child.material.roughness = 0.9;
            }
        });

        scene.add(windowLeft, windowRight, windowTop1, windowTop2, windowTop3, windowTop4);
        //#endregion ventanas

        //#region muebles y decoracion
        let banco1 = bancoMetal1.scene.children[0];
        banco1.scale.set(1,1,1);
        banco1.position.x = -260;
        banco1.position.y = -130;
        banco1.rotation.z = -Math.PI / 2;
        banco1.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.toneMapped = false;
                child.material.metalness = 0.1;
                child.material.roughness = 1;
                child.material.clearcoat = 0.9;
                child.material.clearcoatRoughness = 0.1;
            }
        });

        let banco2 = bancoMetal2.scene.children[0];
        banco2.scale.set(1,1,1);
        banco2.position.x = -130;
        banco2.position.y = -130;
        banco2.position.z = 130;
        banco2.rotation.x = -Math.PI / 2;
        banco2.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.toneMapped = false;
                child.material.metalness = 0.1;
                child.material.roughness = 1;
                child.material.clearcoat = 0.9;
                child.material.clearcoatRoughness = 0.1;
            }
        });

        scene.add(banco1, banco2);
        //#endregion muebles y decoracion
    }
    catch (err) {
        console.error(err);
    }
}

function createScene(canvas) {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(canvas.width, canvas.height);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    velocity = new THREE.Vector3();
    direction = new THREE.Vector3();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xffffff);

    /*  directionalLight = new THREE.DirectionalLight( 0xaaaaaa, 1);
        directionalLight.position.set(0, 5, 100);
    
        scene.add(directionalLight); */

    /*  spotLight = new THREE.SpotLight (0xffffff);
        spotLight.position.set(0, 8, 100);
        scene.add(spotLight); */

    ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // A light source positioned directly above the scene, with color fading from the sky color to the ground color. 
    // HemisphereLight( skyColor, groundColor, intensity )
    // skyColor - (optional) hexadecimal color of the sky. Default is 0xffffff.
    // groundColor - (optional) hexadecimal color of the ground. Default is 0xffffff.
    // intensity - (optional) numeric value of the light's strength/intensity. Default is 1.

    let light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
    light.position.set(0, -124, 22);
    scene.add(light);

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    // Raycaster( origin, direction, near, far )
    // origin — The origin vector where the ray casts from.
    // direction — The direction vector that gives direction to the ray. Should be normalized.
    // near — All results returned are further away than near. Near can't be negative. Default value is 0.
    // far — All results returned are closer then far. Far can't be lower then near . Default value is Infinity.
    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 15);

    //#region piso de galeria
    let map = new THREE.TextureLoader().load(floorUrl);
    map.wrapS = map.wrapT = THREE.MirroredRepeatWrapping;
    map.repeat.set(6, 6);

    let floorGeometry = new THREE.PlaneGeometry(1000, 1000, 100, 100);
    let floor = new THREE.Mesh(floorGeometry, new THREE.MeshPhongMaterial({ color: 0xffffff, map: map, side: THREE.DoubleSide }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -124;
    floor.position.z = 22;
    floor.castShadow = false;
    floor.receiveShadow = true;
    //#endregion piso de galeria

    //#region paredes galeria
    let marbleAlphaMap;
    marbleAlphaMap = new THREE.TextureLoader().load("assets/Textures/wall_white.jpg"), [];
    marbleAlphaMap.wrapS = THREE.MirroredRepeatWrapping;
    marbleAlphaMap.wrapT = THREE.MirroredRepeatWrapping;
    marbleAlphaMap.repeat.set(7, 7);

    const geometryWallFront = new THREE.BoxGeometry(1000, 250, 1);
    let wallFront = new THREE.Mesh(geometryWallFront, new THREE.MeshLambertMaterial({ color: 0xffffff, map: marbleAlphaMap, side: THREE.DoubleSide }));
    wallFront.position.z = -478;
    wallFront.castShadow = false;
    wallFront.receiveShadow = true;

    const geometryWallBack = new THREE.BoxGeometry(1000, 250, 1);
    const wallBack = new THREE.Mesh(geometryWallBack, new THREE.MeshPhongMaterial({ color: 0xffffff, map: marbleAlphaMap, side: THREE.DoubleSide }));
    wallBack.position.z = 522;
    wallBack.castShadow = false;
    wallBack.receiveShadow = true;

    const geometryWallLeft = new THREE.BoxGeometry(1, 250, 999);
    const wallLeft = new THREE.Mesh(geometryWallLeft, new THREE.MeshPhongMaterial({ color: 0xffffff, map: marbleAlphaMap, side: THREE.DoubleSide }));
    wallLeft.position.x = -500;
    wallLeft.position.z = 22;
    wallLeft.castShadow = false;
    wallLeft.receiveShadow = true;

    const geometryWallRight = new THREE.BoxGeometry(1, 250, 999);
    const wallRight = new THREE.Mesh(geometryWallRight, new THREE.MeshPhongMaterial({ color: 0xffffff, map: marbleAlphaMap, side: THREE.DoubleSide }));
    wallRight.position.x = 500;
    wallRight.position.z = 22;
    wallRight.castShadow = false;
    wallRight.receiveShadow = true;

    const geometryWallTop = new THREE.BoxGeometry(1000, 1, 1000);
    const wallTop = new THREE.Mesh(geometryWallTop, new THREE.MeshPhongMaterial({ color: 0xffffff, map: marbleAlphaMap, side: THREE.DoubleSide }));
    wallTop.position.y = 124;
    wallTop.position.z = 20.5;
    wallTop.castShadow = false;
    wallTop.receiveShadow = true;

    scene.add(floor, wallFront, wallBack, wallLeft, wallRight, wallTop);

    const geometryWallDivision1 = new THREE.BoxGeometry(1, 250, 999);
    const wallDivision1 = new THREE.Mesh(geometryWallDivision1, new THREE.MeshPhongMaterial({ color: 0xffffff, map: marbleAlphaMap, side: THREE.DoubleSide }));
    wallDivision1.position.x = 200;
    wallDivision1.position.z = 22;
    wallDivision1.castShadow = false;
    wallDivision1.receiveShadow = true;

    const geometryWallDivision2 = new THREE.BoxGeometry(300, 250, 1);
    const wallDivision2 = new THREE.Mesh(geometryWallDivision2, new THREE.MeshPhongMaterial({ color: 0xffffff, map: marbleAlphaMap, side: THREE.DoubleSide }));
    wallDivision2.position.x = 350;
    wallDivision2.castShadow = false;
    wallDivision2.receiveShadow = true;
    //#endregion paredes galeria

    scene.add(wallDivision1, wallDivision2);

    loadGLTF();
    initPointerLock();
}

function update() {
    requestAnimationFrame(update);

    if (controls.isLocked === true) {
        raycaster.ray.origin.copy(controls.getObject().position);
        raycaster.ray.origin.y -= 10;

        let intersections = raycaster.intersectObjects(objects);
        let onObject = intersections.length > 0;
        let time = Date.now();
        let delta = (time - prevTime) / 100;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);

        direction.normalize(); // this ensures consistent movements in all directions

        if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;

        if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

        if (onObject === true) {
            velocity.y = Math.max(0, velocity.y);
        }

        controls.moveRight(- velocity.x * delta);
        controls.moveForward(- velocity.z * delta);
        controls.getObject().position.y += (velocity.y * delta); // new behavior

        if (controls.getObject().position.y < 10) {
            velocity.y = 0;
            controls.getObject().position.y = 10;
        }

        prevTime = time;
    }
    renderer.render(scene, camera);
}

function main() {
    const canvas = document.getElementById("webglcanvas");

    createScene(canvas);
    update();
}

function resize() {
    const canvas = document.getElementById("webglcanvas");

    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    camera.aspect = canvas.width / canvas.height;

    camera.updateProjectionMatrix();
    renderer.setSize(canvas.width, canvas.height);
}

window.onload = () => {
    main();
    resize();
};

window.addEventListener('resize', resize, false);