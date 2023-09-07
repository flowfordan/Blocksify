/* 
  function that returns the intersection point of two lines
  or null if they are parallel
  recieves two arrays of two points each [[x, y], [x, y]]
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

function getLineEquidistant(line: Array<number>, dist: number, sideMob?: boolean) {
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
  console.log(parallelLines.toString());

  //find points
  const resultLine: Array<number> = [];
  resultLine.push(parallelLines[0], parallelLines[1]);
  // //push intersecting lines
  for (let j = 0; j < parallelLines.length - 6; j += 4) {
    console.log('J', j, parallelLines.length);
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
