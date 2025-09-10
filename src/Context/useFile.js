import { useContext } from 'react';
import { FileContext } from './FileProvider';

const useFile = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFile must be used within a FileProvider');
  }
  return context;
};

export { useFile };
