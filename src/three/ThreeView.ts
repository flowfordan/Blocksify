import { Line } from './tools/Line';
import { Polygon } from './tools/Polygon';
import * as THREE from 'three';
import { camera } from './camera/camera';
import { getGridHelper, gridHelper } from './helpers/gridHelper';
import { dirLight, dirLightHelper, hemiLight } from './lights';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {cube} from './geometry/geometry';
import Stats from 'three/examples/jsm/libs/stats.module';
import {worldPlaneMesh, worldPlane, worldPlaneHelper} from './geometry/worldPlane';

import { getMouseLocation } from './utils';

import { autorun, reaction, toJS } from "mobx";
import { Layer, layersState, sceneState, toolsState } from '../state';


export class ThreeView {
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    activeElement: HTMLCanvasElement;
    rect: DOMRect;
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
    groundPlane: typeof worldPlane;
    light: any;
    controls: OrbitControls;
    stats: any;
	
    tools: {
        line: Line,
        pLine: Line,
        polygon: Polygon
    };
    currentTool: number|undefined;

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

        this.camera = camera();
        this.controls = new OrbitControls(this.camera,  this.activeElement)

        this.groundPlane = worldPlane;

        //3dobjects
        this.scene.add(cube, worldPlaneMesh, worldPlaneHelper);
        cube.material.color.setHex(0x84CBFF)

        //lights
        this.scene.add(dirLight, dirLightHelper, hemiLight)

        this.currentLayer = null;

        //TOOLS STATE
        this.tools = {
            line: new Line(this.activeElement, this.scene, 0),
            pLine: new Line(this.activeElement, this.scene, 1),
            polygon: new Polygon(this.activeElement, this.scene),
        };
        this.currentTool = undefined;

		this.currentLayer = layersState.layers.find(l => l.active)!

        //STATS
        this.stats = Stats();
        //document.body.appendChild(this.stats.dom);
        this.stats.update();
        this.update();

        //subscription to observe App State
        this.updState();
    }

    updState = () => {
        autorun(() => {
            this.updGlobalCoords()
        });

        autorun(() => {
            this.setActiveDrawingTool()
        });

		reaction(
			() => layersState.layers.find(l => l.active), 
			(value, previousValue, reaction) => { 
				if(value?.id !== previousValue?.id){
					this.setLayer()
				} 
			}
		);

        autorun(() => {
            this.setCamera()
        })

		autorun(() => {
            this.setHelpers()
        })
    }

    setCamera = () => {
        //0 - top camera, 1 - perspective
        let curCamId = sceneState.currentCamera
        if(curCamId === 0){
            this.camera = camera(this.renderer, curCamId);
            this.controls = new OrbitControls(this.camera,  this.activeElement)
            //this.controls.enableDamping = true;
            this.controls.enableRotate = false;
            //enable all existing layers
            layersState.layers.forEach(i => this.camera.layers.enable(i.id))
        } else if(curCamId === 1){
            this.camera = camera(this.renderer, curCamId)
            this.controls = new OrbitControls(this.camera,  this.activeElement)
            //enable all existing layers
            layersState.layers.forEach(i => this.camera.layers.enable(i.id))
        }
    }

    setLayer = () => {
        let current = layersState.layers.find(l => l.active)
        if(current){
            this.currentLayer = current;
			this.setActiveDrawingTool();
        }
    }

	//TODO: rewrite without many ifs elses
    setActiveDrawingTool = () => {
		
        let activeToolId = toolsState.drawingTools.find(i => i.active)?
        toolsState.drawingTools.find(i => i.active)!.id : undefined;

        let prevToolId = this.currentTool;
        let prevToolName;
		console.log('PREV TOOL', prevToolId, 'CURRENT', this.currentTool)

		//if there was tool in use - stop it
        if(typeof prevToolId === 'number'){
			console.log('error')
           prevToolName = toolsState.drawingTools.find(i => i.id === prevToolId)!.name
           this.tools[prevToolName].stopDrawing();
        }
        
		//activate new tool
        if(typeof activeToolId === 'number'){
			console.log(activeToolId, 'LAYER', this.currentLayer)
            let toolName = toolsState.drawingTools.find(i => i.active)!.name

            this.tools[toolName].startDrawing(this.camera, this.groundPlane, this.currentLayer!);
            this.currentTool = activeToolId;
            
            window.addEventListener('keydown', this.onExit)
        } else {
            // if(typeof prevToolId === 'number'){
                this.currentTool = undefined;
                window.removeEventListener('keydown', this.onExit)
        }
    }

	setHelpers = () => {
		//grid test
		const helperName = 'grid_helper';
		const size = sceneState.helpersOptions[3].value

		const newGridHelper = getGridHelper(size, helperName);

		const prevGrid = this.scene.getObjectByName(helperName);
		if(prevGrid){
			this.scene.remove(prevGrid);
		}

		this.scene.add(newGridHelper);

		console.log(this.scene.children)
	}

    onExit = (event: KeyboardEvent) => {
        if(event.key === "Escape"){
            let activeToolId = toolsState.drawingTools.find(i => i.active)?
                toolsState.drawingTools.find(i => i.active)!.id : undefined;
            
            if(typeof activeToolId === 'number'){
                let toolName = toolsState.drawingTools.find(i => i.active)!.name
                this.tools[toolName].stopDrawing();
                this.tools[toolName].toolState = 0;
                this.currentTool = undefined;

               toolsState.setActiveTool(activeToolId);

               window.removeEventListener('keydown', this.onExit)
            }
        }
    }

    //to show coords on ground under mouse
    updGlobalCoords = () => {
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
        let aspect = vpW / vpH
        let viewSize = 200
        //upd camera ratio depending on cam Type
        if(this.camera instanceof THREE.PerspectiveCamera){
           this.camera.aspect = aspect 
        } else {
            this.camera.left = aspect*viewSize / -2
            this.camera.right = aspect*viewSize / 2
            this.camera.top = viewSize / 2
            this.camera.bottom =  viewSize / -2
        }
        
        this.camera.updateProjectionMatrix();
    }

    // ******************* RENDER LOOP ******************* //
    update() {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.update.bind(this));
        this.controls.update()
        this.stats.update() 
    }   
}