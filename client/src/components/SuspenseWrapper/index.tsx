import { Suspense, ReactNode, FC } from 'react';
import Spinner from '../Spinner';

interface SuspenseWrapperProps {
  fallback?: ReactNode;
  children: ReactNode;
}

const SuspenseWrapper: FC<SuspenseWrapperProps> = ({ fallback = <Spinner />, children }) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

export default SuspenseWrapper;
