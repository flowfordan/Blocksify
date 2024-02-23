import type { NextPage } from 'next';
// import { AppPage } from 'pages';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { AppPageDynamic } from 'pages/AppPage/AppPgDynamic';

const Workspace: NextPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {}, []);
  return <>{typeof window !== 'undefined' ? <AppPageDynamic /> : 'Blocksify workspace'}</>;
};

export default dynamic(() => Promise.resolve(Workspace), {
  ssr: false,
});
