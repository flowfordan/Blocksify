import React, { useEffect, useRef } from 'react';
import './desk.scss';
import { ThreeView } from '../../three/ThreeView';


export const Desk = (props:any): JSX.Element => {

  let threeView: any;
  const canvasScene = useRef<null | HTMLCanvasElement>(null);
  const canvasUI = useRef<null | HTMLCanvasElement>(null);
  const canvasContainer = useRef<null | HTMLDivElement>(null);

  const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      //on view params change
      if (threeView){
        threeView.onWindowResize(
          entry.contentRect.width, entry.contentRect.height
        );
      }
    });
  });

  //on Mount
  useEffect(() => {

    const innerTreeRef = canvasScene.current!;
    threeView = new ThreeView(innerTreeRef);

    resizeObserver.observe(innerTreeRef, { box: 'content-box' });

  }
  , []);


  return (
    <div ref={canvasContainer} className={'desk'}>
      <canvas ref={canvasScene} {...props} className={'desk__canvasScene'} id='canvasScene'/>
    </div>
  );
};


