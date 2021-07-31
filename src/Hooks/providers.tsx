import React from 'react';
import { Provider as FirebaseProvider } from './useFirebaseAuth';

const RootProvider: React.FC = ({ children }) => {
  return <FirebaseProvider>{children}</FirebaseProvider>;
};

export default RootProvider;
