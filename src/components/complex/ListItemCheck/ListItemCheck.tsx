import React from 'react';

import { ListItemCheckProps } from './ListItemCheck.props';
import styles from './ListItemCheck.module.css';

import TickIcon from '../../../assets/icons/tick.svg';
import { AssetKey, assetsData } from '../../_data/assetsData';


const ListItemCheck = ({ title, isChecked, icon, children, ...props }: ListItemCheckProps): JSX.Element => {
  console.log(icon);
  const returnSvgNode = (iconKey: AssetKey) => {
    if (!iconKey){
      return <></>;
    }
    const IconToRender = assetsData[iconKey];
    return <IconToRender />;
  };

  return (
    <div className={icon ? styles.listItemCheck : styles.listItemCheck_bold} {...props}>
      <span className={styles.check}>{isChecked && <TickIcon />}</span>
      {icon && <span className={styles.icon}>
        <>
          {returnSvgNode(icon)}
        </>
      </span>}
      <span className={styles.title}>{title}</span>
      {children && <span className={styles.content}>{children}</span>}
    </div>
  );
};

export { ListItemCheck };

