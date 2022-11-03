import React from 'react';
import cn from 'classnames';

import { LayersListItemProps } from './LayersListItem.props';
import './layersListItem.scss';

import { AssetKey, assetsData } from '../../_data/assetsData';
import { returnSvgNode } from '../../../helpers/returnSvgNode';


const LayersListItem = ({ children, name, isEmpty, isActive, isVisible, isBlocked = false, ...props }: LayersListItemProps): JSX.Element => {
  return (
    <div className={cn('layersListItem', {
      ['layersListItem_active']: isActive
    })}
    {...props}>
      <span className={'layersListItem__emptyStatus'}>{isEmpty ? null : <span className={'layersListItem__nonEmptyBadge'}></span>}</span>
      <span>{name}</span>
      <span>bl</span>
      <span>{isVisible ? returnSvgNode('eye') : returnSvgNode('eyeClosed')}</span>
    </div>
  );
};

export { LayersListItem };

