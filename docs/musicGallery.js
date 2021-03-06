import * as THREE from '../libs/three.js/r131/three.module.js'
import { GLTFLoader } from '../libs/three.js/r131/loaders/GLTFLoader.js';
import { DRACOLoader } from '../libs/three.js/r125/loaders/DRACOLoader.js';
import { PointerLockControls } from '../libs/three.js/r131/controls/PointerLockControls.js';
import { OBJLoader } from '../libs/three.js/r131/loaders/OBJLoader.js';

/*
Variables de  main.js
*/
import AudioPlayer from './audio.js';

const audioPlayer = new AudioPlayer();

let imagenURL;
let audioURL;
let songName;

let miTopImagenesURL = [];
let miTopImagenesURL1 = [];
let miTopAudiosURL = [];
let miTopNombres = [];

let globalTopImagenesURL = [];
let globalTopAudiosURL = [];
let globalTopNombres = [];

let mexicoTopImagenesURL = [];
let mexicoTopAudiosURL = [];
let mexicoTopNombres = [];

let camera, scene, renderer, controls, raycaster, objectList = [];

let objects = [];
let miTopObjetos = [];
let globalTopObjetos = [];
let mexicoTopObjetos = [];

let blocker, instructions;

let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;

let prevTime = Date.now();
let velocity, direction;
let ambientLight = null;

let objMtlModelUrl;

//console.log(miTopObjetos)
let objModelUrl = { obj: 'assets/3D/DiscoBall/uploads_files_1946232_bola+de+espelhos.obj', normalMap: 'assets/3D/DiscoBall/Mirror_Ball.1Normal.jpg' };

const floorUrl = "assets/Textures/piso-marmol.jpg";

// variable to store our intervalID
let nIntervId;


const getAccessToken = () => {
    const params = new URLSearchParams(window.location.hash.substr(1));
    if (params.has('access_token') && params.get('token_type') == 'Bearer')
        return params.get('access_token');
    return null;
};

const accessToken = getAccessToken();
// (async () => {

