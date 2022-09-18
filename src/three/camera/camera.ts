import * as THREE from 'three';
import { renderer as initRenderer } from '../renderer/renderer';

const camera = (renderer = initRenderer, id = 1): THREE.PerspectiveCamera| THREE.OrthographicCamera => {
    switch(id){
        case 0: {
            let width = renderer.domElement.width
            let height = renderer.domElement.height
            let aspect = width/height
            let viewSize = 200
            const orthoCam = new THREE.OrthographicCamera(
                aspect*viewSize / -2, 
                aspect*viewSize / 2, 
                viewSize / 2, 
                viewSize / -2, 1, 10000
            )

            orthoCam.position.set(0, 100, 0)
            orthoCam.lookAt(0,0,0)

            return orthoCam
        }
        
        case 1:{
           const perspCam = new THREE.PerspectiveCamera(
            75,
            renderer.domElement.width / renderer.domElement.height, 
            0.1, 
            2000)

            perspCam.position.set(50, 60, 50)

            return perspCam 
        }

        default: return new THREE.PerspectiveCamera()

    }
    
} 





export {camera}