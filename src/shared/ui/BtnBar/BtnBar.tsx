import React from 'react';
import cn from 'classnames';

import { BtnBarProps } from './BtnBar.props';
import { Btn } from '../Btn/Btn';

import styles from './btnBar.module.scss';
import { Icon } from '../Icon/Icon';

export const BtnBar = ({
  children,
  className,
  iconKey,
  btnName,
  isExpandable = false,
  isSelected = false,
  isActive,
  ...props
}: BtnBarProps): JSX.Element => {
  return (
    <Btn
      className={cn(className, styles.btnBar, {
        [styles.expandable]: isExpandable,
        [styles.active]: isActive,
        [styles.selected]: isSelected,
      })}
      heightConfiguration={'spilled'}
      {...props}
    >
      {btnName && <span className={styles.main}>{btnName}</span>}
      {/* {iconKey && <span className={'btnBar__main'}>{returnSvgNode(iconKey)}</span>} */}
      {iconKey && (
        <span className={styles.main}>
          <Icon name={iconKey} />
        </span>
      )}
      {isExpandable && (
        <span className={styles.arrow}>
          <Icon name="arrowHead" size={8} />
        </span>
      )}
    </Btn>
  );
};
