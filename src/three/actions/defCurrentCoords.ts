import * as THREE from 'three';
import { Vector3 } from 'three';
import { camera } from '../camera/camera';


let mouse = new THREE.Vector2()
let raycaster = new THREE.Raycaster();
let activeScene: THREE.Scene;
let activeElement: any;
let rect: any;
let currentCoords: Vector3;

interface ICoordsService {
    currentPosition: Vector3
}

const CoordsService: ICoordsService = {
    currentPosition: new Vector3(0,0,0) 
};




export const defCoords = (scene: THREE.Scene, renderer: THREE.WebGLRenderer ) => {

    // activeElement = renderer.domElement;
    // activeScene = scene;

    
    return 666
    
    // activeElement.addEventListener( 'pointermove', onMouseMove );
    
}

const onMouseMove = (event: any) => {

    event.preventDefault();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    mouse.x = ( x / activeElement.width ) * 2 - 1;
	mouse.y = - ( y / activeElement.height ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );
    

    // calculate objects intersecting the picking ray 
    const intersects = raycaster.intersectObjects( activeScene.children );

    for (let i = 0; i < intersects.length; i++){
        if(intersects[i].object.name === 'ground'){
            //get coords on plane
           currentCoords = intersects[i].point;
           console.log('GROUND coord', currentCoords);
           CoordsService.currentPosition = currentCoords;

        }

        //else{renderer.domElement.style.cursor = 'not-allowed'}
    }
}

