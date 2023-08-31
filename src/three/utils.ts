import * as THREE from 'three';
import { VEC2, VEC3 } from './config/consts';
import { raycaster } from './presets/common';

function getMouseLocation(
  event: MouseEvent,
  rect: DOMRect,
  canvas: HTMLCanvasElement,
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
  plane: THREE.Plane
): THREE.Vector3 {
  event.preventDefault();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  VEC2.x = (x / canvas.width) * 2 - 1;
  VEC2.y = -(y / canvas.height) * 2 + 1;
  raycaster.setFromCamera(VEC2, camera);

  raycaster.ray.intersectPlane(plane, VEC3);

  return VEC3;
}

function getObjByPointer(
  scene: THREE.Scene,
  event: MouseEvent,
  rect: DOMRect,
  canvas: HTMLCanvasElement,
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
  layerId: number
): THREE.Object3D | void {
  event.preventDefault();
  raycaster.layers.set(layerId);

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  VEC2.x = (x / canvas.width) * 2 - 1;
  VEC2.y = -(y / canvas.height) * 2 + 1;
  raycaster.setFromCamera(VEC2, camera);

  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    const object = intersects[0].object;
    return object;
  }
  return;
}

export { getMouseLocation, getObjByPointer };
