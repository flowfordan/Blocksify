import * as THREE from "three";

export class RendererController {
  renderer: THREE.WebGLRenderer;
  activeElement: HTMLCanvasElement;
  rect: DOMRect;

  constructor(canvasRef: HTMLCanvasElement){
    //renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvasRef,
      antialias: true
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.setClearColor(0xEEEEEE);

    this.activeElement = this.renderer.domElement;
    this.rect = canvasRef.getBoundingClientRect();
  }
}