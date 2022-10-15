import React, { useEffect, useRef } from 'react';
import styles from './Desk.module.css';
import {ThreeView} from '../../three/ThreeView';
import "./desk-style.css";


export const Desk = (props:any): JSX.Element => {
  
  let threeView: any;
  const canvasScene = useRef<null | HTMLCanvasElement>(null);
  const canvasUI = useRef<null | HTMLCanvasElement>(null);
  const canvasContainer = useRef<null | HTMLDivElement>(null)
  
  const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      //on view params change
      if(threeView){
        threeView.onWindowResize(
          entry.contentRect.width, entry.contentRect.height
        )
      }
    });
  });

  //on Mount
  useEffect(() => {
    
    const innerTreeRef = canvasScene.current!;
    threeView = new ThreeView(innerTreeRef);
    
    resizeObserver.observe(innerTreeRef, {box: 'content-box', });

  }
  , [])
  

  return (
    <div ref={canvasContainer} className={styles.desk}>
      <canvas ref={canvasScene} {...props} className={styles.canvasScene} id='canvasScene'/>
    </div>    
  );
}

 
