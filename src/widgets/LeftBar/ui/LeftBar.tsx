import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import cn from 'classnames';

import './leftBar.scss';
import { instrumentsState, layersState } from 'shared/model';
import { LayersListItem } from 'components/complex/LayersListItem/LayersListItem';
import { CoordsDisplay } from 'components/complex/CoordsPanel/CoordsPanel';
import { PanelDivision } from 'shared/ui';
import { IObjProperties, IObj_PROP_Data } from 'shared/types/objsData';

export const LeftBar = observer((): JSX.Element => {
  const constructLayersList = (layersArr: typeof layersState.layers) => {
    return layersArr.map((l) => {
      return (
        <LayersListItem
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
            const value = data[key as keyof IObjProperties[keyof IObjProperties]] as IObj_PROP_Data<string | number>;
            console.log(value);
            return (
              <div key={idx}>
                <span>{key}</span>
                <span>{value.value !== undefined ? value.value : 'no data'}</span>
              </div>
            );
          })}
        </>
      );
    } else {
      return <>No obj selected</>;
    }
  };

  //get properties list
  //if public - render 2 columns - prop - value

  return (
    <div className={'leftBar'}>
      <PanelDivision header={'Layers'}>{constructLayersList(layersState.layers)}</PanelDivision>

      <PanelDivision header={'Object Properties'}>{constructSelectedObjData()}</PanelDivision>

      <div className={'leftBar__coordsPanel'}>
        <CoordsDisplay />
      </div>
    </div>
  );
});
