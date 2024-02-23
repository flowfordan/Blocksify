//function to check line polygon intersection
function isLinePolygonIntersect(line: Line, polygon: Polygon): boolean {
  let isIntersect = false;
  for (let i = 0; i < polygon.points.length; i++) {
    const p1 = polygon.points[i];
    //check if i is the last point index
    let p2: Point;
    if (i === polygon.points.length - 1) {
      p2 = polygon.points[0];
    } else p2 = polygon.points[i + 1];

    const intersectPoint = line.segmentIntersect(new Line(p1, p2));
    //debugger;
    if (intersectPoint) {
      isIntersect = true;
      break;
    }
  }
  return isIntersect;
}

enum LineSide {
  Left = 'left',
  Right = 'right',
  On = 'on',
}

export class Point {
  constructor(public x: number, public y: number) {
    this.x = x;
    this.y = y;
  }

  subtract(point2: Point) {
    //this.point - arg0.point
    const deltaX = this.x - point2.x;
    const deltaY = this.y - point2.y;
    return {
      x: deltaX,
      y: deltaY,
      len: Math.sqrt(deltaX * deltaX + deltaY * deltaY),
    }; //Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }
}

export class Line {
  constructor(public p1: Point, public p2: Point) {
    this.p1 = p1;
    this.p2 = p2;
  }

  length(): number {
    return this.p1.subtract(this.p2).len;
  }

  intersect(line2: Line): Point | null {
    //1st line
    const x1 = this.p1.x;
    const y1 = this.p1.y;
    const x2 = this.p2.x;
    const y2 = this.p2.y;
    //2d line
    const x3 = line2.p1.x;
    const y3 = line2.p1.y;
    const x4 = line2.p2.x;
    const y4 = line2.p2.y;
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
      return new Point(x, y);
    } else return null;
  }

  //segmentIntersect(line2: Line) {}

  // returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
  // segmentIntersect(otherLine: Line) {
  //   const { p1, p2 } = this;
  //   const { p1: q1, p2: q2 } = otherLine;

  //   const det = (q2.x - q1.x) * (p2.y - p1.y) - (p2.x - p1.x) * (q2.y - q1.y);

  //   if (det === 0) {
  //     return false;
  //   } else {
  //     const lambda =
  //       ((q2.y - q1.y) * (p2.x - p1.x) + (p1.x - q1.x) * (p2.y - p1.y)) / det;
  //     const gamma =
  //       ((p1.y - p2.y) * (p1.x - q1.x) + (q1.y - p1.y) * (p1.x - p2.x)) / det;

  //     return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  //   }
  // };

  // Adapted from: http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect/1968345#1968345
  // segmentIntersect(otherLine: Line) {

  //   let s1_x, s1_y, s2_x, s2_y;
  //   s1_x = this.p2.x - this.p1.x;
  //   s1_y = this.p2.y - this.p1.y;
  //   s2_x = otherLine.p2.x - otherLine.p1.x;
  //   s2_y = otherLine.p2.y - otherLine.p2.y;

  //   var s, t;
  //   s = (-s1_y * (this.p1.x - otherLine.p1.x) + s1_x * (this.p1.y - otherLine.p2.y)) / (-s2_x * s1_y + s1_x * s2_y);
  //   t = ( s2_x * (this.p1.y - otherLine.p2.y) - s2_y * (this.p1.x - otherLine.p1.x)) / (-s2_x * s1_y + s1_x * s2_y);

  //   if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
  //   {
  //     // Collision detected
  //     return true;
  //   }

  //   return false; // No collision
  // }

  // Given three collinear points p, q, r, the function checks if
  // point q lies on line segment 'pr'
  private onSegment(p: Point, q: Point, r: Point) {
    if (
      q.x <= Math.max(p.x, r.x) &&
      q.x >= Math.min(p.x, r.x) &&
      q.y <= Math.max(p.y, r.y) &&
      q.y >= Math.min(p.y, r.y)
    )
      return true;

    return false;
  }

