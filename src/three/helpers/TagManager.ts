import * as THREE from 'three';
import { Vector3 } from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { BASE_DIRECTION } from 'three/config/consts';
import { SnappingStatuses } from './SnapManager';
import { SceneModifier } from 'three/services/SceneModifier';

//TODO refactor creation of 3d objects & nodes - too heavy
class TagsManager {
  // tagContainers: Array<HTMLDivElement>;
  sceneModifier: SceneModifier;
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
  constructor(sceneModifier: SceneModifier) {
    this.sceneModifier = sceneModifier;
    this.baseDirection = BASE_DIRECTION;

    //DIV container options
    this.tagContainers = { lengths: [], angles: [] };

    //tag 2d css options
    this.toolTags = { lengths: [], angles: [] };

    this.initContainers();
  }

  //create div containers for tags
  //TODO - quantity of containers?
  private initContainers() {
    const QUANT = 2;

    const container = document.createElement('div');
    container.className = 'label';
    container.style.marginTop = '-1em';

    for (let i = 0; i < QUANT; i++) {
      //lengths tags
      this.tagContainers.lengths[i] = container.cloneNode(true) as HTMLDivElement;

      //angles tags
      // this.tagContainers.angles[i].style.marginTop = '-3em';
      this.tagContainers.angles[i] = container.cloneNode(true) as HTMLDivElement;
      // this.toolTags.angles[i] = new CSS2DObject(this.tagContainers.lengths[i]);
    }

    // this.scene.add(...this.toolTags.lengths);
    // this.scene.add(...this.toolTags.angles);
  }

  //TODO refactor
  //divide - 2 labels (polygon), 1 label (line), 1 label (angle)
  renderTag = (v0: Array<THREE.Vector3>, v1: THREE.Vector3, snapStatuses?: SnappingStatuses) => {
    this.sceneModifier.removeObjs(...this.toolTags.lengths, ...this.toolTags.angles);

    //lengths tags
    for (let i = 0; i < v0.length; i++) {
      this.toolTags.lengths[i] = new CSS2DObject(this.tagContainers.lengths[i]);

      this.tagContainers.lengths[i].textContent = `${v0[i].distanceTo(v1).toFixed(2)} m`;
      this.toolTags.lengths[i].position.lerpVectors(v0[i], v1, 0.5);
    }
    //angles tags
    if (snapStatuses && snapStatuses.snap_angle.isActive) {
      const currentLines: Array<Vector3> = [];
      for (let i = 0; i < v0.length; i++) {
        currentLines[i] = new Vector3();
        currentLines[i].subVectors(v0[i], v1);
        const angleDeg = this.baseDirection.angleTo(currentLines[i]) * (180 / Math.PI);

        this.toolTags.angles[i] = new CSS2DObject(this.tagContainers.angles[i]);

        this.tagContainers.angles[i].textContent = `${angleDeg.toFixed(0)} °`;

        // const renderPos = currentLines[i].clone().
        this.toolTags.angles[i].position.lerpVectors(v0[i], v1, -0.02);
      }

      this.sceneModifier.addObjs(...this.toolTags.angles);
    }

    this.sceneModifier.addObjs(...this.toolTags.lengths);
  };

  stopRender = () => {
    this.sceneModifier.removeObjs(...this.toolTags.lengths, ...this.toolTags.angles);
    //objs cleanup
    // this.tagContainers = { lengths: [], angles: [] };
    // this.toolTags = { lengths: [], angles: [] };
  };
}

export { TagsManager };
