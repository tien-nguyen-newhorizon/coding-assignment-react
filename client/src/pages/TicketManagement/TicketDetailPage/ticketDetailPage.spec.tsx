import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TicketDetailPage from './index';

// 1. Mock the dependencies
jest.mock('@client/components/SuspenseWrapper', () => {
  return ({ children }: { children: React.ReactNode }) => <div data-testid="mock-suspense-wrapper">{children}</div>;
});

jest.mock('@client/modules/TicketManagement/TicketDetail', () => {
  return () => <div data-testid="mock-ticket-detail">Mock Ticket Detail Content</div>;
});

describe('TicketDetailPage', () => {
  // --- Render Test ---
  it('should render the SuspenseWrapper and TicketDetail components', () => {
    render(<TicketDetailPage />);

    const suspenseWrapper = screen.getByTestId('mock-suspense-wrapper');
    expect(suspenseWrapper).toBeInTheDocument();

    const ticketDetail = screen.getByTestId('mock-ticket-detail');
    expect(ticketDetail).toBeInTheDocument();
    expect(suspenseWrapper).toContainElement(ticketDetail);

    expect(screen.getByText('Mock Ticket Detail Content')).toBeInTheDocument();
  });

  // --- Snapshot Test ---
  it('should match the snapshot', () => {
    const { asFragment } = render(<TicketDetailPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
