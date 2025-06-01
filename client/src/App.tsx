import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';
import CustomRoutes from './routes';
import { ModalProvider } from './components/Modal/ModalProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: 1,
      suspense: true,
    },
  },
});

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <CustomRoutes />
        <ToastContainer />
      </ModalProvider>
    </QueryClientProvider>
  );
};

export default App;
