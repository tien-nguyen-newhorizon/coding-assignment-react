import React, { FC, useState } from 'react';
import { useCreateTicketMutation } from '@client/api/tickets';
import { toast } from 'react-toastify';

interface AddTicketFormProps {
  onClose?: () => void;
}

const AddTicketForm: FC<AddTicketFormProps> = ({ onClose }: AddTicketFormProps) => {
  const { mutate: triggerCreateTicket } = useCreateTicketMutation();

  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      triggerCreateTicket(
        { description },
        {
          onSuccess: () => {
            toast('Add ticket success');
            onClose?.();
          },
          onSettled: () => {
            setDescription('');
          },
        },
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          required
        ></textarea>
      </div>
      <div className="flex justify-end space-x-3">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="cursor-pointer px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500/75 hover:bg-sky-600/75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Ticket
        </button>
      </div>
    </form>
  );
};

export default AddTicketForm;
