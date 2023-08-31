import React from 'react';
import cn from 'classnames';

import { ListItemCheckProps } from './ListItemCheck.props';
import styles from './listItemCheck.module.scss';

import { Icon } from '../Icon/Icon';

export const ListItemCheck = ({
  title,
  isChecked,
  icon,
  children,
  disabled,
  ...props
}: ListItemCheckProps): JSX.Element => {
  return (
    <div
      className={cn(styles.listItemCheck, {
        [styles.bold]: !icon,
        [styles.disabled]: disabled,
      })}
      {...props}
    >
      <span className={styles.check}>{isChecked && <Icon name="tick" size={8} />}</span>
      {icon && (
        <span className={styles.icon}>
          <Icon name={icon} />
        </span>
      )}
      <span className={styles.title}>{title}</span>
      {children && <span className={styles.content}>{children}</span>}
    </div>
  );
};
