import { IsObjDataOfObjLineSegment, IsObjDataOfObjMain, IsObjDataOfObjPrimPt } from 'shared/types/objs';

export const getObjPrimPtLine = (mainObj: THREE.Object3D<THREE.Event>) => {
  //mainObj must be main_obj by general type
  if (!IsObjDataOfObjMain(mainObj.userData)) return;
  const primPt = mainObj.children.find((obj) => IsObjDataOfObjPrimPt(obj.userData));
  if (!primPt) return;
  const lineSegment = primPt.children.find((obj) => IsObjDataOfObjLineSegment(obj.userData));
  return lineSegment;
};
