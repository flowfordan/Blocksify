import dynamic from 'next/dynamic';

export const AppPageDynamic = dynamic(() => import('./AppPage').then((mod) => mod.AppPage), {
  ssr: false,
});
