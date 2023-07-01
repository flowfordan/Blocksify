import type { NextPage } from 'next';
// import { AppPage } from 'pages';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { AppPageDynamic } from 'pages/AppPage/AppPgDynamic';
// import Layout from '../components/Layout';
// import PageHome from '../components/PageHome';

{
  /* <Layout noAuth>
<PageHome />
</Layout> */
}

const Workspace: NextPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {}, []);
  console.log('Workspace page');
  return <>{typeof window !== 'undefined' ? <AppPageDynamic /> : 'Blocksify workspace'}</>;
};

export default dynamic(() => Promise.resolve(Workspace), {
  ssr: false,
});
