import React from 'react';
import cn from 'classnames';

import { CheckMatrixProps } from './CheckMatrix.props';
import styles from './CheckMatrix.module.css';
import { toolsState } from '../../../state';

import { observer } from "mobx-react-lite";

const CheckMatrix = observer(({ items, selected, ...props }: CheckMatrixProps): JSX.Element => {
  const closed: Array<number> = [];

  for (const choice of selected){
    for (const item of items) {
      if ((item % choice === 0) && item > choice && !selected.includes(item)) {
        closed.push(item);
      }
    }
  }

  const handleCollectionUpd = (value: number) => {
    console.log('upd collect', 'item', value);
    toolsState.setValuesCollection(1, value);
  };

  return (
    <div className={styles.matrix}>
      {items.map((i, idx) => {
        return (
          <span key={idx} onClick={() => handleCollectionUpd(i)} className={cn(styles.item, {
            [styles.itemClosed]: closed.includes(i),
            [styles.itemSelected]: selected.includes(i)
          })}>{i}</span>
        );
      })}
    </div>
  );
});

export { CheckMatrix };