const spotifyFetch = (urlPath) =>
    fetch(`https://api.spotify.com/v1/${urlPath}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    }).then((response) => response.json());
//})();



/*
hasta aqui y el if de abajo con su else también es parte del main
*/

if (accessToken) {
    document.getElementById('webglcanvas').style.display = 'block';
    document.getElementById('blocker').style.display = 'block';
    document.getElementById('stats-page').style.display = 'block';
    spotifyFetch('me/top/tracks?limit=10&time_range=short_term').then((res) => {
        //document.getElementById('top-10-user').innerHTML =
        try {
            imagenURL = "";
            audioURL = "";
            songName = "";
            for (let k = 0; k <= 9; k++) {
                imagenURL = res.items[k].album.images[0].url;
                audioURL = res.items[k].preview_url;
                songName = res.items[k].name;
                console.log("Name song short " + songName);
                console.log("URL imagen: " + imagenURL);
                console.log("URL audio: " + audioURL);
                miTopImagenesURL.push(imagenURL);
                miTopAudiosURL.push(audioURL);
                //miTopNombres.push(songName);
                //createObjtMtlModelURL(imagenURL);

            }
            console.log("dentro de fetch: " + miTopImagenesURL);
        } catch (e) {
            console.log("Error" + e);
        }
    }).then(function () {
        //console.log(myval) // logs "foo"
        console.log("en funcion then: " + miTopImagenesURL);
        //setTimeout(() => console.log("Ya quedo2"+miTopImagenesURL), 0); // logs "foo"

        console.log('Your access token is', accessToken);
        objMtlModelUrl = { obj: 'assets/3D/Portrait/3d-model.obj', url: miTopImagenesURL[0] }//url: miTopImagenesURL[k] }
        console.log(objMtlModelUrl)
        main();
        resize();
    });



    spotifyFetch('me/top/tracks?limit=10&time_range=medium_term').then((res) => {
        //document.getElementById('top-10-user').innerHTML =
        try {
            imagenURL = "";
            audioURL = "";
            songName = "";
            for (let k = 0; k <= 9; k++) {
                imagenURL = res.items[k].album.images[0].url;
                audioURL = res.items[k].preview_url;
                songName = res.items[k].name;
                console.log("Name song medium" + songName);
                console.log("URL imagen: " + imagenURL);
                console.log("URL audio: " + audioURL);
                globalTopImagenesURL.push(imagenURL);
                globalTopAudiosURL.push(audioURL);
                //miTopNombres.push(songName);
                //createObjtMtlModelURL(imagenURL);

            }
            console.log("dentro de fetch global: " + globalTopImagenesURL);
        } catch (e) {
            console.log("Error" + e);
        }
    }).then(function () {
        //console.log(myval) // logs "foo"
        console.log("en funcion then: " + globalTopImagenesURL);
        //setTimeout(() => console.log("Ya quedo2"+miTopImagenesURL), 0); // logs "foo"

        console.log('Your access token is', accessToken);
        objMtlModelUrl = { obj: 'assets/3D/Portrait/3d-model.obj', url: globalTopImagenesURL[0] }//url: miTopImagenesURL[k] }
        console.log(objMtlModelUrl)
        main();
        resize();
    });


    spotifyFetch('me/top/tracks?limit=10&time_range=long_term').then((res) => {
        //document.getElementById('top-10-user').innerHTML =
        try {
            imagenURL = "";
            audioURL = "";
            songName = "";
            for (let k = 0; k <= 9; k++) {
                imagenURL = res.items[k].album.images[0].url;
                audioURL = res.items[k].preview_url;
                songName = res.items[k].name;
                console.log("Name song long " + songName);
                console.log("URL imagen: " + imagenURL);
                console.log("URL audio: " + audioURL);
                mexicoTopImagenesURL.push(imagenURL);
                mexicoTopAudiosURL.push(audioURL);
                //miTopNombres.push(songName);
                //createObjtMtlModelURL(imagenURL);

            }
            console.log("dentro de fetch global: " + mexicoTopImagenesURL);
        } catch (e) {
            console.log("Error" + e);
        }
    }).then(function () {
        //console.log(myval) // logs "foo"
        console.log("en funcion then: " + mexicoTopImagenesURL);
        //setTimeout(() => console.log("Ya quedo2"+miTopImagenesURL), 0); // logs "foo"

        console.log('Your access token is', accessToken);
        objMtlModelUrl = { obj: 'assets/3D/Portrait/3d-model.obj', url: mexicoTopImagenesURL[0] }//url: miTopImagenesURL[k] }
        console.log(objMtlModelUrl)
        main();
        resize();
        mouseInit();
        //mouseOver();
        //setTimeout('', 100000);
        //mouseOut();
    });

} else {
    document.getElementById('login-page').style.display = 'block';
    document.getElementById('login-btn').addEventListener('click', () => {
        const spotifyAuthParams = new URLSearchParams();
        spotifyAuthParams.set('client_id', '1b65edd0776c4ec3a1db2ee16d6c9c18');
        spotifyAuthParams.set('response_type', 'token');
        const original_url = window.location.origin + window.location.pathname;
        console.log("Aqui " + original_url);
        spotifyAuthParams.set('redirect_uri', original_url);
        spotifyAuthParams.set('scope', ['user-top-read'].join(' '));
        const params = spotifyAuthParams.toString();
        console.log("Aqui " + original_url);
        window.location.replace(`https://accounts.spotify.com/authorize?${params}`);
    });
}

function onError(err) { console.error(err); };

