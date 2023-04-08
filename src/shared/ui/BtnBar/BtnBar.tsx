import React from 'react';
import cn from 'classnames';

import { BtnBarProps } from './BtnBar.props';
import { Btn } from '../Btn/Btn';

import './btnBar.scss';
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
      className={cn(className, 'btnBar', {
        ['btnBar-expandable']: isExpandable,
        ['btnBar-active']: isActive,
        ['btnBar-selected']: isSelected,
      })}
      heightConfiguration={'spilled'}
      {...props}
    >
      {btnName && <span className={'btnBar__main'}>{btnName}</span>}
      {/* {iconKey && <span className={'btnBar__main'}>{returnSvgNode(iconKey)}</span>} */}
      {iconKey && (
        <span className={'btnBar__main'}>
          <Icon name={iconKey} />
        </span>
      )}
      {isExpandable && (
        <span className={'btnBar__arrow'}>
          <Icon name="arrowHead" size={8} />
        </span>
      )}
    </Btn>
  );
};
