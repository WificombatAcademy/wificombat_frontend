'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ReactNode, useEffect, useState } from 'react';

type Props = {
    children: ReactNode
}

const Providers = ({ children }: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {children}
      {isClient && (
        <ProgressBar
          height="4px"
          color="#0784C3"
          options={{ showSpinner: false }}
          shallowRouting
        />
      )}
    </>
  );
};

export default Providers;