function onProgress(xhr) {
    if (xhr.lengthComputable) {

        const percentComplete = xhr.loaded / xhr.total * 100;
        //console.log(xhr.target.responseURL, Math.round(percentComplete, 2) + '% downloaded');
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

async function loadObj(objModelUrl, objectList) {
    try {
        const ball = await new OBJLoader().loadAsync(objModelUrl.obj, onProgress, onError);
        let texture = objModelUrl.hasOwnProperty('normalMap') ? new THREE.TextureLoader().load(objModelUrl.normalMap) : null;

        ball.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = texture;
            }
        });

        ball.scale.set(0.2, 0.2, 0.2);
        ball.position.x = -170;
        ball.position.y = 45;
        ball.name = "discoBallObj";
        objectList.push(ball);
        scene.add(ball);
    }
    catch (err) {
        onError(err);
    }
}

async function loadObjMtl(objModelUrl, objectList) {
    try {
        const objLoader = new OBJLoader();
        const miTop10 = await objLoader.loadAsync('assets/3D/Portrait/3d-model.obj', onProgress, onError);
        let textureMiTop10 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(miTopImagenesURL[9]) : null;
        const miTop9 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        let textureMiTop9 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(miTopImagenesURL[8]) : null;
        const miTop8 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        let textureMiTop8 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(miTopImagenesURL[7]) : null;
        const miTop7 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        let textureMiTop7 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(miTopImagenesURL[6]) : null;
        const miTop6 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        let textureMiTop6 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(miTopImagenesURL[5]) : null;
        const miTop5 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        let textureMiTop5 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(miTopImagenesURL[4]) : null;
        const miTop4 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        let textureMiTop4 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(miTopImagenesURL[3]) : null;
        const miTop3 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        let textureMiTop3 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(miTopImagenesURL[2]) : null;
        const miTop2 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        let textureMiTop2 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(miTopImagenesURL[1]) : null;
        const miTop1 = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
        let textureMiTop1 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(miTopImagenesURL[0]) : null;

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

        let textureTopMundial10 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(globalTopImagenesURL[9]) : null
        let textureTopMundial9 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(globalTopImagenesURL[8]) : null;
        let textureTopMundial8 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(globalTopImagenesURL[7]) : null;
        let textureTopMundial7 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(globalTopImagenesURL[6]) : null;
        let textureTopMundial6 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(globalTopImagenesURL[5]) : null;
        let textureTopMundial5 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(globalTopImagenesURL[4]) : null;
        let textureTopMundial4 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(globalTopImagenesURL[3]) : null;
        let textureTopMundial3 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(globalTopImagenesURL[2]) : null;
        let textureTopMundial2 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(globalTopImagenesURL[1]) : null;
        let textureTopMundial1 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(globalTopImagenesURL[0]) : null;

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

        let textureTopMexico10 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(mexicoTopImagenesURL[9]) : null
        let textureTopMexico9 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(mexicoTopImagenesURL[8]) : null;
        let textureTopMexico8 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(mexicoTopImagenesURL[7]) : null;
        let textureTopMexico7 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(mexicoTopImagenesURL[6]) : null;
        let textureTopMexico6 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(mexicoTopImagenesURL[5]) : null;
        let textureTopMexico5 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(mexicoTopImagenesURL[4]) : null;
        let textureTopMexico4 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(mexicoTopImagenesURL[3]) : null;
        let textureTopMexico3 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(mexicoTopImagenesURL[2]) : null;
        let textureTopMexico2 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(mexicoTopImagenesURL[1]) : null;
        let textureTopMexico1 = objModelUrl.hasOwnProperty('url') ? new THREE.TextureLoader().load(mexicoTopImagenesURL[0]) : null;

        // Cuadros en sala principal (mi top 10)
        miTop10.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureMiTop10;
            }
        });
        miTop10.name = 'miTop10';
        miTop10.position.x = -10;
        miTop10.position.z = -475;
        miTop10.rotation.z = Math.PI / 2;
        miTop10.scale.set(0.03, 0.04, 0.04);

        miTop9.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureMiTop9;
            }
        });
        miTop9.position.x = -300;
        miTop9.position.z = -475;
        miTop9.rotation.z = Math.PI / 2;
        miTop9.scale.set(0.03, 0.04, 0.04);

        miTop8.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureMiTop8;
            }
        });
        miTop8.rotation.y = -300;
        miTop8.rotation.z = Math.PI / 2;
        miTop8.position.x = -499;
        miTop8.position.z = -325;
        miTop8.scale.set(0.03, 0.04, 0.04);

        miTop7.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureMiTop7;
            }
        });
        miTop7.rotation.y = -300;
        miTop7.rotation.z = Math.PI / 2;
        miTop7.position.x = -499;
        miTop7.position.z = -125;
        miTop7.scale.set(0.03, 0.04, 0.04);

        miTop6.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureMiTop6;
            }
        });
        miTop6.rotation.y = -300;
        miTop6.rotation.z = Math.PI/2;
        miTop6.position.x = -499;
        miTop6.position.z = 85;
        miTop6.scale.set(0.03, 0.04, 0.04);

        miTop5.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureMiTop5;
            }
        });
        miTop5.rotation.y = -300;
        miTop5.rotation.z = Math.PI/2;
        miTop5.position.x = -499;
        miTop5.position.z = 285;
        miTop5.scale.set(0.03, 0.04, 0.04);

        miTop4.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureMiTop4;
            }
        });
        miTop4.rotation.y = -600;
        miTop4.rotation.z = Math.PI/2;
        miTop4.position.x = -330;
        miTop4.position.z = 518;
        miTop4.scale.set(0.03, 0.04, 0.04);

        miTop3.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureMiTop3;
            }
        });
        miTop3.rotation.y = -600;
        miTop3.rotation.z = Math.PI/2;
        miTop3.position.x = -80;
        miTop3.position.z = 518;
        miTop3.scale.set(0.03, 0.04, 0.04);

        miTop2.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureMiTop2;
            }
        });
        miTop2.rotation.y = -190;
        miTop2.rotation.z = Math.PI/2;
        miTop2.position.x = 190;
        miTop2.position.z = 190;
        miTop2.scale.set(0.03, 0.04, 0.04);

        miTop1.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureMiTop1;
            }
        });
        miTop1.rotation.y = -190;
        miTop1.rotation.z = Math.PI/2;
        miTop1.position.x = 190;
        miTop1.position.z = -20;
        miTop1.scale.set(0.03, 0.04, 0.04);

        objectList.push(miTop1, miTop2, miTop3, miTop4, miTop5, miTop6, miTop7, miTop8, miTop9, miTop10);
        scene.add(miTop1, miTop2, miTop3, miTop4, miTop5, miTop6, miTop7, miTop8, miTop9, miTop10);

        // Cuadros en sala secundaria izquierda (top 10 mundial)
        topMundial1.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureTopMundial1;
            }
        });
        topMundial1.rotation.z = Math.PI/2;
        topMundial1.position.x = 260;
        topMundial1.position.z = -475;
        topMundial1.scale.set(0.02, 0.03, 0.03);

        topMundial2.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureTopMundial2;
            }
        });
        topMundial2.rotation.z = Math.PI/2;
        topMundial2.position.x = 400;
        topMundial2.position.z = -475;
        topMundial2.scale.set(0.02, 0.03, 0.03);

        topMundial3.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureTopMundial3;
            }
        });
        topMundial3.rotation.y = -190;
        topMundial3.rotation.z = Math.PI/2;
        topMundial3.position.x = 497;
        topMundial3.position.z = -345;
        topMundial3.scale.set(0.02, 0.03, 0.03);

        topMundial4.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureTopMundial4;
            }
        });
        topMundial4.rotation.y = -190;
        topMundial4.rotation.z = Math.PI/2;
        topMundial4.position.x = 497;
        topMundial4.position.z = -230;
        topMundial4.scale.set(0.02, 0.03, 0.03);

        topMundial5.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureTopMundial5;
            }
        });
        topMundial5.rotation.y = -190;
        topMundial5.rotation.z = Math.PI/2;
        topMundial5.position.x = 497;
        topMundial5.position.z = -110;
        topMundial5.scale.set(0.02, 0.03, 0.03);

        topMundial6.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureTopMundial6;
            }
        });
        topMundial6.rotation.y = -190;
        topMundial6.rotation.z = Math.PI/2;
        topMundial6.position.x = 497;
        topMundial6.position.z = 10;
        topMundial6.scale.set(0.02, 0.03, 0.03);

        topMundial7.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureTopMundial7;
            }
        });
        topMundial7.rotation.y = -600;
        topMundial7.rotation.z = Math.PI/2;
        topMundial7.position.x = 365;
        topMundial7.position.z = 45;
        topMundial7.scale.set(0.02, 0.03, 0.03);

        topMundial8.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureTopMundial8;
            }
        });
        topMundial8.rotation.y = -600;
        topMundial8.rotation.z = Math.PI/2;
        topMundial8.position.x = 250;
        topMundial8.position.z = 45;
        topMundial8.scale.set(0.02, 0.03, 0.03);

        topMundial9.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureTopMundial9;
            }
        });
        topMundial9.rotation.y = -300;
        topMundial9.rotation.z = Math.PI/2;
        topMundial9.position.x = 210;
        topMundial9.position.z = -100;
        topMundial9.scale.set(0.02, 0.03, 0.03);

        topMundial10.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureTopMundial10;
            }
        });
        topMundial10.rotation.y = -300;
        topMundial10.rotation.z = Math.PI/2;
        topMundial10.position.x = 210;
        topMundial10.position.z = -240;
        topMundial10.scale.set(0.02, 0.03, 0.03);

        objectList.push(topMundial1, topMundial2, topMundial4, topMundial5, topMundial6, topMundial7, topMundial8, topMundial9, topMundial10);
        scene.add(topMundial1, topMundial2, topMundial3, topMundial4, topMundial5, topMundial6, topMundial7, topMundial8, topMundial9, topMundial10);

        // Cuadros en sala secundaria derecha (top 10 México)
        topMexico1.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureTopMexico1;
            }
        });
        topMexico1.rotation.y = 600;
        topMexico1.rotation.z = Math.PI/2;
        topMexico1.position.x = 370;
        topMexico1.position.z = 519;
        topMexico1.scale.set(0.02, 0.03, 0.03);

        topMexico2.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureTopMexico2;
            }
        });
        topMexico2.rotation.y = 600;
        topMexico2.rotation.z = Math.PI/2;
        topMexico2.position.x = 220;
        topMexico2.position.z = 519;
        topMexico2.scale.set(0.02, 0.03, 0.03);

        topMexico3.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureTopMexico3;
            }
        });
        topMexico3.rotation.y = -190;
        topMexico3.rotation.z = Math.PI/2;
        topMexico3.position.x = 497;
        topMexico3.position.z = 490;
        topMexico3.scale.set(0.02, 0.03, 0.03);

        topMexico4.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureTopMexico4;
            }
        });
        topMexico4.rotation.y = -190;
        topMexico4.rotation.z = Math.PI/2;
        topMexico4.position.x = 497;
        topMexico4.position.z = 390;
        topMexico4.scale.set(0.02, 0.03, 0.03);

        topMexico5.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureTopMexico5;
            }
        });
        topMexico5.rotation.y = -190;
        topMexico5.rotation.z = Math.PI/2;
        topMexico5.position.x = 497;
        topMexico5.position.z = 280;
        topMexico5.scale.set(0.02, 0.03, 0.03);

        topMexico6.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureTopMexico6;
            }
        });
        topMexico6.rotation.y = -190;
        topMexico6.rotation.z = Math.PI/2;
        topMexico6.position.x = 497;
        topMexico6.position.z = 170;
        topMexico6.scale.set(0.02, 0.03, 0.03);

        topMexico7.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureTopMexico7;
            }
        });
        topMexico7.rotation.z = Math.PI/2;
        topMexico7.position.x = 330;
        topMexico7.position.z = 52;
        topMexico7.scale.set(0.02, 0.03, 0.03);

        topMexico8.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureTopMexico8;
            }
        });
        topMexico8.rotation.z = Math.PI/2;
        topMexico8.position.x = 460;
        topMexico8.position.z = 52;
        topMexico8.scale.set(0.02, 0.03, 0.03);

        topMexico9.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureTopMexico9;
            }
        });
        topMexico9.rotation.y = 190;
        topMexico9.rotation.z = Math.PI/2;
        topMexico9.position.x = 213;
        topMexico9.position.z = 100;
        topMexico9.scale.set(0.02, 0.03, 0.03);

        topMexico10.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = textureTopMexico10;
            }
        });
        topMexico10.rotation.y = 190;
        topMexico10.rotation.z = Math.PI/2;
        topMexico10.position.x = 213;
        topMexico10.position.z = 225;
        topMexico10.scale.set(0.02, 0.03, 0.03);

        objectList.push(topMexico1, topMexico2, topMexico3, topMexico4, topMexico5, topMexico6, topMexico7, topMexico8, topMexico9, topMexico10);
        scene.add(topMexico1, topMexico2, topMexico3, topMexico4, topMexico5, topMexico6, topMexico7, topMexico8, topMexico9, topMexico10);
    }
    catch (err) {
        onError(err);
    }
}