  // To find orientation of ordered triplet (p, q, r).
  // The function returns following values
  // 0 --> p, q and r are collinear
  // 1 --> Clockwise
  // 2 --> Counterclockwise
  private orientation(p: Point, q: Point, r: Point) {
    // See https://www.geeksforgeeks.org/orientation-3-ordered-points/
    // for details of below formula.
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

    if (val == 0) return 0; // collinear

    return val > 0 ? 1 : 2; // clock or counterclock wise
  }

  // The main function that returns true if line segment 'p1q1'
  // and 'p2q2' intersect.
  segmentIntersect(line2: Line) {
    const p1 = this.p1;
    const q1 = this.p2;
    const p2 = line2.p1;
    const q2 = line2.p2;
    // Find the four orientations needed for general and
    // special cases
    const o1 = this.orientation(p1, q1, p2);
    const o2 = this.orientation(p1, q1, q2);
    const o3 = this.orientation(p2, q2, p1);
    const o4 = this.orientation(p2, q2, q1);

    // General case
    if (o1 != o2 && o3 != o4) return true;

    // Special Cases
    // p1, q1 and p2 are collinear and p2 lies on segment p1q1
    if (o1 == 0 && this.onSegment(p1, p2, q1)) return true;

    // p1, q1 and q2 are collinear and q2 lies on segment p1q1
    if (o2 == 0 && this.onSegment(p1, q2, q1)) return true;

    // p2, q2 and p1 are collinear and p1 lies on segment p2q2
    if (o3 == 0 && this.onSegment(p2, p1, q2)) return true;

    // p2, q2 and q1 are collinear and q1 lies on segment p2q2
    if (o4 == 0 && this.onSegment(p2, q1, q2)) return true;

    return false; // Doesn't fall in any of the above cases
  }
}

class Edge {
  isSourceVertex: boolean;
  distOnLine: number;
  isSrcEdge: boolean;
  isDstEdge: boolean;
  isBridge: boolean;
  visited: boolean;
  next?: Edge;
  prev?: Edge;
  constructor(public start: Point, public side: LineSide) {
    this.start = start;
    this.side = side;
    this.isSourceVertex = false;
    this.distOnLine = 0;
    this.isSrcEdge = false;
    this.isDstEdge = false;
    this.isBridge = false;
    this.visited = false;
    // this.next = new Edge(start, side);
    // this.prev = new Edge(start, side);
  }
}

export class Polygon {
  side?: LineSide;
  points: Point[];
  constructor(points?: Point[]) {
    this.points = points || [];
    // this.side = LineSide.On;
  }

  updateBounds() {
    // let minX = Number.MAX_VALUE;
    // let minY = Number.MAX_VALUE;
    // let maxX = Number.MIN_VALUE;
    // let maxY = Number.MIN_VALUE;
    // for (const point of this.points) {
    //   if (point.x < minX) minX = point.x;
    //   if (point.y < minY) minY = point.y;
    //   if (point.x > maxX) maxX = point.x;
    //   if (point.y > maxY) maxY = point.y;
    // }
    // this.points.push(new Point(minX, minY));
    // this.points.push(new Point(maxX, maxY));
  }
}

/**
 * @type {Edge[]}
 */
const SplitPoly: Edge[] = [];
/**
 * @type {Edge[]}
 */
const EdgesOnLine: Edge[] = [];

const DebugIntersections = [];

/**
 * @param {Polygon} poly
 * @param {Line} line
 * @param thickness
 * @param constrainToLine
 * @return {*}
 */
