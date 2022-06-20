import React, { useEffect, useRef } from 'react';
import styles from './Desk.module.css';
import { threeScene } from '../../three/threeScene';


const ThreeWrapper = React.memo(() => {

    const canvasRef = useRef(null)

    useEffect(() => {
        //scene.init(canvasRef.current)
        threeScene.init(canvasRef.current)
    }, [])


    return(
        <div className={styles.desk}>
            <canvas ref={canvasRef} className={styles.board} id='mainCanvas'/>
        </div>
    )
});

export { ThreeWrapper }