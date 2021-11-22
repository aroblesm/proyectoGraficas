import * as THREE from '../libs/three.js/r131/three.module.js'
import { GLTFLoader } from '../libs/three.js/r131/loaders/GLTFLoader.js';
import { DRACOLoader } from '../libs/three.js/r125/loaders/DRACOLoader.js';
import { PointerLockControls } from '../libs/three.js/r131/controls/PointerLockControls.js';
import { MTLLoader } from '../libs/three.js/r131/loaders/MTLLoader.js';
import { OBJLoader } from '../libs/three.js/r131/loaders/OBJLoader.js';


let camera, scene, renderer, controls, raycaster, objectList = [];

let objects = [];

let blocker, instructions;

let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;

let prevTime = Date.now();
let velocity, direction;

let directionalLight = null, spotLight = null, ambientLight = null;

let objMtlModelUrl = { obj: 'assets/3D/Portrait/3d-model.obj', mtl: 'assets/3D/Portrait/3d-model.mtl' };

const floorUrl = "assets/Textures/piso-marmol.jpg";

function onError(err) { console.error(err); };

function onProgress(xhr) {
    if (xhr.lengthComputable) {

        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log(xhr.target.responseURL, Math.round(percentComplete, 2) + '% downloaded');
    }
}

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

async function loadObjMtl(objModelUrl, objectList) {
    try {
        const mtlLoader = new MTLLoader();

        const materials = await mtlLoader.loadAsync(objModelUrl.mtl, onProgress, onError);

        materials.preload();

        const objLoader = new OBJLoader();

        objLoader.setMaterials(materials);

        const miTop10 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const miTop9 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const miTop8 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const miTop7 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const miTop6 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const miTop5 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const miTop4 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const miTop3 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const miTop2 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const miTop1 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);

        const topMundial10 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const topMundial9 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const topMundial8 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const topMundial7 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const topMundial6 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const topMundial5 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const topMundial4 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const topMundial3 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const topMundial2 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const topMundial1 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);

        const topMexico10 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const topMexico9 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const topMexico8 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const topMexico7 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const topMexico6 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const topMexico5 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const topMexico4 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const topMexico3 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const topMexico2 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        const topMexico1 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);

        // Cuadros en sala principal (mi top 10)
        miTop10.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        miTop10.position.x = -30;
        miTop10.position.y = -40;
        miTop10.position.z = -475;
        miTop10.scale.set(0.03, 0.04, 0.04);

        miTop9.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        miTop9.position.x = -300;
        miTop9.position.y = -40;
        miTop9.position.z = -475;
        miTop9.scale.set(0.03, 0.04, 0.04);

        miTop8.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        miTop8.rotation.y = -300;
        miTop8.position.x = -499;
        miTop8.position.y = -40;
        miTop8.position.z = -275;
        miTop8.scale.set(0.03, 0.04, 0.04);

        miTop7.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        miTop7.rotation.y = -300;
        miTop7.position.x = -499;
        miTop7.position.y = -40;
        miTop7.position.z = -75;
        miTop7.scale.set(0.03, 0.04, 0.04);

        miTop6.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        miTop6.rotation.y = -300;
        miTop6.position.x = -499;
        miTop6.position.y = -40;
        miTop6.position.z = 115;
        miTop6.scale.set(0.03, 0.04, 0.04);

        miTop5.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        miTop5.rotation.y = -300;
        miTop5.position.x = -499;
        miTop5.position.y = -40;
        miTop5.position.z = 315;
        miTop5.scale.set(0.03, 0.04, 0.04);

        miTop4.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        miTop4.rotation.y = -600;
        miTop4.position.x = -280;
        miTop4.position.y = -40;
        miTop4.position.z = 518;
        miTop4.scale.set(0.03, 0.04, 0.04);

        miTop3.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        miTop3.rotation.y = -600;
        miTop3.position.x = -20;
        miTop3.position.y = -40;
        miTop3.position.z = 518;
        miTop3.scale.set(0.03, 0.04, 0.04);

        miTop2.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        miTop2.rotation.y = -190;
        miTop2.position.x = 190;
        miTop2.position.y = -40;
        miTop2.position.z = 150;
        miTop2.scale.set(0.03, 0.04, 0.04);

        miTop1.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        miTop1.rotation.y = -190;
        miTop1.position.x = 190;
        miTop1.position.y = -40;
        miTop1.position.z = -80;
        miTop1.scale.set(0.03, 0.04, 0.04);

        objectList.push(miTop1, miTop2, miTop3, miTop4, miTop5, miTop6, miTop7, miTop8, miTop9, miTop10);
        scene.add(miTop1, miTop2, miTop3, miTop4, miTop5, miTop6, miTop7, miTop8, miTop9, miTop10);

        // Cuadros en sala secundaria izquierda (top 10 mundial)
        topMundial1.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        topMundial1.position.x = 260;
        topMundial1.position.y = -25;
        topMundial1.position.z = -475;
        topMundial1.scale.set(0.02, 0.03, 0.03);

        topMundial2.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        topMundial2.position.x = 400;
        topMundial2.position.y = -25;
        topMundial2.position.z = -475;
        topMundial2.scale.set(0.02, 0.03, 0.03);

        topMundial2.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        topMundial2.position.x = 400;
        topMundial2.position.y = -25;
        topMundial2.position.z = -475;
        topMundial2.scale.set(0.02, 0.03, 0.03);

        topMundial3.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        topMundial3.rotation.y = -190;
        topMundial3.position.x = 497;
        topMundial3.position.y = -25;
        topMundial3.position.z = -390;
        topMundial3.scale.set(0.02, 0.03, 0.03);

        topMundial4.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        topMundial4.rotation.y = -190;
        topMundial4.position.x = 497;
        topMundial4.position.y = -25;
        topMundial4.position.z = -270;
        topMundial4.scale.set(0.02, 0.03, 0.03);

        topMundial5.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        topMundial5.rotation.y = -190;
        topMundial5.position.x = 497;
        topMundial5.position.y = -25;
        topMundial5.position.z = -155;
        topMundial5.scale.set(0.02, 0.03, 0.03);

        topMundial6.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        topMundial6.rotation.y = -190;
        topMundial6.position.x = 497;
        topMundial6.position.y = -25;
        topMundial6.position.z = -45;
        topMundial6.scale.set(0.02, 0.03, 0.03);

        topMundial7.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        topMundial7.rotation.y = -600;
        topMundial7.position.x = 410;
        topMundial7.position.y = -25;
        topMundial7.position.z = 45;
        topMundial7.scale.set(0.02, 0.03, 0.03);

        topMundial8.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        topMundial8.rotation.y = -600;
        topMundial8.position.x = 290;
        topMundial8.position.y = -25;
        topMundial8.position.z = 45;
        topMundial8.scale.set(0.02, 0.03, 0.03);

        topMundial9.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        topMundial9.rotation.y = -300;
        topMundial9.position.x = 210;
        topMundial9.position.y = -25;
        topMundial9.position.z = -50;
        topMundial9.scale.set(0.02, 0.03, 0.03);

        topMundial10.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        topMundial10.rotation.y = -300;
        topMundial10.position.x = 210;
        topMundial10.position.y = -25;
        topMundial10.position.z = -190;
        topMundial10.scale.set(0.02, 0.03, 0.03);

        objectList.push(topMundial1, topMundial2, topMundial4, topMundial5, topMundial6, topMundial7, topMundial8, topMundial9, topMundial10);
        scene.add(topMundial1, topMundial2, topMundial3, topMundial4, topMundial5, topMundial6, topMundial7, topMundial8, topMundial9, topMundial10);

        // Cuadros en sala secundaria derecha (top 10 México)
        topMexico1.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        topMexico1.rotation.y = 600;
        topMexico1.position.x = 410;
        topMexico1.position.y = -25;
        topMexico1.position.z = 519;
        topMexico1.scale.set(0.02, 0.03, 0.03);

        topMexico2.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        topMexico2.rotation.y = 600;
        topMexico2.position.x = 270;
        topMexico2.position.y = -25;
        topMexico2.position.z = 519;
        topMexico2.scale.set(0.02, 0.03, 0.03);

        topMexico3.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        topMexico3.rotation.y = -190;
        topMexico3.position.x = 497;
        topMexico3.position.y = -25;
        topMexico3.position.z = 450;
        topMexico3.scale.set(0.02, 0.03, 0.03);

        topMexico4.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        topMexico4.rotation.y = -190;
        topMexico4.position.x = 497;
        topMexico4.position.y = -25;
        topMexico4.position.z = 340;
        topMexico4.scale.set(0.02, 0.03, 0.03);

        topMexico5.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        topMexico5.rotation.y = -190;
        topMexico5.position.x = 497;
        topMexico5.position.y = -25;
        topMexico5.position.z = 230;
        topMexico5.scale.set(0.02, 0.03, 0.03);

        topMexico6.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        topMexico6.rotation.y = -190;
        topMexico6.position.x = 497;
        topMexico6.position.y = -25;
        topMexico6.position.z = 120;
        topMexico6.scale.set(0.02, 0.03, 0.03);

        topMexico7.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        topMexico7.position.x = 290;
        topMexico7.position.y = -25;
        topMexico7.position.z = 52;
        topMexico7.scale.set(0.02, 0.03, 0.03);

        topMexico8.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        topMexico8.position.x = 410;
        topMexico8.position.y = -25;
        topMexico8.position.z = 52;
        topMexico8.scale.set(0.02, 0.03, 0.03);

        topMexico9.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        topMexico9.rotation.y = 190;
        topMexico9.position.x = 210;
        topMexico9.position.y = -25;
        topMexico9.position.z = 145;
        topMexico9.scale.set(0.02, 0.03, 0.03);

        topMexico10.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        topMexico10.rotation.y = 190;
        topMexico10.position.x = 210;
        topMexico10.position.y = -25;
        topMexico10.position.z = 280;
        topMexico10.scale.set(0.02, 0.03, 0.03);

        objectList.push(topMexico1, topMexico2, topMexico3, topMexico4, topMexico5, topMexico6, topMexico7, topMexico8, topMexico9, topMexico10);
        scene.add(topMexico1, topMexico2, topMexico3, topMexico4, topMexico5, topMexico6, topMexico7, topMexico8, topMexico9, topMexico10);
    }
    catch (err) {
        onError(err);
    }
}

