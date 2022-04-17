import React, { useEffect, useRef } from 'react';
import styles from './Desk.module.css';
import {ThreeView} from '../../three/ThreeView'

export const Desk = (props:any): JSX.Element => {
  
  const canvasRef = useRef()
  const canvas = canvasRef.current;

  let threeView: any;
  

  //on Mount
  useEffect(() => {

    const innerTreeRef = canvasRef.current
    threeView = new ThreeView(innerTreeRef);
    handleResize()

    //window.addEventListener('mousemove', mouseMove);
    window.addEventListener('resize', handleResize, false);  
  }
  ,[])

  
//   componentDidUpdate(prevProps, prevState) {
//     // Pass updated props to 
//     const newValue = this.props.whateverProperty;
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
  };


  return (

      <div className={styles.desk}>
        <canvas ref={canvasRef} {...props}/>
      </div>

  );
}

 
