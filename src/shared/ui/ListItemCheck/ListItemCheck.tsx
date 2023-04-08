import React from 'react';
import cn from 'classnames';

import { ListItemCheckProps } from './ListItemCheck.props';
import './listItemCheck.scss';

import { Icon } from '../Icon/Icon';

export const ListItemCheck = ({ title, isChecked, icon, children, ...props }: ListItemCheckProps): JSX.Element => {
  return (
    <div
      className={cn('listItemCheck', {
        ['listItemCheck_bold']: !icon,
      })}
      {...props}
    >
      <span className={'listItemCheck__check'}>{isChecked && <Icon name="tick" size={8} />}</span>
      {icon && (
        <span className={'listItemCheck__icon'}>
          <Icon name={icon} />
        </span>
      )}
      <span className={'listItemCheck__title'}>{title}</span>
      {children && <span className={'listItemCheck__content'}>{children}</span>}
    </div>
  );
};
