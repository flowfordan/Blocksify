/* 
Cleaner
Instrument for scene cleaner - all scene obj or by layer
*/
export class Cleaner {
  isAvialable: boolean;
  isActive: boolean;
  constructor() {
    //avialable
    //active
    this.isAvialable = true;
    this.isActive = false;
  }

  //clean scene
  cleanUp = (type: 'scene' | 'layer', layerId?: number) => {
    if (type === 'scene') {
      //clean scene
      //set stage 1
    } else if (type === 'layer' && layerId !== undefined) {
      //clean layer
    } else {
      throw new Error('Cleaner. Layer ID was not defined');
    }
  };
}
