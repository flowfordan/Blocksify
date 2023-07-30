import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import cn from 'classnames';

import './leftBar.scss';
import { layersModel } from 'entities/layer';
import { instrumentsModel, InspectorInstr } from 'entities/sceneInstrument';
import { PanelDivision } from 'shared/ui';
import { LayerItem } from 'entities/layer';
// import { ObjDataProp } from 'entities/sceneObj';
import { IObjData_Joined, IsObjDataOfObjMain, IsPropIsPropData } from 'shared/types/objs';
import { InstrumentsId, type ILayer } from 'shared/types';
import { CoordsPanel } from 'entities/scene';
import { LAYERS_OBJ_CONTROLS } from 'shared/config';

export const LeftBar = observer((): JSX.Element => {
  const constructLayersList = (layersArr: Array<ILayer>) => {
    return layersArr.map((l) => {
      return (
        <LayerItem
          layerId={l._id}
          name={l._name}
          isEmpty={l.empty}
          isBlocked={l.blocked}
          key={l._id}
          isActive={l.active}
          isVisible={l.visible}
          numOfObjs={l.objsQuantity}
        />
      );
    });
  };

  const constructSelectedObjData = () => {
    const data =
      instrumentsModel.instrumentsData['selector'].selectedObjData ||
      instrumentsModel.instrumentsData['selector'].intersectedObjData;
    if (data) {
      return (
        <>
          {Object.keys(data).map((key, idx) => {
            const propValue = data[key as keyof typeof data];
            if (IsPropIsPropData(propValue) && propValue.pubTitle) {
              const layerId = data.layerId.value;
              const controlsData = LAYERS_OBJ_CONTROLS[layerId];
              // if (controlsData) {
              //   controlsData[key as keyof typeof controlsData];
              // }
              return (
                <InspectorInstr
                  key={key}
                  propId={key}
                  propName={propValue.pubTitle}
                  propValue={propValue.value.toString()}
                  isEditable={propValue.editType === 'editable'}
                  controls={controlsData}
                />
              );
            }
          })}
        </>
      );
    } else {
      return <>...</>;
    }
  };

  return (
    <div className={'leftBar'}>
      <PanelDivision header={'Layers'}>{constructLayersList(layersModel.layers)}</PanelDivision>

      <PanelDivision header={'Object Properties'}>
        {/* Content */}
        {instrumentsModel.currentInstrument?.id === InstrumentsId.SELECTOR
          ? constructSelectedObjData()
          : 'Use Selector to select an object from the scene'}
        {instrumentsModel._getInstrument(InstrumentsId.INSPECTOR)?.isActive
          ? 'Inspector active'
          : 'Inspector not active'}
      </PanelDivision>

      <PanelDivision>
        <CoordsPanel />
        {/* {instrumentsModel.currentTool?.name === 'selector' && constructIntersectedObjData()} */}
      </PanelDivision>
    </div>
  );
});