function Cut(poly: Polygon, line: Line, thickness = 0, constrainToLine = false): Array<Polygon> | null {
  if (poly.points.length < 3) {
    return null;
  }

  SplitPoly.length = 0;
  EdgesOnLine.length = 0;
  DebugIntersections.length = 0;

  ///

  SplitEdges(poly, line, constrainToLine);

  if (!EdgesOnLine.length) {
    poly.side = GetSideOfLine(line, poly.points[0]);
    return null;
  }

  SortEdges(line);
  SplitPolygon(constrainToLine);
  return CollectPolys(constrainToLine); //return array of polygons

  // if(thickness <= 0)
  // {
  // 	SplitEdges(poly, line, constrainToLine);

  // 	if(!EdgesOnLine.length)
  // 	{
  // 		poly.side = GetSideOfLine(line, poly.points[0]);
  // 		return null;
  // 	}

  // 	SortEdges(line);
  // 	SplitPolygon(constrainToLine);
  // 	return CollectPolys(constrainToLine);
  // }
  // else {
  // 	const p1 = line.p1;
  // 	const p2 = line.p2;
  // 	const dx = p1.x - p2.x;
  // 	const dy = p1.y - p2.y;
  // 	const length = Math.sqrt(dx * dx + dy * dy);
  // 	const nx = dx / length * thickness;
  // 	const ny = dy / length * thickness;
  // 	line = new Line(
  // 		new Point(p1.x - ny, p1.y + nx),
  // 		new Point(p2.x - ny, p2.y + nx),
  // 	);
  // 	const line2 = new Line(
  // 		new Point(p2.x + ny, p2.y - nx),
  // 		new Point(p1.x + ny, p1.y - nx),
  // 	);

  // 	let results: Array<Polygon>;
  // 	SplitEdges(poly, line);
  // 	if(EdgesOnLine.length)
  // 	{
  // 		SortEdges(line);
  // 		SplitPolygon();
  // 		results = CollectPolys(false);
  // 	}
  // 	else
  // 	{
  // 		poly.side = GetSideOfLine(line, poly.points[0]);
  // 		results = [poly];
  // 	}

  // 	const newResults = [];
  // 	for(let resultPoly of results)
  // 	{
  // 		if(resultPoly.side === LineSide.Right)
  // 		{
  // 			SplitPoly.length = 0;
  // 			EdgesOnLine.length = 0;

  // 			let line2Results;
  // 			SplitEdges(resultPoly, line2);
  // 			if(EdgesOnLine.length) {
  // 				SortEdges(line2);
  // 				SplitPolygon();
  // 				line2Results = CollectPolys(false);
  // 			}
  // 			else {
  // 				resultPoly.side = GetSideOfLine(line2, resultPoly.points[0]);
  // 				line2Results = [resultPoly];
  // 			}

  // 			for(let line2ResultPoly of line2Results) {
  // 				if(line2ResultPoly.side === LineSide.Left) {
  // 					line2ResultPoly.updateBounds();
  // 					newResults.push(line2ResultPoly);
  // 				}
  // 			}
  // 		}
  // 		else
  // 		{
  // 			resultPoly.updateBounds();
  // 			newResults.push(resultPoly);
  // 		}
  // 	}

  // 	return newResults.length ? newResults : null;
  // }
}

// /**
//  * @param line
//  * @return {boolean}
//  */
// function IntersectionsAreOneLine(line: Line): boolean
// {
// 	const firstEdge = EdgesOnLine[0];
// 	const lineDelta = line.p2.subtract(line.p1);
// 	const edgeDelta = firstEdge.start.subtract(line.p1);

// 	if(lineDelta.dot(edgeDelta) < 0)
// 	{
// 		return false;
// 	}

// 	const firstEdgeDist = PointDistance(line.p1, firstEdge.start);
// 	return firstEdgeDist + EdgesOnLine[EdgesOnLine.length - 1].distOnLine <= line.length();
// }

/**
 * @param {Line} line
 * @param {Point} pt
 * @return {LineSide}
 * @constructor
 */
function GetSideOfLine(line: Line, pt: Point): LineSide {
  const d = (pt.x - line.p1.x) * (line.p2.y - line.p1.y) - (pt.y - line.p1.y) * (line.p2.x - line.p1.x);
  return d > 0.1 ? LineSide.Right : d < -0.1 ? LineSide.Left : LineSide.On;
}

