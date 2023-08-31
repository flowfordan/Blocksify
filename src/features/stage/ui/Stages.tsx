import React from 'react';
import styles from './stages.module.scss';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { sceneModel } from 'entities/scene';

export const Stages = observer(() => {
  const stages = sceneModel.stages;
  return (
    <div className={styles.stages}>
      <span className={styles.ptsWrap}>
        {stages.map((b) => {
          return (
            <div
              key={b.id}
              className={cn(styles.line, {
                [styles.start]: b.id === 'start',
                [styles.completed]: b.status === 'completed',
                [styles.current]: b.status === 'current',
              })}
            >
              {/* {b.id !== 'start' && <div className={'stages__ptsWrap__line'}></div>} */}

              <div
                className={cn(styles.ptOuter, {
                  [styles.completed]: b.status === 'completed',
                  [styles.current]: b.status === 'current',
                })}
              ></div>
              <div
                className={cn(styles.ptInner, {
                  [styles.completed]: b.status === 'completed',
                  [styles.current]: b.status === 'current',
                })}
              ></div>

              <div
                className={cn(styles.icon, {
                  [styles.completed]: b.status === 'completed',
                  [styles.current]: b.status === 'current',
                })}
              >
                <svg>
                  <use href={`/icons/stage_bundle.svg#${b.id}`} className={'stages__ptsWrap__icon__svg'} />
                </svg>
                <div
                  className={cn(styles.txt, {
                    [styles.start]: b.id === 'start',
                    [styles.completed]: b.status === 'completed',
                    [styles.current]: b.status === 'current',
                  })}
                >
                  {b.title}
                </div>
              </div>
            </div>
          );
        })}
      </span>
      {/* <span>Stuff</span> */}
    </div>
  );
});
