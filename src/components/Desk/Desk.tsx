import React, { useEffect, useRef } from 'react';
import styles from './Desk.module.css';
import {ThreeView} from '../../three/ThreeView'


export const Desk = (props:any): JSX.Element => {
  
  let threeView: any;
  const canvasScene = useRef<null | HTMLCanvasElement>(null);
  const canvasUI = useRef<null | HTMLCanvasElement>(null);
  const canvasContainer = useRef<null | HTMLDivElement>(null)
  
  const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      //on view params change
	  console.log('resize')
      if(threeView){
        console.log('resize observ trigger', entry.contentRect.width, entry.contentRect.height, window.innerWidth, window.innerHeight)
        threeView.onWindowResize(
          entry.contentRect.width, entry.contentRect.height
        )
      }
    });
  });

  const containerObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      //on view params change
	  console.log('resize container')
      if(threeView){
        console.log('resize observ trigger', 
		entry.contentRect.width, entry.contentRect.height)
        // threeView.onWindowResize(
        //   entry.contentRect.width, entry.contentRect.height
        // )
      }
    });
  });

  //on Mount
  useEffect(() => {
    
    const innerTreeRef = canvasScene.current!;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    threeView = new ThreeView(innerTreeRef);
    
    resizeObserver.observe(innerTreeRef, {box: 'content-box'});

	//containerObserver.observe(canvasContainer.current!)

  }
  ,[])
  

  const handleResize = () => {
    threeView.onWindowResize(window.innerWidth, window.innerHeight);
    // console.log(window.innerWidth, window.innerHeight)
  };

  return (
	<div ref={canvasContainer} className={styles.desk}>
    	<canvas ref={canvasScene} {...props} className={styles.canvasScene} id='canvasScene'/>
	</div>    
);

  // return (
  //     <div className={styles.desk}>
  //       {/* <canvas ref={canvasUI} {...props} className={styles.canvasUI} id='canvasUI'/> */}
  //       <canvas ref={canvasScene} {...props} className={styles.canvasScene} id='canvasScene'/>
  //     </div>
  // );
}

 
