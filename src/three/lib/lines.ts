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
  console.log(dist);
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
  return [
    [x3, y3],
    [x4, y4],
  ];
}
