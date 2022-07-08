import * as THREE from 'three';
import { camera } from './camera/camera';
import { gridHelper } from './planeHelper';
import { dirLight, dirLightHelper, hemiLight } from './lights';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {cube} from './geometry/geometry';
import Stats from 'three/examples/jsm/libs/stats.module';
import {worldPlaneMesh, worldPlane, worldPlaneHelper} from './geometry/worldPlane';
import { AppStore } from '../store/store';
import { setupStore as store } from '../store/store';
import { UIState, updateCoords } from '../store/reducers/uiSlice';
import { CombinedState } from '@reduxjs/toolkit';
import { DrawState } from '../store/reducers/drawingSlice';
import { _vec3, _vec2, raycaster } from './common';
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';


export class ThreeView {

    store: AppStore;
    // state: CombinedState<{
    //     drawReducer: DrawState;
    //     uiReducer: UIState;
    // }>;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    activeElement: HTMLCanvasElement;
    rect: DOMRect;
    camera: any;
    groundPlane: typeof worldPlane;
    light: any;
    controls: OrbitControls;
    stats: any;
    toolsState: any
    //listeningStatus: boolean;
    

    constructor(canvasRef: HTMLCanvasElement) {
        
        this.store = store;
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

        this.groundPlane = worldPlane;

        //3dobjects
        this.scene.add(cube, worldPlaneMesh, worldPlaneHelper, gridHelper);
        cube.material.color.setHex(store.getState().uiReducer.color)

        //lights
        this.scene.add(dirLight, dirLightHelper, hemiLight)


        this.controls = new OrbitControls(this.camera,  this.activeElement)
        this.controls.enableDamping = true;

        //TEMP TOOLS STATE
        this.toolsState = {
            line: {
                status: 0,//0 - off, 1 -activated, 2 - betw 1 & 2 click, 3 - after 2 click 
                coords: []
            }, 
            polyline: {
                status: 0,
                coords: []
            }
        }

        //STATS
        this.stats = Stats()
        document.body.appendChild(this.stats.dom)
        this.stats.update()


        this.update();
        

        this.store.subscribe(this.changeCubeColor);
        this.store.subscribe(this.updGlobalCoords);
        this.store.subscribe(this.drawLine)

        this.updGlobalCoords();
        console.log(store.getState())
    }


    rdxState = () => store.getState();
    //TODO: methods for getting different reducers

    changeCubeColor = () => {
        cube.material.color.setHex(this.rdxState().uiReducer.color) 
    }

    //to show coords on ground under mouse
    updGlobalCoords = () => {
        if(this.rdxState().uiReducer.isFetchingGlobalCoords){
            this.activeElement.addEventListener( 'pointermove', this.onGetMouseLoc );
        } else if(!this.rdxState().uiReducer.isFetchingGlobalCoords){
            this.activeElement.removeEventListener( 'pointermove', this.onGetMouseLoc );
        }   
    }

    //TODO:take to dif module
    getMouseLocation = (event: PointerEvent) => {
        event.preventDefault();

        const x = event.clientX - this.rect.left;
        const y = event.clientY - this.rect.top;

        _vec2.x = ( x / this.activeElement.width ) * 2 - 1;
        _vec2.y = - ( y / this.activeElement.height ) * 2 + 1;
        raycaster.setFromCamera( _vec2, this.camera );

        raycaster.ray.intersectPlane(this.groundPlane, _vec3);

        return _vec3;
    }

    //get mouse coords on "ground" plane
    onGetMouseLoc = (event: PointerEvent) => {
        let mouseLoc = this.getMouseLocation(event)
        //console.log(mouseLoc)
        this.store.dispatch(updateCoords({x: mouseLoc.x, y: mouseLoc.y, z:mouseLoc.z}))

        //if drawLine = true...
        //
        if(this.rdxState().drawReducer.isDrawLine){

            console.log('drawing line')
            let coords = [mouseLoc.x, mouseLoc.y, mouseLoc.z]
            if(this.toolsState.line.status === 0){
                this.toolsState.line.status = 1
            }

            //esc or right mouse - dispatch false delete line
            if(this.toolsState.line.status === 1){ //
                //listening to coords
                
                this.toolsState.line.coords[0] = new THREE.Vector3().copy(mouseLoc)
                console.log('1',this.toolsState.line.coords)
                console.log('1',this.toolsState.line.status)
            }
            

            if(this.toolsState.line.status === 2){
                this.toolsState.line.coords[1]= new THREE.Vector3().copy(mouseLoc)

                console.log('2',this.toolsState.line.coords)
                //onclick - change state to 3
            }

            if(this.toolsState.line.status === 3){
                this.toolsState.line.status = 0
                //change to 1
            }           
        }
    }

    drawLine = () => {
        if(this.rdxState().drawReducer.isDrawLine&& this.toolsState.line.status === 0){
            this.toolsState.line.status = 1
        }
        if(this.rdxState().drawReducer.isDrawLine && this.toolsState.line.status === 1){
            //new line
            this.activeElement.addEventListener( 'click', this.onDrawClick);
            //addEventListener - click
        }
    }

    onDrawClick = () => {
        if(this.toolsState.line.status === 1){
            console.log('click 1');

            //***** POINT CREATING */
            let position = Float32Array.from(this.toolsState.line.coords[0])
            let pGeom = new THREE.BufferGeometry();
            pGeom.setAttribute( 'position', new THREE.BufferAttribute( position, 3 ) );
            let pMat = new THREE.PointsMaterial( { color: 0x888888 } );
            let p1 = new THREE.Points(pGeom, pMat);
            this.scene.add(p1)
            // ******************* POINT CREATE ******************* //

            //create point
            setTimeout(() => this.toolsState.line.status = 2, 0)
        }

        if(this.toolsState.line.status === 2){
            console.log('click 2')

            // ******************* POINT CREATE ******************* //
            let position = Float32Array.from(this.toolsState.line.coords[1])
            let pGeom = new THREE.BufferGeometry();
            pGeom.setAttribute( 'position', new THREE.BufferAttribute( position, 3 ) );
            let pMat = new THREE.PointsMaterial( { color: 0x888888 } );
            let p1 = new THREE.Points(pGeom, pMat);
            this.scene.add(p1)
            // ******************* POINT CREATE ******************* //

            // ******************* LINE CREATE ******************* //
            
            const lGeom = new THREE.BufferGeometry()
            .setFromPoints(this.toolsState.line.coords)
            // lGeom.setPositions(this.toolsState.line.coords)
            

            // const basicLineSolid = new LineMaterial({
            //     color: 10,
            //     linewidth: 0.8,
            //     resolution: new THREE.Vector2(640, 480),
            //     dashed: false,
            //     dashScale: 2,
            //     dashSize: 2,
            //     gapSize: 1
            // });

            const LMat = new THREE.LineBasicMaterial({
                color: 0x000000
            });

            const line = new THREE.Line( lGeom, LMat );
            this.scene.add( line );
            console.log(this.scene)
            // ******************* LINE CREATE ******************* //


            this.toolsState.line.status = 3;        
            this.activeElement.removeEventListener( 'click', this.onDrawClick);
            //cycle - start drawLine() if store true
        }
        
        


    }





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