import { Vector3 } from 'three';
//1, 2, 5, 10, 15, 30, 45, 90

const angles = [1, 2, 5, 10, 15, 30, 45, 90];

export type AnglePts = {
	[key: number]: [Vector3, Vector3]
}

type AnglesV3 = {
	[key in typeof angles[number]]: AnglePts
}

//construct collection angle: [coord Y , -coord Y]
//base coords of points on circle of Radius 1
//to certain directions(angles) from 0 to 180
const constructBaseV3Variants = (angles: Array<number>): AnglePts => {
	const coordsPerAngle: AnglePts = {}
	const result: AnglesV3 = {};

	const maxAngle = 180;
	const baseRadius = 1;
	const allAngles = [...Array(maxAngle + 1).keys()]; //[0, 1, ... 180]


	//TODO check func
	let anglesChecked;
	//check if some angles devided by same number
	//like 5 and 15
	//or 2 and 10

	//create array
	//with nums divided only
	//by input angles
	//TODO can it be optimized
	let filteredAngles: Array<number> = [];
	for (let angle of allAngles) {
		for(let inputAngle of angles){
			if (angle % inputAngle === 0 && !filteredAngles.includes(angle)) {
				filteredAngles.push(angle);
			}
		}
	}



	//iterate thru possible
	//create for each [V3, V3]
	for (let angle of filteredAngles) {
		console.log('ANGLE', angle);
		const angleRad = angle * (Math.PI/180);

		const V3x = parseFloat((-1 * baseRadius * Math.cos(angleRad)).toFixed(9));
		const V3y = parseFloat((baseRadius * Math.sin(angleRad)).toFixed(9));

		coordsPerAngle[angle] = [new Vector3(V3x, 0, V3y), new Vector3(V3x, 0, -1*V3y)]
	}


	console.log('VARIANTS 180', coordsPerAngle)
	return coordsPerAngle;
}

export { constructBaseV3Variants }