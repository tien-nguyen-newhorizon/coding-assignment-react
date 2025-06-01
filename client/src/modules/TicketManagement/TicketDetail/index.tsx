import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useAssignTicketMutation,
  useTicketDetailsQuery,
  useUnAssignTicketMutation,
  useUpdateTicketStatusMutation,
} from '@client/api/tickets';
import { useUsersQuery } from '@client/api/users';
import UserSelect from '../UserSelect';

const TicketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { mutate: triggerAssignTicket } = useAssignTicketMutation();
  const { mutate: triggerUpdateTicket } = useUpdateTicketStatusMutation();
  const { mutate: triggerUnAssignTicket } = useUnAssignTicketMutation();
  const { data: ticket } = useTicketDetailsQuery(Number(id));
  const { data: users = [] } = useUsersQuery();

  if (!ticket) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ticket Not Found</h2>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-sky-500/75 text-white rounded-md hover:bg-sky-600/75 transition-colors"
        >
          Back to List
        </button>
      </div>
    );
  }

  const handleAssign = (userId: string | null) => {
    const { id } = ticket;

    if (!userId)
      return triggerUnAssignTicket(
        { ticketId: id },
        {
          onSuccess: () => toast.success('Ticket unassigned successfully!'),
          onError: () => toast.success('Ticket unassigned unsuccessfully!'),
        },
      );

    triggerAssignTicket(
      { ticketId: id, assigneeId: Number(userId) },
      {
        onSuccess: () => toast.success('Ticket assigned successfully!'),
        onError: () => toast.error('Ticket assigned unsuccessfully!'),
      },
    );
  };

  const handleComplete = () => {
    triggerUpdateTicket(
      {
        id: ticket.id,
        status: ticket.completed ? false : true,
      },
      {
        onSuccess: () => toast.success(ticket.completed ? 'Ticket marked as incomplete' : 'Ticket marked as completed'),
        onError: () => toast.success('Failed to update ticket status'),
      },
    );
  };

  const statusColors = {
    open: 'bg-red-100 text-red-800',
    assigned: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-3xl font-bold text-gray-900">{ticket.description}</h2>
        <span
          className={`px-4 py-2 rounded-full text-lg font-semibold capitalize ${
            ticket.completed ? statusColors['completed'] : statusColors['open']
          }`}
        >
          {ticket.completed ? 'Completed' : 'Open'}
        </span>
      </div>

      <div className="space-y-4 mb-6">
        <UserSelect
          users={users}
          selectedUserId={`${ticket.assigneeId}`}
          onSelect={handleAssign}
          disabled={ticket.completed}
        />
        <p className="text-sm text-gray-600">
          Current Assignee: {ticket.assigneeId ? users.find((u) => u.id === ticket.assigneeId)?.name : 'None'}
        </p>
      </div>

      <div className="flex justify-end gap-3">
        {
          <button
            onClick={handleComplete}
            className={`px-5 cursor-pointer py-2 
             text-white rounded-md 
            transition-colors disabled:opacity-50 disabled:cursor-not-allowed
            ${ticket.completed ? 'bg-amber-500/75 hover:bg-amber-600/75' : 'bg-sky-500/75 hover:bg-sky-600/75 '}`}
          >
            {ticket.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
          </button>
        }
        <button
          onClick={() => navigate('/')}
          className="px-5 cursor-pointer py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default TicketDetail;
