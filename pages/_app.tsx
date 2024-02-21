import type { AppProps } from 'next/app';
import 'styles/index.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';

const MyApp = observer(({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  return (
    <>
      <Head>
        <title>Blocksify</title>
        <meta name="description" content="Blocksify" />
      </Head>
      <Component {...pageProps} />
    </>
  );
});

export default MyApp;
