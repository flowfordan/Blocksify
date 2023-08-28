import { Vector3 } from 'three';

const anglesPossible = [1, 2, 5, 10, 15, 30, 45, 90];

export type AnglePts = {
  [key: number]: [Vector3, Vector3];
};

/* construct collection - ANGLE: [V3, V3]
base coords of points on circle of Radius 1
to certain directions(angles) from 0 to 180 */
export const createBaseV3s = (snapAngles: Array<number>): AnglePts => {
  const coordsPerAngle: AnglePts = {};
  const maxAngle = 180;
  const baseRadius = 1;

  const allAngles = [...Array(maxAngle + 1).keys()]; //[0, 1, ... 180]

  //check if some angles devided by same number
  //like 5 and 15
  //or 2 and 10
  //TODO check func
  const inputAnglesChecked: Array<number> = [];

  //create array from array [0...180]
  //with nums divided only by input angles
  const anglesSteps: Array<number> = [];
  for (const angle of allAngles) {
    for (const inputAngle of snapAngles) {
      if (angle % inputAngle === 0 && !anglesSteps.includes(angle)) {
        anglesSteps.push(angle);
      }
    }
  }

  //iterate over possible steps
  //create for each [V3, V3]
  for (const angle of anglesSteps) {
    const angleRad = angle * (Math.PI / 180);

    const V3x = parseFloat((baseRadius * Math.cos(angleRad)).toFixed(9));
    const V3z = parseFloat((baseRadius * Math.sin(angleRad)).toFixed(9)); //y in model

    //positive and negative V3s around z (around y in model)
    coordsPerAngle[angle] = [new Vector3(V3x, 0, V3z), new Vector3(V3x, 0, -1 * V3z)];
  }
  return coordsPerAngle;
};
