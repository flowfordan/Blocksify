/* 
  function that returns the intersection point of two lines
  or null if they are parallel
  recieves two arrays of two points each [[x, y], [x, y]]
*/

function getLinesIntersectionPoint(lineA: number[][], lineB: number[][]) {
  // Line AB represented as a1x + b1y = c1
  //2pt.y - 1pt.y
  const aA = lineA[1][1] - lineA[0][1];
  //1pt.x - 2pt.x
  const bA = lineA[0][0] - lineA[1][0];
  const cA = aA * lineA[0][0] + bA * lineA[0][1];

  // Line CD represented as a2x + b2y = c2
  const aB = lineB[1][1] - lineB[0][1];
  const bB = lineB[0][0] - lineB[1][0];
  const cB = aB * lineB[0][0] + bB * lineB[0][1];

  const determinant = aA * bB - aB * bA;
  if (determinant !== 0) {
    const x = (bB * cA - bA * cB) / determinant;
    const y = (aA * cB - aB * cA) / determinant;
    return [x, y];
  } else return null;
}
