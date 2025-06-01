import SuspenseWrapper from '@client/components/SuspenseWrapper';
import TicketDetail from '@client/modules/TicketManagement/TicketDetail';

const TicketDetailPage = () => {
  return (
    <SuspenseWrapper>
      <TicketDetail />
    </SuspenseWrapper>
  );
};

export default TicketDetailPage;
