import { useState } from 'react';
import { FilterOption } from '../types';
import { TicketListContent } from '../TicketListingContent';
import SuspenseWrapper from '@client/components/SuspenseWrapper';
import AddTicketForm from '../AddTicketForm';
import { useModalContext } from '@client/components/Modal/ModalProvider';

const TicketListing = () => {
  const [filterStatus, setFilterStatus] = useState<FilterOption>('all');
  const { open } = useModalContext();

  const showForm = () => {
    open(<AddTicketForm />, { preventCloseOnOverlayClick: true });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Tickets</h2>
        <button
          onClick={showForm}
          className="px-5 py-2 cursor-pointer bg-sky-500/75 hover:bg-sky-600/75 text-white rounded-md  transition-colors"
        >
          Add New Ticket
        </button>
      </div>

      <div className="mb-6">
        <label htmlFor="statusFilter" className="block text-gray-700 text-sm font-bold mb-2">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as FilterOption)}
          className="block w-full md:w-1/3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="assigned">Assigned</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <SuspenseWrapper>
        <TicketListContent filterStatus={filterStatus} />
      </SuspenseWrapper>
    </div>
  );
};
export default TicketListing;
