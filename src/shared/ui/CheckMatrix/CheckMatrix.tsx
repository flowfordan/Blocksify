import React from 'react';
import cn from 'classnames';

import { CheckMatrixProps } from './CheckMatrix.props';
import './checkMatrix.scss';

import { observer } from 'mobx-react-lite';

const CheckMatrix = observer(({ items, selected, handleCollectionUpd, ...props }: CheckMatrixProps): JSX.Element => {
  //items - whole colleaction
  //selected - items selected from collection
  const closed: Array<number> = [];

  //TODO rewrite
  for (const choice of selected) {
    for (const item of items) {
      if (item % choice === 0 && item > choice && !selected.includes(item)) {
        closed.push(item);
      }
    }
  }

  const updValues = (value: number) => {
    console.log('upd collect', 'item', value);
    handleCollectionUpd(value);
  };

  return (
    <div className={'checkMatrix'} {...props}>
      {items.map((i, idx) => {
        return (
          <span
            key={idx}
            onClick={() => updValues(i)}
            className={cn('checkMatrix__item', {
              ['checkMatrix__itemClosed']: closed.includes(i),
              ['checkMatrix__itemSelected']: selected.includes(i),
            })}
          >
            {i}
          </span>
        );
      })}
    </div>
  );
});

export { CheckMatrix };
