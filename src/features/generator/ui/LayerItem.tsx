import React from 'react';
import cn from 'classnames';

// import { returnSvgNode } from 'shared/lib';
import './layerItem.scss';
import { LayerItemProps } from './LayerItem.prop';
import { layersModel } from 'entities/layer';
import { Icon } from 'shared/ui';

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
      {isBlocked ? (
        <span className={'layersListItem__iconContainer'}>
          <Icon name="lock" size={16} />
        </span>
      ) : null}
      <span className={'layersListItem__iconContainer'} onClick={() => handleLayerVisibility()}>
        {isVisible ? <Icon name="eye" size={16} /> : <Icon name="eyeClosed" size={16} />}
      </span>
    </div>
  );
};

export { LayerItem };
