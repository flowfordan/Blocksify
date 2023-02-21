import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import cn from 'classnames';

import './leftBar.scss';
import { instrumentsState, layersState } from 'shared/model';
import { CoordsDisplay } from 'components/complex/CoordsPanel/CoordsPanel';
import { PanelDivision } from 'shared/ui';
import { IObjProperties, IObj_PROP_Data } from 'shared/types/objsData';
import { LayerItem } from 'entities/layer';
import { ObjDataProp } from 'entities/sceneObj';

export const LeftBar = observer((): JSX.Element => {
  const constructLayersList = (layersArr: typeof layersState.layers) => {
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
    const data = instrumentsState.toolsData['selector'].selectedObjData;
    if (data) {
      return (
        <>
          {Object.keys(data).map((key, idx) => {
            const propValue = data[key as keyof IObjProperties[keyof IObjProperties]] as IObj_PROP_Data<
              string | number
            >;
            if (propValue.pubPropTitle) {
              return <ObjDataProp key={key} propName={propValue.pubPropTitle} propValue={propValue.value} />;
            }
          })}
        </>
      );
    } else {
      return <>Select object</>;
    }
  };

  const constructIntersectedObjData = () => {
    const data = instrumentsState.toolsData['selector'].intersectedObjData?.name.value;
    if (data) {
      return <div>{data}</div>;
    } else return <div>no data</div>;
  };

  //get properties list
  //if public - render 2 columns - prop - value

  return (
    <div className={'leftBar'}>
      <PanelDivision header={'Layers'}>{constructLayersList(layersState.layers)}</PanelDivision>

      <PanelDivision header={'Object Properties'}>
        {instrumentsState.currentTool?.name === 'selector' && constructSelectedObjData()}
      </PanelDivision>

      <PanelDivision>
        {instrumentsState.currentTool?.name === 'selector' && constructIntersectedObjData()}
      </PanelDivision>

      <div className={'leftBar__coordsPanel'}>
        <CoordsDisplay />
      </div>
    </div>
  );
});
