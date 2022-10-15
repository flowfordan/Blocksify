import * as THREE from 'three';
import { sceneState, HelperOption, toolsState } from '../../state';

//new instance is created when Tool's startDrawing() called
class HelpersManager {
  options: Array<HelperOption>;
  scene: THREE.Scene;
  grid: THREE.GridHelper | null;

  constructor(scene: THREE.Scene){
    this.options = toolsState.helpersOptions;
    this.grid = null;
    this.scene = scene;
  }

  renderGrid = () => {

    //clean up
    this.scene.remove(this.grid as THREE.Object3D)

    const gridOptions = this.options.find(i => i.type === 'grid');

    const totalSize = 5000;
    const size = gridOptions? gridOptions.value : 10;
    const division = totalSize/size;

    this.grid = new THREE.GridHelper( 5000, division, 0x4AA8FF, 0xC3C3C3 );
    this.grid.name = 'grid';

    if(!gridOptions?.isActive){
      this.grid.visible = false;
    }

    this.scene.add(this.grid);
  }
  
}

export{HelpersManager}