import { lazy } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ErrorBoundary from '@client/components/ErrorBoundary';
import DashboardLayout from '@client/components/layouts/DashboardLayout';
import SuspenseWrapper from '@client/components/SuspenseWrapper';

const TicketListingPage = lazy(() => import('../pages/TicketManagement/TicketListingPage'));
const TicketDetailPage = lazy(() => import('../pages/TicketManagement/TicketDetailPage'));

const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route
            index={true}
            element={
              <SuspenseWrapper>
                <DashboardLayout title="Ticket Listing">
                  <TicketListingPage />
                </DashboardLayout>
              </SuspenseWrapper>
            }
          />
          <Route
            path="ticket/:id"
            element={
              <SuspenseWrapper>
                <DashboardLayout title="Ticket Detail">
                  <TicketDetailPage />
                </DashboardLayout>
              </SuspenseWrapper>
            }
          />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default CustomRoutes;
