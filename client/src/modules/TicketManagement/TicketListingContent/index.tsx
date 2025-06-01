import { useTicketsQuery } from '@client/api/tickets';
import { FilterOption } from '../types';
import TicketCard from '../TicketCard';

export const TicketListContent = ({ filterStatus }: { filterStatus: FilterOption }) => {
  const { data: tickets = [] } = useTicketsQuery();

  const filteredTickets = tickets.filter((ticket) => {
    if (filterStatus === 'completed') return ticket.completed;
    if (filterStatus === 'open') return !ticket.completed && !ticket.assigneeId;
    if (filterStatus === 'assigned') return !ticket.completed && ticket.assigneeId;
    return true;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTickets.length > 0 ? (
        filteredTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
      ) : (
        <p className="text-gray-600 col-span-full text-center py-8">No tickets found</p>
      )}
    </div>
  );
};
