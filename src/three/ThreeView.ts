import { Line } from './tools/Line';
import * as THREE from 'three';
import { camera } from './camera/camera';
import { gridHelper } from './planeHelper';
import { dirLight, dirLightHelper, hemiLight } from './lights';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {cube} from './geometry/geometry';
import Stats from 'three/examples/jsm/libs/stats.module';
import {worldPlaneMesh, worldPlane, worldPlaneHelper} from './geometry/worldPlane';

import { getMouseLocation } from './utils';

import { autorun } from "mobx";
import { Layer, layersState, sceneState, toolsState } from '../state';


export class ThreeView {
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    activeElement: HTMLCanvasElement;
    rect: DOMRect;
    camera: THREE.PerspectiveCamera;
    groundPlane: typeof worldPlane;
    light: any;
    controls: OrbitControls;
    stats: any; 
    tools: {
        line: Line
    };
    currentLayer: Layer|null;

    constructor(canvasRef: HTMLCanvasElement) {
        
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xb3deff );
        
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasRef,
            antialias: true,
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.setClearColor(0xEEEEEE);

        this.activeElement = this.renderer.domElement;
        this.rect = canvasRef.getBoundingClientRect();

        this.camera = camera;

        this.currentLayer = null

        this.groundPlane = worldPlane;

        //3dobjects
        this.scene.add(cube, worldPlaneMesh, worldPlaneHelper, gridHelper);
        cube.material.color.setHex(0x0fda54)

        //lights
        this.scene.add(dirLight, dirLightHelper, hemiLight)


        this.controls = new OrbitControls(this.camera,  this.activeElement)
        this.controls.enableDamping = true;

        //TOOLS STATE
        this.tools = {
            line: new Line(this.activeElement, this.rect, this.scene, 0),
            //pLine: new pLine()
        }

        //STATS
        this.stats = Stats();
        document.body.appendChild(this.stats.dom);
        this.stats.update();
        this.update();

        //subscription to observe App State
        this.updState()
    }

    updState = () => {
        autorun(() => {
            this.updGlobalCoords()
        });

        autorun(() => {
            this.setActiveDrawingTool()
        });

        autorun(() => {
            this.setLayer()
        })
    }

    setLayer = () => {
        let current = layersState.layers.find(l => l.active)
        if(current){
            this.currentLayer = current;
            this.camera.layers.enable(current.id)
        }
        
    }

    setActiveDrawingTool = () => {
        if(toolsState.isDrawLine 
            && this.tools.line.toolState === 0){
                this.tools.line.startDrawing(this.camera, this.groundPlane, this.currentLayer!);
                this.listenToAbort();
                
        } else if (!toolsState.isDrawLine 
        && this.tools.line.toolState !== 0) {
            this.tools.line.stopDrawing();
            this.tools.line.toolState = 0;

            window.removeEventListener('keydown', this.onAbort)
        }

        //TODO:else if for POLYLINE
    }

    listenToAbort = () => {
        //handle escape
        window.addEventListener('keydown', this.onAbort)
    }

    onAbort = (event: KeyboardEvent) => {
        if(event.key === "Escape"){
            toolsState.toggleDrawLine(false);
            this.setActiveDrawingTool();
        }
    }

    //to show coords on ground under mouse
    updGlobalCoords = () => {
        let a = cube.layers
        if(sceneState.isFetchingGlobalCoords){
            this.activeElement.addEventListener( 'pointermove', this.onUpdMouseLoc );
        } else {
            this.activeElement.removeEventListener( 'pointermove', this.onUpdMouseLoc );
        }   
    }


    //get mouse coords on "ground" plane
    onUpdMouseLoc = (event: MouseEvent) => {
        let mouseLoc = getMouseLocation(
            event, this.rect, this.activeElement,
            this.camera, this.groundPlane);

        //send mouseloc to State
        //TODO:not send new obj every time
        sceneState.setGlobalCoords({
            x: mouseLoc.x, 
            y: mouseLoc.y,
            z:mouseLoc.z
        })
    };

    onWindowResize(vpW:any, vpH:any) {
        this.renderer.setSize(vpW, vpH);
        this.camera.aspect = vpW / vpH
        this.camera.updateProjectionMatrix()
    }

    // ******************* RENDER LOOP ******************* //
    update() {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.update.bind(this));
        this.controls.update()
        this.stats.update() 
    }   
}