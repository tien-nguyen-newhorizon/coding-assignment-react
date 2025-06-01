import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Ticket } from '@acme/shared-models';
import { useUsersQuery } from '@client/api/users';

type TicketCardProps = {
  ticket: Ticket;
};

const TicketCard: FC<TicketCardProps> = ({ ticket }) => {
  const { data: users = [] } = useUsersQuery();
  const assignee = ticket.assigneeId ? users.find((u) => u.id === ticket.assigneeId) : null;
  const { description, completed, id } = ticket;

  return (
    <div
      className={` p-6 rounded-lg shadow-sm border  hover:shadow-md transition-shadow
        ${completed ? 'bg-lime-50 border-gray-200' : 'bg-gray-50 border-gray-200'}
    `}
    >
      <Link to={`/ticket/${id}`}>
        <h3 className="text-xl font-semibold text-gray-900  mb-2 hover:text-sky-500/75">{description}</h3>
      </Link>
      <div className="flex justify-between items-center text-sm font-medium">
        <span className="text-gray-700">{assignee ? `Assigned to: ${assignee.name}` : 'Unassigned'}</span>
      </div>
    </div>
  );
};

export default TicketCard;
