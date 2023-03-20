import * as THREE from 'three';
import { Vector3 } from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { sceneState, SnapOptions } from '../../shared/model';

//TODO refactor creation of 3d objects & nodes - too heavy
class TagsManager {
  // tagContainers: Array<HTMLDivElement>;
  scene: THREE.Scene;
  toolTags: {
    lengths: Array<CSS2DObject>;
    angles: Array<CSS2DObject>;
  };

  tagContainers: {
    lengths: Array<HTMLDivElement>;
    angles: Array<HTMLDivElement>;
  };

  baseDirection: THREE.Vector3;

  //TODO: call new TagManager in StartDrawing()
  //create CSS2D object in constructor
  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.baseDirection = sceneState.baseDirection;

    //container options
    this.tagContainers = { lengths: [], angles: [] };

    //tag options
    this.toolTags = { lengths: [], angles: [] };
  }

  renderTag = (v0: Array<THREE.Vector3>, v1: THREE.Vector3, snapOptions?: SnapOptions) => {
    const line = new Vector3();
    line.subVectors(v0[0], v1);

    this.scene.remove(...this.toolTags.lengths, ...this.toolTags.angles);

    //lengths tags
    for (let i = 0; i < v0.length; i++) {
      this.tagContainers.lengths[i] = document.createElement('div');
      this.tagContainers.lengths[i].className = 'label';
      this.tagContainers.lengths[i].style.marginTop = '-1em';
      this.toolTags.lengths[i] = new CSS2DObject(this.tagContainers.lengths[i]);

      this.tagContainers.lengths[i].textContent = `${v0[i].distanceTo(v1).toFixed(2)} m`;
      this.toolTags.lengths[i].position.lerpVectors(v0[i], v1, 0.5);
    }
    //angles tags
    if (snapOptions && snapOptions.angle.isActive) {
      const currentLines: Array<Vector3> = [];
      for (let i = 0; i < v0.length; i++) {
        currentLines[i] = new Vector3();
        currentLines[i].subVectors(v0[i], v1);
        const angleDeg = this.baseDirection.angleTo(currentLines[i]) * (180 / Math.PI);

        this.tagContainers.angles[i] = document.createElement('div');
        this.tagContainers.angles[i].className = 'label';
        this.tagContainers.angles[i].style.marginTop = '-3em';
        this.toolTags.angles[i] = new CSS2DObject(this.tagContainers.angles[i]);

        this.tagContainers.angles[i].textContent = `${angleDeg.toFixed(0)} °`;

        // const renderPos = currentLines[i].clone().
        this.toolTags.angles[i].position.lerpVectors(v0[i], v1, -0.02);
      }

      this.scene.add(...this.toolTags.angles);
    }

    this.scene.add(...this.toolTags.lengths);
  };

  stopRender = () => {
    this.scene.remove(...this.toolTags.lengths, ...this.toolTags.angles);
    //objs cleanup
    this.tagContainers = { lengths: [], angles: [] };
    this.toolTags = { lengths: [], angles: [] };
  };
}

export { TagsManager };
