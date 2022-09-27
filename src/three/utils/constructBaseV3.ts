import { Vector3 } from 'three';
//1, 2, 5, 10, 15, 30, 45, 90

// const closestV3collection: V3Collection = {
// 	0: [new Vector3(-1, 0, 0), new Vector3(-1, 0, 0)],
// 	90: [new Vector3(0, 0, 1), new Vector3(0, 0, -1)], 
// 	180: [new Vector3(1, 0, 0), new Vector3(1, 0, 0)]
// }

// type Angles = 1 | 2 | 5 | 10 | 15 | 30 | 45 | 30 | 45 | 90;
const angles = [1, 2, 5, 10, 15, 30, 45, 90];

type AnglePts = {
	[key: number]: [Vector3, Vector3]
}

type AnglesV3 = {
	[key in typeof angles[number]]: AnglePts
}

//construct collection angle: [coord Y , -coord Y]
//base coords of points on circle of Radius 1
//to certain directions(angles) from 0 to 180
const constructBaseV3Variants = (step = 1): AnglePts => {
	const coordsPerAngle: AnglePts = {}
	const result: AnglesV3 = {};
	
	const minAngle = 0;

	const maxAngle = 180;
	const baseRadius = 1;

	const possibleAngles = [...Array(maxAngle + 1).keys()]; //[0, 1, ... 180]

	//iterate thru possible
	//create for each [V3, V3]


	for (let angle of possibleAngles) {
		console.log('ANGLE', angle);
		const angleRad = angle * (Math.PI/180);

		const V3x = parseFloat((baseRadius * Math.cos(angleRad)).toFixed(9));
		const V3y = parseFloat((baseRadius * Math.sin(angleRad)).toFixed(9));

		coordsPerAngle[angle] = [new Vector3(V3x, 0, V3y), new Vector3(V3x, 0, -1*V3y)]
	}


	console.log('VARIANTS 180', coordsPerAngle)
	return coordsPerAngle;
}

export { constructBaseV3Variants }