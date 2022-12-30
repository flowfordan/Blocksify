import React from 'react';
import cn from 'classnames';

import { LayersListItemProps } from './LayersListItem.props';
import './layersListItem.scss';

import { AssetKey, assetsData } from '../../_data/assetsData';
import { returnSvgNode } from '../../../helpers/returnSvgNode';
import { layersState } from '../../../state';

const LayersListItem = ({
  layerId,
  name,
  isEmpty,
  isActive,
  isVisible,
  isBlocked,
  ...props
}: LayersListItemProps): JSX.Element => {
  const handleLayerVisibility = () => {
    layersState.setLayerVisibility(layerId);
  };

  const handleSelectLayer = () => {
    layersState.toggleActiveLayer(layerId);
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

export { LayersListItem };
