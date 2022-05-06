import React, { useEffect, useRef, useState } from 'react';
import styles from './Desk.module.css';
import {ThreeView} from '../../three/ThreeView'

export const Desk = (props:any): JSX.Element => {
  
  console.log(props)
  const canvasRef = useRef<null | HTMLCanvasElement>(null)
  
  const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      console.log('width', entry.contentRect.width);
      console.log('height', entry.contentRect.height);

      threeView.onWindowResize(entry.contentRect.width, entry.contentRect.height)

    });
  });

  let threeView: any;
  

  const [view, setView] = useState(threeView);

  //on Mount
  useEffect(() => {

    const innerTreeRef = canvasRef.current!;
    threeView = new ThreeView(innerTreeRef);
    setView(threeView);
    
    resizeObserver.observe(innerTreeRef)
    
    handleResize();  

    //window.addEventListener('mousemove', mouseMove);
    window.addEventListener('resize', handleResize, false);  
  }
  ,[])

  useEffect(
    
    () => {
      if(view){
      const createGeom = props.toggleCrGeom;
      view.createGeom(createGeom)
    }
      
    }
    , [props.toggleCrGeom])
  
//   componentDidUpdate(prevProps, prevState) {
//     // Pass updated props to 
//     const createGeom = props.toggleCrGeom;
//     this.viewGL.updateValue(newValue);
// }

// componentWillUnmount() {
//   // Remove any event listeners
//   window.removeEventListener('mousemove', this.mouseMove);
//   window.removeEventListener('resize', this.handleResize);
// }



  const mouseMove = () => {
    threeView.onMouseMove();
  }

  const handleResize = () => {
    threeView.onWindowResize(window.innerWidth, window.innerHeight);
    // console.log(window.innerWidth, window.innerHeight)
  };

  return (

      <div className={styles.desk}>
        <canvas ref={canvasRef} {...props} className={styles.board} id='mainCanvas'/>
      </div>

  );
}

 
