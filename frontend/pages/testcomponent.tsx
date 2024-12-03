'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const TestComponent = () => {
  const searchParams = useSearchParams();
  const componentName = searchParams.get('component');

  if (!componentName) {
    return <div>Nessun componente specificato</div>;
  }

  const DynamicComponent = dynamic(
    () => import(`@/components/${componentName}`).catch(() => {
      return () => <div>Componente non trovato: {componentName}</div>;
    }),
    {
      loading: () => <div>Caricamento...</div>,
      ssr: false
    }
  );

  return (
    <Suspense fallback={<div>Caricamento...</div>}>
      <DynamicComponent />
    </Suspense>
  );
};

export default TestComponent;