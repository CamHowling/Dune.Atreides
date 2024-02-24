import { useState } from 'react';

export const useInit = (initCallback: () => void) => {
  const [initialized, setInitialized] = useState(false);

  if (!initialized) {
    initCallback();
    setInitialized(true);
  }
};