import PolygonIcon from '../assets/icons/polygon.svg';

import PolylineIcon from '../assets/icons/polyline.svg';
import LineIcon from '../assets/icons/line.svg';
import SelectorIcon from '../assets/icons/selector.svg';
import HelperIcon from '../assets/icons/helper.svg';

import CameraTopIcon from '../assets/icons/camera_top.svg';
import CameraPerspectiveIcon from '../assets/icons/camera_perspective.svg';

import ViewAllIcon from '../assets/icons/view_all.svg';
import ViewCenterIcon from '../assets/icons/view_center.svg';

import ArrowHeadIcon from '../assets/icons/arrowHead.svg';
import EyeIcon from '../assets/icons/eye.svg';
import EyeClosedIcon from '../assets/icons/eye_closed.svg';
import LockIcon from '../assets/icons/lock.svg';

import LogoIcon from '../assets/icons/logo.svg';

import TickIcon from '../assets/icons/tick.svg';

import SceneEnvIcon from '../assets/icons/sceneEnv.svg';

//
enum Assets {
  logo = 'logo',
  polygon = 'polygon',
  line = 'line',
  pLine = 'pLine',
  selector = 'selector',
  helper = 'helper',
  arrowHead = 'arrowHead',
  eye = 'eye',
  eye_closed = 'eyeClosed',
  lock = 'lock',
  //
  cameraTop = 'cameraTop',
  cameraPerspective = 'cameraPerspective',
  //
  viewAll = 'viewAll',
  viewCenter = 'viewCenter',
  //
  tick = 'tick',
  //
  sceneEnv = 'sceneEnv',
}

export type AssetKey = `${Assets}`;

type AssetsData = {
  [key in AssetKey]: React.FunctionComponent<React.SVGAttributes<SVGAElement>>;
};

const assetsData: AssetsData = {
  logo: LogoIcon,
  polygon: PolygonIcon,
  pLine: PolylineIcon,
  line: LineIcon,
  selector: SelectorIcon,
  //
  helper: HelperIcon,
  arrowHead: ArrowHeadIcon,
  eye: EyeIcon,
  eyeClosed: EyeClosedIcon,
  lock: LockIcon,
  cameraTop: CameraTopIcon,
  cameraPerspective: CameraPerspectiveIcon,
  //
  viewAll: ViewAllIcon,
  viewCenter: ViewCenterIcon,
  //
  tick: TickIcon,
  sceneEnv: SceneEnvIcon,
};

export { assetsData };
