import React from 'react';
import cn from 'classnames';

import { BtnBarProps } from './BtnBar.props';
import './btnBar.scss';
import { Btn } from '../../basic/Btn/Btn';
import { returnSvgNode } from '../../../helpers/returnSvgNode';

const BtnBar = ({
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
      {iconKey && <span className={'btnBar__main'}>{returnSvgNode(iconKey)}</span>}
      {isExpandable && <span className={'btnBar__arrow'}>{returnSvgNode('arrowHead')}</span>}
    </Btn>
  );
};

export { BtnBar };
