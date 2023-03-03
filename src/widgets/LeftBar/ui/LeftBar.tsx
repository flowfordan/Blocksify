import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import cn from 'classnames';

import './leftBar.scss';
import { layersModel } from 'entities/layer';
import { instrumentsModel } from 'entities/sceneInstrument';
import { CoordsDisplay } from 'components/complex/CoordsPanel/CoordsPanel';
import { PanelDivision } from 'shared/ui';
import { LayerItem } from 'entities/layer';
import { ObjDataProp } from 'entities/sceneObj';
import { IObjData_Joined, IsObjDataOfObjMain, IsPropIsPropData } from 'shared/types/objs';
import { Layer } from 'shared/types';

export const LeftBar = observer((): JSX.Element => {
  const constructLayersList = (layersArr: Array<Layer>) => {
    return layersArr.map((l) => {
      return (
        <LayerItem
          layerId={l.id}
          name={l.name}
          isEmpty={l.empty}
          isBlocked={l.blocked}
          key={l.id}
          isActive={l.active}
          isVisible={l.visible}
        />
      );
    });
  };

  const constructSelectedObjData = () => {
    const data = instrumentsModel.instrumentsData['selector'].selectedObjData;
    if (data && IsObjDataOfObjMain(data)) {
      return (
        <>
          {/* {Object.keys(data).map((key, idx) => {
            const propValue = data[key as keyof typeof data];
            if (IsPropIsPropData(propValue) && propValue.pubTitle) {
              return <ObjDataProp key={key} propName={propValue.pubTitle} propValue={propValue.value} />;
            }
          })} */}
        </>
      );
    } else {
      return <>Select object</>;
    }
  };

  const constructIntersectedObjData = () => {
    // const data = instrumentsState.toolsData['selector'].intersectedObjData?[''];
    const data = 55;
    if (data) {
      return <div>{data}</div>;
    } else return <div>no data</div>;
  };

  //get properties list
  //if public - render 2 columns - prop - value

  return (
    <div className={'leftBar'}>
      <PanelDivision header={'Layers'}>{constructLayersList(layersModel.layers)}</PanelDivision>

      <PanelDivision header={'Object Properties'}>
        {/* {instrumentsModel.currentTool?.name === 'selector' && constructSelectedObjData()} */}
      </PanelDivision>

      <PanelDivision>
        {/* {instrumentsModel.currentTool?.name === 'selector' && constructIntersectedObjData()} */}
      </PanelDivision>

      <div className={'leftBar__coordsPanel'}>
        <CoordsDisplay />
      </div>
    </div>
  );
});
