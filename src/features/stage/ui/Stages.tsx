import React from 'react';
import './stages.scss';
import cn from 'classnames';

interface IStageBlock {
  id: string;
  order: number;
  icon: string;
  title: string;
  status: 'not_started' | 'current' | 'completed';
}

const mockBlocks = [
  {
    id: 'start',
    order: 0,
    icon: '',
    title: 'start',
    status: 'completed',
  },
  {
    id: 'bordered',
    order: 1,
    icon: '',
    title: 'bordered',
    status: 'current',
  },
  {
    id: 'divided',
    order: 2,
    icon: '',
    title: 'divided',
    status: 'not_started',
  },
  {
    id: 'blocksyfied',
    order: 3,
    icon: '',
    title: 'blocksyfied',
    status: 'not_started',
  },
];

export const Stages = () => {
  return (
    <div className={'stages'}>
      <span className={'stages__ptsWrap'}>
        {mockBlocks.map((b) => {
          return (
            <div
              key={b.id}
              className={cn('stages__ptsWrap__line', {
                ['stages__ptsWrap__line--start']: b.id === 'start',
                ['stages__ptsWrap__line--completed']: b.status === 'completed',
                ['stages__ptsWrap__line--current']: b.status === 'current',
              })}
            >
              {/* {b.id !== 'start' && <div className={'stages__ptsWrap__line'}></div>} */}

              <div
                className={cn('stages__ptsWrap__ptOuter', {
                  ['stages__ptsWrap__ptOuter--completed']: b.status === 'completed',
                  ['stages__ptsWrap__ptOuter--current']: b.status === 'current',
                })}
              ></div>
              <div
                className={cn('stages__ptsWrap__ptInner', {
                  ['stages__ptsWrap__ptInner--completed']: b.status === 'completed',
                  ['stages__ptsWrap__ptInner--current']: b.status === 'current',
                })}
              ></div>
            </div>
          );
        })}
      </span>
      {/* <span>Stuff</span> */}
    </div>
  );
};
