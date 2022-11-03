import React from 'react';
import cn from 'classnames';
import "./layerListItemTest.css";

import { LayersListItemProps } from './LayersListItem.props';
import styles from './layersListItem.module.css';

import { AssetKey, assetsData } from '../../_data/assetsData';
import { returnSvgNode } from '../../../helpers/returnSvgNode';


const LayersListItem = ({ children, name, isEmpty, isActive, ...props }: LayersListItemProps): JSX.Element => {
  return (
    <div className={cn(styles.layersListItem, 'testStuff')}
    // {cn(styles.layersListItem, {
    //   [styles.layersListItem_active]: isActive
    // })}
      {...props}>
      <span className={styles.emptyStatus}>{isEmpty ? null : <span className={styles.nonEmptyBadge}></span>}</span>
      <span>{name}</span>
      <span>bl</span>
      <span>vis</span>
    </div>
  );
};

export { LayersListItem };

