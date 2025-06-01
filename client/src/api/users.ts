import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@acme/shared-models';
import { API_ENTITY, API_PREFIX, SERVICE_API_URL } from '@client/constants';
import api from '.';

export const usersKeys = {
  all: ['users'] as const,
  details: (id: string) => [...usersKeys.all, id] as const,
};

const fetchUsers = async (): Promise<User[]> => {
  const response = await api({
    url: `${SERVICE_API_URL}/${API_PREFIX}/${API_ENTITY.USERS}`,
  });

  return response.data;
};

export function useUsersQuery() {
  return useQuery<User[], Error>({
    queryKey: usersKeys.all,
    queryFn: fetchUsers,
  });
}
