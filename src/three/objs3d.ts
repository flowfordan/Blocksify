import * as THREE from 'three';

const pointObj = (coords: any) => {
    let position = Float32Array.from(coords)
    let pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute( 'position', new THREE.BufferAttribute( position, 3 ) );
    let pMat = new THREE.PointsMaterial( { color: 0x888888 } );
    let point = new THREE.Points(pGeom, pMat);
    return point
};

const lineObj = (coords: any) => {
    const lGeom = new THREE.BufferGeometry()
    .setFromPoints(coords)

    const LMat = new THREE.LineBasicMaterial({
        color: 0x000000
    });

    const line = new THREE.Line( lGeom, LMat );

    return line
};


export {pointObj, lineObj}