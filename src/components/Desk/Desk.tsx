import React, { useEffect, useRef, useState } from 'react';
import styles from './Desk.module.css';
import {ThreeView} from '../../three/ThreeView'
import { defCoords } from '../../three/actions/defCurrentCoords';
import { setupStore as store } from '../../store/store';
import { useAppSelector } from '../../hooks/redux';




export const Desk = (props:any): JSX.Element => {
  
  let threeView: any;
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  
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

  
  
  const [view, setView] = useState(threeView);
  const [worldCoords, setGlobalCoords] = useState(null);




  //on Mount
  useEffect(() => {
    
    const innerTreeRef = canvasRef.current!;
    threeView = new ThreeView(innerTreeRef);

    setView(threeView);
    
    resizeObserver.observe(innerTreeRef)
    
    handleResize();


    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('resize', handleResize, false);  
  }
  ,[])

  useEffect(
    
    () => {
      if(view){
      const createGeom = props.toggleCrGeom;
    }
      
    }
    , [props.toggleCrGeom])
   
  // useEffect(() => {
  //   console.log('use effect color', threeView, view)
  //   if(view){
  //     view.changeCubeColor(color)
  //     console.log('use effect color', color)
  //   }
    
  // },
  //  [color])
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
    // console.log(threeView)
    // console.log(view)
    //threeView.onMouseMove();
    if(threeView){
      setGlobalCoords(threeView.state.globalCoords)
      // console.log('setState', worldCoords)
      // console.log(threeView.state.globalCoords)
      props.setWorldCoords(threeView.state.globalCoords)
    }
      
    
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

 