/**
 * @param {Point} pt0
 * @param {Point} pt1
 * @return {*}
 * @constructor
 */
function PointDistance(pt0: Point, pt1: Point) {
  const dx = pt0.x - pt1.x;
  const dy = pt0.y - pt1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * @param {Line} line
 * @param {Point} p
 * @return {number}
 * @constructor
 */
function CalcSignedDistance(line: Line, p: Point): number {
  // scalar projection on line. in case of co-linear
  // vectors this is equal to the signed distance.
  return (p.x - line.p1.x) * (line.p2.x - line.p1.x) + (p.y - line.p1.y) * (line.p2.y - line.p1.y);
}

/**
 * @param {Polygon} poly
 * @param {Line} line
 * @param constrainToLine
 * @return {*}
 */
function SplitEdges(poly: Polygon, line: Line, constrainToLine = false) {
  const points = poly.points;
  const pointCount = points.length;

  for (let i = 0; i < pointCount; i++) {
    const polyEdge = new Line(points[i], points[(i + 1) % pointCount]);
    const edgeStartSide = GetSideOfLine(line, polyEdge.p1);
    const edgeEndSide = GetSideOfLine(line, polyEdge.p2);
    const newEdge = new Edge(points[i], edgeStartSide);
    SplitPoly.push(newEdge);

    if (edgeStartSide === LineSide.On) {
      // This edge is not an intersection but a vertex on the source polygon, mark it as such
      newEdge.isSourceVertex = true;

      if (constrainToLine) {
        const t = GetEdgeLineT(newEdge, line);
        const isOnLine = t >= 0 && t <= 1;

        // Only add this vertex as on edge if it is one the line, and between the line's start and end points
        if (isOnLine) {
          DebugIntersections.push(newEdge.start);
          EdgesOnLine.push(newEdge);
        }
        // If it's on the line but not inside it, make distOnLine negative so it will pass LOO and OOR as a src edge
        // during SplitPolygon
        else {
          newEdge.distOnLine = -1;
        }
      } else {
        DebugIntersections.push(newEdge.start);
        EdgesOnLine.push(newEdge);
      }
    } else if (edgeStartSide !== edgeEndSide && edgeEndSide !== LineSide.On) {
      const result = polyEdge.intersect(line);

      if (!constrainToLine) {
        console.assert(result != null);
      }

      if (result) {
        const edge = new Edge(result, LineSide.On);
        DebugIntersections.push(result);
        SplitPoly.push(edge);
        EdgesOnLine.push(edge);
      }
    }
  }

  // connect doubly linked list, except
  // first->prev and last->next
  for (let i = 0; i < SplitPoly.length - 1; i++) {
    const current = SplitPoly[i];
    const next = SplitPoly[i + 1];
    current.next = next;
    next.prev = current;
  }

  // connect first->prev and last->next
  const front = SplitPoly[0];
  const back = SplitPoly[SplitPoly.length - 1];
  back.next = front;
  front.prev = back;
}

/**
 * @param {Line} line
 * @return {*}
 */
function SortEdges(line: Line) {
  // sort edges by start position relative to
  // the start position of the split line
  EdgesOnLine.sort((e0, e1) => {
    // it's important to take the signed distance here,
    // because it can happen that the split line starts/ends
    // inside the polygon. in that case intersection points
    // can fall on both sides of the split line and taking
    // an unsigned distance metric will result in wrongly
    // ordered points in EdgesOnLine.
    return CalcSignedDistance(line, e0.start) - CalcSignedDistance(line, e1.start);
  });

  // compute distance between each edge's start
  // position and the first edge's start position
  const count = EdgesOnLine.length;

  if (count) {
    const firstEdge = EdgesOnLine[0];

    for (let i = 1; i < count; i++) {
      const edge = EdgesOnLine[i];
      edge.distOnLine = PointDistance(edge.start, firstEdge.start);
    }
  }
}

/**
 * Returns the percentage (0-1) along the line where this edge lies
 * Edges outside of the line will be outside the range of 0 - 1
 * @param {Edge} edge
 * @param {Line} line
 */
function GetEdgeLineT(edge: Edge, line: Line) {
  const lineDelta = line.p2.subtract(line.p1);
  const edgeLineDelta = edge.start.subtract(line.p1);
  edgeLineDelta.x /= lineDelta.x;
  edgeLineDelta.y /= lineDelta.y;
  return !isNaN(edgeLineDelta.x) ? edgeLineDelta.x : edgeLineDelta.y;
}

function SplitPolygon(constrainToLine = false) {
  /** @type {Edge} */
  let useSrc: Edge | null = null;
  const count = EdgesOnLine.length;
  console.log('EDGES on LINE', EdgesOnLine);

  for (let i = 0; i < count; i++) {
    // find source

    let srcEdge: Edge | null = useSrc;
    useSrc = null;

    for (; !srcEdge && i < count; i++) {
      const curEdge = EdgesOnLine[i];
      const curSide = curEdge.side;
      const prevSide = curEdge.prev?.side;
      const nextSide = curEdge.next?.side;

      console.assert(curSide === LineSide.On);

      if (
        (prevSide === LineSide.Left && nextSide === LineSide.Right) ||
        (prevSide === LineSide.Left && nextSide === LineSide.On && curEdge.next!.distOnLine < curEdge.distOnLine) ||
        (prevSide === LineSide.On && nextSide === LineSide.Right && curEdge.prev!.distOnLine < curEdge.distOnLine)
      ) {
        srcEdge = curEdge;
        srcEdge.isSrcEdge = true;
      }
      // In special cases LOL or ROR can be considered sources if the edges formed by prev > cur > next are concave
      else if (constrainToLine) {
        const isOutside = CalculateTriangleArea(curEdge.prev!.start, curEdge.start, curEdge.next!.start) < 0;

        if (
          (prevSide === LineSide.Left && nextSide === LineSide.Left && isOutside) ||
          (prevSide === LineSide.Right && nextSide === LineSide.Right && isOutside)
        ) {
          srcEdge = curEdge;
          srcEdge.isSrcEdge = true;
        }
      }
    }

    // find destination

    /** @type {Edge} */
    let dstEdge: Edge | null = null;

    for (; !dstEdge && i < count; ) {
      const curEdge = EdgesOnLine[i];
      const curSide = curEdge.side;
      const prevSide = curEdge.prev?.side;
      const nextSide = curEdge.next?.side;

      console.assert(curSide === LineSide.On);

      if (
        (prevSide === LineSide.Right && nextSide === LineSide.Left) ||
        (prevSide === LineSide.On && nextSide === LineSide.Left) ||
        (prevSide === LineSide.Right && nextSide === LineSide.On) ||
        (prevSide === LineSide.Right && nextSide === LineSide.Right) ||
        (prevSide === LineSide.Left && nextSide === LineSide.Left)
      ) {
        dstEdge = curEdge;
        dstEdge.isDstEdge = true;
      } else {
        i++;
      }
    }

    // bridge source and destination
    if (srcEdge && dstEdge) {
      // Mark these edges as part of a bridge so we know to keep them during CollectPolys
      srcEdge.isBridge = true;
      dstEdge.isBridge = true;

      CreateBridge(srcEdge, dstEdge);
      VerifyCycles();

      // is it a configuration in which a vertex
      // needs to be reused as source vertex?
      if (srcEdge.prev?.prev?.side === LineSide.Left) {
        useSrc = srcEdge.prev;
        useSrc.isSrcEdge = true;
      } else if (dstEdge.next?.side === LineSide.Right) {
        useSrc = dstEdge;
        useSrc.isSrcEdge = true;
      }
    }
  }
}

/**
 * signed area of a triangle
 * @param {Point} p
 * @param {Point} q
 * @param {Point} r
 * @return {number}
 */
function CalculateTriangleArea(p: Point, q: Point, r: Point): number {
  return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}

/**
 * @param {Edge} srcEdge
 * @param {Edge} dstEdge
 */
function CreateBridge(srcEdge: Edge, dstEdge: Edge) {
  const a = new Edge(srcEdge.start, srcEdge.side);
  const b = new Edge(dstEdge.start, dstEdge.side);
  SplitPoly.push(a);
  SplitPoly.push(b);

  a.isBridge = srcEdge.isBridge;
  b.isBridge = dstEdge.isBridge;
  a.isSourceVertex = srcEdge.isSourceVertex;
  b.isSourceVertex = dstEdge.isSourceVertex;

  a.next = dstEdge;
  a.prev = srcEdge.prev;
  b.next = srcEdge;
  b.prev = dstEdge.prev;
  srcEdge.prev!.next = a;
  srcEdge.prev = b;
  dstEdge.prev!.next = b;
  dstEdge.prev = a;
}

function VerifyCycles() {
  const splitPolyCount = SplitPoly.length;

  for (const edge of SplitPoly) {
    let curSide = edge;
    let count = 0;

    do {
      if (count > splitPolyCount) {
        throw new Error('count > splitPolyCount');
      }
      // console.assert(count < splitPolyCount);

      curSide = curSide.next!;
      count++;
    } while (curSide !== edge);
  }
}

function CollectPolys(updateBounds = true, constrainToLine = false) {
  const resPolys = [];

  console.log(SplitPoly);

  for (const e of SplitPoly) {
    if (!e.visited) {
      const splitPoly = new Polygon();
      splitPoly.side = e.side;
      let curSide = e;

      do {
        if (splitPoly.side === LineSide.On && curSide.side !== LineSide.On) {
          splitPoly.side = curSide.side;
        }

        curSide.visited = true;

        // Ignore edges that do not form a complete split in the polygon
        if (!constrainToLine || curSide.side !== LineSide.On || curSide.isSourceVertex || curSide.isBridge) {
          splitPoly.points.push(curSide.start);
        }

        curSide = curSide.next!;
      } while (curSide !== e);

      if (updateBounds) {
        splitPoly.updateBounds();
      }

      resPolys.push(splitPoly);
    }
  }

  return resPolys;
}

//CONTER-CLOCKWISE
const testSplitLine: Line = new Line(new Point(1, 3), new Point(-2, 3));
const testPolygon: Polygon = new Polygon([new Point(1, 1), new Point(1, 5), new Point(-2, 5), new Point(-2, 1)]);

//TRIANGLE
const trSplitLine: Line = new Line(new Point(-5, 7), new Point(-4.59, 3.8));
const trPolygon: Polygon = new Polygon([new Point(2, 6), new Point(-5, 7), new Point(-7, 3)]);

// //П
const pSplitLine: Line = new Line(new Point(16, -6.76), new Point(6.32, -6.68));
const pPolygon: Polygon = new Polygon([
  new Point(16, -5),
  new Point(14, -5),
  new Point(12, -8),
  new Point(10, -8),
  new Point(10, -4),
  new Point(6, -4),
  new Point(7, -12),
  new Point(16, -12),
]);

//BASIC
const basicSplitLine1: Line = new Line(new Point(80, 40), new Point(80, 120));
const basicSplitLine2: Line = new Line(new Point(150, 40), new Point(150, 120));
const basicSplitLine3: Line = new Line(new Point(40, 60), new Point(200, 60));
const basicPolygon: Polygon = new Polygon([
  new Point(40, 40),
  new Point(200, 40),
  new Point(200, 120),
  new Point(40, 120),
]);

// //SCARY
// const testSplitLine: Line = new Line(new Point(1, 3), new Point(-2, 3));
// const testPolygon: Polygon = new Polygon([
//   new Point(1, 1),
//   new Point(1, 5),
//   new Point(-2, 5),
//   new Point(-2, 1),
// ]);

// //ONLINE
// const testSplitLine: Line = new Line(new Point(1, 3), new Point(-2, 3));
// const testPolygon: Polygon = new Polygon([
//   new Point(1, 1),
//   new Point(1, 5),
//   new Point(-2, 5),
//   new Point(-2, 1),
// ]);

// console.log('TRIANGLE', Cut(trPolygon, trSplitLine));
// console.log('П SHAPE', Cut(pPolygon, pSplitLine));
// // console.log('SCARY', Cut(testPolygon, testSplitLine));
// console.log('TEST BASIC', Cut(basicPolygon, basicSplitLine1));

//RECURSIVE CUT
// const recursivePolygonCut = (poly: Polygon, lines: Array<Line>) => {
//   //find the first line that intersects the polygon that is not the used line
//   //console.log('is intersect', isLinePolygonIntersect(lines[0], poly));
//   let currentLine: Line | null = null;
//   for(let i = 0; i < lines.length; i++) {
//     if(isLinePolygonIntersect(lines[i], poly)) {
//       currentLine = lines[i];
//       break;
//     }
//   }
//   //if not found return the [polygon]
//   if(!currentLine) return [poly];
//   //cut the polygon with the line
//   const newPolys = Cut(poly, currentLine);
//   debugger;
//   if(!newPolys) return [poly]; //if no new polygons are returned return the [polygon]
//   //iterate over the resulting polygons and call recursivePolygonCut with the new polygon and the remaining lines
//   const resultPolys: Polygon[] = [];
//   const filteredLines = lines.filter(line => line !== currentLine);
//   // for(let j=0; j<filteredLines.length; j++) {
//   //   const cutPolys = recursivePolygonCut(newPolys[j], lines.filter(line => line !== currentLine));

//   //   newPolys.forEach(p => {
//   //     resultPolys.push(...recursivePolygonCut(p, lines));
//   //   })
//   //   // resultPolys.push(a);
//   // }
//   //return the resulting polygons
//   return resultPolys;
// }

export const recursivePolygonCut = (poly: Polygon, lines: Array<Line>): Array<Polygon> => {
  //find the first line that intersects the polygon that is not the used line
  console.log('CHECK POLY', poly);
  console.log('LINES', lines);
  let currentLine: Line | null = null;
  for (let i = 0; i < lines.length; i++) {
    if (isLinePolygonIntersect(lines[i], poly)) {
      console.log('FOUND LINE INTERSECTION', lines[i]);
      currentLine = lines[i];
      break;
    }
  }
  //if not found return the [polygon]
  if (!currentLine) return [poly];
  const newPolys = Cut(poly, currentLine); //cut the polygon with the line
  //debugger;
  if (!newPolys || newPolys?.length === 1) return [poly]; //if no new polygons are returned return the [polygon]
  //iterate over the resulting polygons and call recursivePolygonCut with the new polygon and the remaining lines
  const resultPolys: Polygon[] = [];
  const filteredLines = lines.filter((line) => line !== currentLine);
  for (let j = 0; j < newPolys.length; j++) {
    const cutPolys = recursivePolygonCut(newPolys[j], filteredLines);
    // debugger;
    // newPolys.forEach(p => {
    //   resultPolys.push(...recursivePolygonCut(p, lines));
    // })
    resultPolys.push(...cutPolys);
  }
  return resultPolys;
};

//test line polygon int
const p = new Polygon([new Point(150, 40), new Point(200, 40), new Point(200, 120), new Point(150, 120)]);
const l = new Line(new Point(40, 60), new Point(200, 60));
//console.log('is poly int', isLinePolygonIntersect(l, p))
//console.log('RECURSIVE RESULT:', JSON.stringify(recursivePolygonCut(basicPolygon, [basicSplitLine1, basicSplitLine2, basicSplitLine3])));
// recursivePolygonCut(basicPolygon, [new Line(new Point(0, 0), new Point(-40, 0))]);
