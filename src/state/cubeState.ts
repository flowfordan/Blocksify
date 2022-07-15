import { makeAutoObservable } from "mobx";


class CubeState{
    cubeColor: number

    constructor(){
        makeAutoObservable(this);
        this.cubeColor = 0xFF724C;
    }


    setCubeColor = (color: number) => {
        this.cubeColor = color;
        console.log(this.cubeColor)
    }

}

const cubeState = new CubeState()

export {cubeState}