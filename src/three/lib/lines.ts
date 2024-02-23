/**
 * function that returns the intersection point of two lines
 * or null if they are parallel
 * @param lineA coordinates of 1st line [[x, y], [x, y]]
 * @param lineB coordinates of 2nd line [[x, y], [x, y]]
 * @returns coordinates of intersection [x, y] or null
 * @example getLinesIntersectionPoint([[0, 0], [0, 5]], [[-1, 1], [2, 1]]) => [0, 1]
 */
function getLinesIntersectionPoint(lineA: number[][], lineB: number[][]) {
  //1st line
  const x1 = lineA[0][0];
  const y1 = lineA[0][1];
  const x2 = lineA[1][0];
  const y2 = lineA[1][1];
  //2d line
  const x3 = lineB[0][0];
  const y3 = lineB[0][1];
  const x4 = lineB[1][0];
  const y4 = lineB[1][1];
  // Line AB represented as a1x + b1y = c1
  //2pt.y - 1pt.y
  const aA = y2 - y1;
  //1pt.x - 2pt.x
  const bA = x1 - x2;
  const cA = aA * x1 + bA * y1;

  // Line CD represented as a2x + b2y = c2
  const aB = y4 - y3;
  const bB = x3 - x4;
  const cB = aB * x3 + bB * y3;

  const determinant = aA * bB - aB * bA;
  if (determinant !== 0) {
    const x = (bB * cA - bA * cB) / determinant;
    const y = (aA * cB - aB * cA) / determinant;
    return [x, y];
  } else return null;
}

/**
 * Function that returns coordinates of parallel line
 * @param lineCoords coordinates of line in format
 * [[x1, y1], [x2, y2]]
 * @param dist distanation from original line
 * @param sideMod side modificator - if true returns line on the left side of original line
 * @returns coordinates of resulting line in format
 * [x1, y1, x2, y2]
 * @example getParallelLineCoords([[0, 0], [0, 1]], 1, true) => [1, 0, 1, 1]
 */
function getParallelLineCoords(lineCoords: number[][], dist: number, sideMod?: boolean) {
  const x1 = lineCoords[0][0];
  const y1 = lineCoords[0][1];
  const x2 = lineCoords[1][0];
  const y2 = lineCoords[1][1];
  //find delta x and delta y
  const dx = x2 - x1;
  const dy = y2 - y1;
  //find length
  const len = Math.sqrt(dx * dx + dy * dy);
  //find cos sin
  const cos = dx / len;
  const sin = dy / len;
  //find new x and y
  //flag for side
  const mult = sideMod ? -1 : 1;
  const x3 = x1 + dist * sin * mult;
  const y3 = y1 - dist * cos * mult;
  const x4 = x2 + dist * sin * mult;
  const y4 = y2 - dist * cos * mult;
  //return coords
  return [x3, y3, x4, y4];
}

/**
 * Function returns coordinates of line equidistant to given line
 * on given distance
 * @param line coordinates of original line in format
 * [x1, y1, x2, y2, x3, y3, ...]
 * @param dist distanation from orginal line
 * @param sideMob side modificator - if true returns line on the left side of original line
 * @returns coordinates of resulting line in format [x1, y1, x2, y2, x3, y3, ...]
 * @example getLineEquidistant([0, 0, 0, 1, 1, 1, 1, 0], 1, true) => [1, 0, 1, 1, 2, 1, 2, 0]
 */
export function getLineEquidistant(line: Array<number>, dist: number, sideMob?: boolean) {
  const parallelLines: Array<number> = [];
  for (let i = 0; i < line.length - 2; i += 2) {
    const x1 = line[i];
    const y1 = line[i + 1];
    const x2 = line[i + 2];
    const y2 = line[i + 3];
    const parallel = getParallelLineCoords(
      [
        [x1, y1],
        [x2, y2],
      ],
      dist,
      sideMob
    );
    parallelLines.push(...parallel);
  }

  //find points
  const resultLine: Array<number> = [];
  resultLine.push(parallelLines[0], parallelLines[1]);
  // //push intersecting lines
  for (let j = 0; j < parallelLines.length - 6; j += 4) {
    const x1 = parallelLines[j];
    const y1 = parallelLines[j + 1];
    const x2 = parallelLines[j + 2];
    const y2 = parallelLines[j + 3];
    //
    const x3 = parallelLines[j + 4];
    const y3 = parallelLines[j + 5];
    const x4 = parallelLines[j + 6];
    const y4 = parallelLines[j + 7];
    const coords = getLinesIntersectionPoint(
      [
        [x1, y1],
        [x2, y2],
      ],
      [
        [x3, y3],
        [x4, y4],
      ]
    );
    if (!coords) {
      resultLine.push(...[x3, y3]);
      continue;
    }
    resultLine.push(...coords);
  }

  //push ending
  resultLine.push(parallelLines[parallelLines.length - 2], parallelLines[parallelLines.length - 1]);
  return resultLine;
}

/**
 * @param startPoint - [x, y] - start point of line
 * @param endPoint - [x, y] - end point of line
 * @param stepLen - number - length of step
 * @param isThree - boolean - if true returns [x, 0, y] for 3d environment
 * @returns [x, y] or [x, 0, y]
 */
export function getHypotenusePointCoords(
  startPoint: [number, number],
  endPoint: [number, number],
  stepLen: number,
  isThree = true
) {
  const x0 = startPoint[0];
  const y0 = startPoint[1];
  const x1 = endPoint[0];
  const y1 = endPoint[1];
  //delta x & delta y
  const dx1 = x1 - x0;
  const dy1 = y1 - y0;
  //length of current hypotenuse
  const hypLen = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  //find quantity of steps in line - int
  const n = Math.floor(hypLen / stepLen);
  //find resulting line length
  const hypLenStepped = n * stepLen;
  //cos/sin
  const tx = dx1 / hypLen;
  const ty = dy1 / hypLen;
  //find deltas new
  const dx2 = hypLenStepped * tx;
  const dy2 = hypLenStepped * ty;
  //new coordinates
  //x0 + dx2 = x2
  const x2 = x0 + dx2;
  const y2 = y0 + dy2;
  if (isThree) {
    return [x2, 0, y2];
  } else return [x2, y2];
}

//util func [x, y, x, y]
export const insertZeroes = (coords2D: Array<number>) => {
  //insert zeroes after every x
  const result: Array<number> = [];
  for (let i = 0; i < coords2D.length; i++) {
    result.push(coords2D[i]);
    if (i % 2 === 0) {
      result.push(0);
    }
  }
  return result;
};

export const removeZeroesFrom3SizeCooords = (coords3D: Array<number>) => {
  //check if size is 3
  if (coords3D.length % 3 !== 0) {
    return coords3D;
  }
  //remove every second element
  const result: Array<number> = [];
  for (let i = 0; i < coords3D.length; i++) {
    if (i !== 1 && i % 3 !== 1) {
      result.push(coords3D[i]);
    }
  }
  return result;
};
