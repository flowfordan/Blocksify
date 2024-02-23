import type { AppProps } from 'next/app';
import 'styles/index.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';

const MyApp = observer(({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Blocksify</title>
        <meta property="og:title" content="Blocksify" />
        <meta name="twitter:title" content="Blocksify"></meta>
        <meta name="description" content="Tiny 3D web CAD" />
        <meta property="og:description" content="Tiny 3D web CAD" />
        <meta name="twitter:description" content="Tiny 3D web CAD"></meta>
        <meta
          name="viewport"
          content="height=device-height, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="author" content="flowfordan (Daniil Rychkov)" />
        <link rel="icon" type="image/png" href="favicon@32.png" /> /
        <link rel="icon" type="image/x-icon" href="/meta/favicon.ico" />
        <link rel="apple-touch-icon" href="icon@152.png"></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
});

export default MyApp;
