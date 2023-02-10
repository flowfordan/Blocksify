import React from 'react';
import cn from 'classnames';

import { ListItemCheckProps } from './ListItemCheck.props';
import './listItemCheck.scss';

import TickIcon from '../../../assets/icons/tick.svg';
import { AssetKey, assetsData } from '../../_data/assetsData';
import { returnSvgNode } from '../../../shared/lib/returnSvgNode';

const ListItemCheck = ({ title, isChecked, icon, children, ...props }: ListItemCheckProps): JSX.Element => {
  return (
    <div
      className={cn('listItemCheck', {
        ['listItemCheck_bold']: !icon,
      })}
      {...props}
    >
      <span className={'listItemCheck__check'}>{isChecked && <TickIcon />}</span>
      {icon && (
        <span className={'listItemCheck__icon'}>
          <>{returnSvgNode(icon)}</>
        </span>
      )}
      <span className={'listItemCheck__title'}>{title}</span>
      {children && <span className={'listItemCheck__content'}>{children}</span>}
    </div>
  );
};

export { ListItemCheck };
