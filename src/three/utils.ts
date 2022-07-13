import * as THREE from 'three'
import { _vec3, _vec2, raycaster } from './common';

function getMouseLocation (
    event: MouseEvent, 
    rect: DOMRect, 
    canvas: HTMLCanvasElement, 
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
    plane: THREE.Plane): THREE.Vector3 {
    event.preventDefault();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    _vec2.x = ( x / canvas.width ) * 2 - 1;
    _vec2.y = - ( y / canvas.height ) * 2 + 1;
    raycaster.setFromCamera( _vec2, camera );

    raycaster.ray.intersectPlane(plane, _vec3);

    return _vec3;
}

export {getMouseLocation}