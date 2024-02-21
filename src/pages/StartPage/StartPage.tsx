import React from 'react';
import styles from './startPage.module.scss';
import Link from 'next/link';

export const StartPage = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <svg>
          <use href="/icons/logo.svg#logo" />
        </svg>
      </div>
      <div className={styles.body}>
        <div>
          <p>{`I have created the BLOCKSIFY project as a playground for exploring the features of
           3D graphics on the web. 
           Eventually, it has evolved into a small CAD system.`}</p>
          <p>{`The project is archived, but you are welcome to try it out and explore the source code`}</p>
        </div>
        <Link href={'/workspace'}>
          <div className={styles.btn}>{'Take a look'}</div>
        </Link>
      </div>
      <div className={styles.footer}>
        <Link href={'https://github.com/flowfordan/Blocksify'} target="_blank">
          <span className={styles.footer__item}>
            <span>
              <svg>
                <use href={'/icons/github-logo.svg#logo'} />
              </svg>
            </span>
            <span>{'Source'}</span>
          </span>
        </Link>
      </div>
    </div>
  );
};
