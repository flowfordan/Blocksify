import PolygonIcon from '../../assets/icons/polygon.svg';
import PolylineIcon from '../../assets/icons/polyline.svg';
import LineIcon from '../../assets/icons/line.svg';
import ArrowHeadIcon from '../../assets/icons/arrowHead.svg';
import EyeIcon from '../../assets/icons/eye.svg';
import EyeClosedIcon from '../../assets/icons/eye_closed.svg';
import LockIcon from '../../assets/icons/lock.svg';

//
enum Assets {
  polygon = 'polygon',
  line = 'line',
  pLine = 'pLine',
  arrowHead = 'arrowHead',
  selector = 'selector',
  eye = 'eye',
  eye_closed = 'eyeClosed',
  lock = 'lock',
}

export type AssetKey = `${Assets}`;

type AssetsData = {
  [key in AssetKey]: React.FunctionComponent<React.SVGAttributes<SVGAElement>>
}

const assetsData: AssetsData = {
  polygon: PolygonIcon,
  pLine: PolylineIcon,
  line: LineIcon,
  arrowHead: ArrowHeadIcon,
  selector: ArrowHeadIcon,
  eye: EyeIcon,
  eyeClosed: EyeClosedIcon,
  lock: LockIcon
};

export { assetsData };
