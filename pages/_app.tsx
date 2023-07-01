import type { AppProps } from 'next/app';
import '../styles/index.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';

const MyApp = observer(({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
});

export default MyApp;
