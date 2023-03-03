import React from 'react';
import cn from 'classnames';

import { returnSvgNode } from 'shared/lib';
import './layerItem.scss';
import { LayerItemProps } from './LayerItem.prop';
import { layersModel } from '../model/layersModel';

const LayerItem = ({ layerId, name, isEmpty, isActive, isVisible, isBlocked, ...props }: LayerItemProps) => {
  const handleLayerVisibility = () => {
    layersModel.setLayerVisibility(layerId);
  };

  const handleSelectLayer = () => {
    layersModel.toggleActiveLayer(layerId);
  };
  return (
    <div
      className={cn('layersListItem', {
        ['layersListItem-active']: isActive,
        ['layersListItem-hidden']: !isVisible,
        ['layersListItem-blocked']: isBlocked,
      })}
      {...props}
    >
      <span className={'layersListItem__emptyStatus'}>
        {isEmpty ? null : <span className={'layersListItem__nonEmptyBadge'}></span>}
      </span>
      <span className={'layersListItem__name'} onClick={() => handleSelectLayer()}>
        {name}
      </span>
      {isBlocked ? <span>{returnSvgNode('lock')}</span> : null}
      <span onClick={() => handleLayerVisibility()}>
        {isVisible ? returnSvgNode('eye') : returnSvgNode('eyeClosed')}
      </span>
    </div>
  );
};

export { LayerItem };