function mouseInit(){
    let j=Math.floor(Math.random() * 3);
    let i=Math.floor(Math.random() * 10);

    if(j===0){
        setTimeout(function(){ audioPlayer.playPause(miTopAudiosURL[i])}, 10000);
        setTimeout(function(){ mouseInit();}, 20000);
    }

    if(j===1){
        setTimeout(function(){ audioPlayer.playPause(globalTopAudiosURL[i])}, 10000);
        setTimeout(function(){ mouseInit();}, 20000);
    }

    if(j===2){
        setTimeout(function(){ audioPlayer.playPause(mexicoTopAudiosURL[i])}, 10000);
        setTimeout(function(){ mouseInit();}, 20000);
    }
}

function mouseOver(url) {
    audioPlayer.playPause(url);
    //console.log("REpr"+miTopAudiosURL[9]);
  }
  
  function mouseOut() {
    audioPlayer.playPause(miTopAudiosURL[9]);
  }

async function loadGLTF() {
    try {
        //#region bancos
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
        //#endregion bancos
    }
    catch (err) {
        console.error(err);
    }
}

function changeColor() {
    // check if already an interval has been set up
    if (!nIntervId) {
        nIntervId = setInterval(flashColor, 1500);
    }
}

// random para cambiar colorwa
function flashColor() {
    const colors = "#" + Math.floor(Math.random() * 16777215).toString(16);
    ambientLight.color.set(colors);
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

    loadObj(objModelUrl, objectList);
    loadObjMtl(objMtlModelUrl, objectList);
    //loadObjMtl(miTopObjetos[0], objectList);

    // A light source positioned directly above the scene, with color fading from the sky color to the ground color. 
    // HemisphereLight( skyColor, groundColor, intensity )
    // skyColor - (optional) hexadecimal color of the sky. Default is 0xffffff.
    // groundColor - (optional) hexadecimal color of the ground. Default is 0xffffff.
    // intensity - (optional) numeric value of the light's strength/intensity. Default is 1.

    let light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
    light.position.set(0, -124, 22);
    scene.add(light);

    ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

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
    changeColor();
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
    //main();
    //resize();
};

window.addEventListener('resize', resize, false);
