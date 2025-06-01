import { FC } from 'react';
import { User } from '@acme/shared-models';

interface UserSelectProps {
  users: User[];
  selectedUserId: string | null;
  onSelect: (userId: string | null) => void;
  label?: string;
  disabled?: boolean;
}

const UserSelect: FC<UserSelectProps> = ({
  users,
  selectedUserId,
  onSelect,
  label = 'Assignee',
  disabled = false,
}: UserSelectProps) => {
  return (
    <div>
      <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id="assignee"
        value={selectedUserId || ''}
        onChange={(e) => onSelect(e.target.value === '' ? null : e.target.value)}
        className={`${
          disabled ? 'hover:cursor-not-allowed' : ''
        }  mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        disabled={disabled}
      >
        <option value="">Unassigned</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelect;
