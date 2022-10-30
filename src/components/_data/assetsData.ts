import PolygonIcon from '../../assets/icons/polygon.svg';
import PolylineIcon from '../../assets/icons/polyline.svg';
import LineIcon from '../../assets/icons/line.svg';

//
enum Assets {
  polygon = 'polygon',
  line = 'line',
  pLine = 'pLine'
}

export type AssetKey = `${Assets}`;

type AssetsData = {
  [key in AssetKey]: React.FunctionComponent<React.SVGAttributes<SVGAElement>>
}

const assetsData: AssetsData = {
  polygon: PolygonIcon,
  pLine: PolylineIcon,
  line: LineIcon
};

export { assetsData };