async function loadGLTF() {
    try {
        //#region marcos y bancos
        const dracoLoad = new DRACOLoader();
        dracoLoad.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.4.0/");

        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoad);
        const bancoMetal1 = await gltfLoader.loadAsync("assets/3D/Bench/scene.gltf");
        const bancoMetal2 = await gltfLoader.loadAsync("assets/3D/Bench/scene.gltf");

        let banco1 = bancoMetal1.scene.children[0];
        banco1.scale.set(1, 1, 1);
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
        banco2.scale.set(1, 1, 1);
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
    scene.background = new THREE.Color(0xffffff);

    loadObjMtl(objMtlModelUrl, objectList);

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

    const geometryWallDivision1 = new THREE.BoxGeometry(15, 250, 650);
    const wallDivision1 = new THREE.Mesh(geometryWallDivision1, new THREE.MeshPhongMaterial({ color: 0xffffff, map: marbleAlphaMap, side: THREE.DoubleSide }));
    wallDivision1.position.x = 200;
    wallDivision1.position.z = 30;
    wallDivision1.castShadow = false;
    wallDivision1.receiveShadow = true;

    const geometryWallDivision2 = new THREE.BoxGeometry(300, 250, 1);
    const wallDivision2 = new THREE.Mesh(geometryWallDivision2, new THREE.MeshPhongMaterial({ color: 0xffffff, map: marbleAlphaMap, side: THREE.DoubleSide }));
    wallDivision2.position.x = 350;
    wallDivision2.position.z = 50;
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