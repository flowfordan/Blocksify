import { useLayoutEffect, useRef } from 'react';

function useResizeObserver<T extends HTMLElement>(callback: (target: T, entry: ResizeObserverEntry) => void) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const element = ref?.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      callback(element, entries[0]);
    });

    observer.observe(element, { box: 'content-box' });
    return () => {
      observer.disconnect();
    };
  }, [callback, ref]);

  console.log('inside resize observer', ref);

  return ref;
}

export default useResizeObserver;
