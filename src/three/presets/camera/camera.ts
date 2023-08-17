import * as THREE from 'three';
import { getRenderer } from '../renderer/renderer';

export const camera = (renderer = getRenderer(), id = 1): THREE.PerspectiveCamera | THREE.OrthographicCamera => {
  if (!renderer) throw new Error('Renderer is not defined');
  switch (id) {
    case 0: {
      const width = renderer.domElement.width;
      const height = renderer.domElement.height;
      const aspect = width / height;
      const viewSize = 200;
      const orthoCam = new THREE.OrthographicCamera(
        (aspect * viewSize) / -2,
        (aspect * viewSize) / 2,
        viewSize / 2,
        viewSize / -2,
        1,
        10000
      );

      orthoCam.position.set(0, 100, 0);
      orthoCam.lookAt(0, 0, 0);

      return orthoCam;
    }

    case 1: {
      const perspCam = new THREE.PerspectiveCamera(
        75,
        renderer.domElement.width / renderer.domElement.height,
        0.1,
        2000
      );

      perspCam.position.set(50, 60, 50);

      return perspCam;
    }

    default:
      return new THREE.PerspectiveCamera();
  }
};
