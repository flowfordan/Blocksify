import React from 'react';
import cn from 'classnames';

// import { returnSvgNode } from 'shared/lib';
import styles from './layerItem.module.scss';
import { LayerItemProps } from './LayerItem.prop';
import { layersModel } from '../model/layersModel';
import { Icon } from 'shared/ui';

const LayerItem = ({ layerId, name, isEmpty, isActive, isVisible, isBlocked, numOfObjs, ...props }: LayerItemProps) => {
  const handleLayerVisibility = () => {
    layersModel.setLayerVisibility(layerId);
  };

  const handleSelectLayer = () => {
    layersModel.toggleActiveLayer(layerId);
  };
  return (
    <div
      className={cn(styles.layersListItem, {
        [styles.active]: isActive,
        [styles.hidden]: !isVisible,
        [styles.blocked]: isBlocked,
      })}
      {...props}
    >
      <span className={styles.emptyStatus}>{isEmpty ? null : <span className={styles.nonEmptyBadge}></span>}</span>
      <span className={styles.name} onClick={() => handleSelectLayer()}>
        <span>{name}</span>
        <span
          className={cn(styles.name__counter, {
            [styles.hidden]: numOfObjs === 0,
          })}
        >
          {numOfObjs}
        </span>
      </span>
      {isBlocked ? (
        <span className={styles.iconContainer}>
          <Icon name="lock" size={16} />
        </span>
      ) : null}
      <span className={styles.iconContainer} onClick={() => handleLayerVisibility()}>
        {isVisible ? <Icon name="eye" size={16} /> : <Icon name="eyeClosed" size={16} />}
      </span>
    </div>
  );
};

export { LayerItem };
