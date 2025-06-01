import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Ticket } from '@acme/shared-models';
import { API_ACTION, API_ENTITY, API_PREFIX, SERVICE_API_URL } from '@client/constants';
import api from '.';
import { DELETE_METHOD, POST_METHOD, PUT_METHOD } from '@client/constants/apiCode';

export const ticketKeys = {
  all: ['tickets'] as const,
  details: (id: string) => [...ticketKeys.all, id] as const,
};

const fetchTickets = async (): Promise<Ticket[]> => {
  const response = await api({
    url: `${SERVICE_API_URL}/${API_PREFIX}/${API_ENTITY.TICKETS}`,
  });

  return response.data;
};

const fetchTicketById = async (id: number): Promise<Ticket> => {
  const response = await api({
    url: `${SERVICE_API_URL}/${API_PREFIX}/${API_ENTITY.TICKETS}/${id}`,
  });

  return response.data;
};

const createTicket = async (requestPayload: { description: string }): Promise<Ticket> => {
  const response = await api({
    url: `${SERVICE_API_URL}/${API_PREFIX}/${API_ENTITY.TICKETS}`,
    method: POST_METHOD,
    data: requestPayload,
  });

  return response.data;
};

const updateTicketStatusApi = async ({ id, status }: { id: number; status: boolean }): Promise<Ticket> => {
  const response = await api({
    url: `${SERVICE_API_URL}/${API_PREFIX}/${API_ENTITY.TICKETS}/${id}/${API_ACTION.COMPLETE}`,
    method: status ? PUT_METHOD : DELETE_METHOD,
  });

  return response.data;
};

const assignTicketApi = async ({ ticketId, assigneeId }: { ticketId: number; assigneeId: number }): Promise<Ticket> => {
  const response = await api({
    url: `${SERVICE_API_URL}/${API_PREFIX}/${API_ENTITY.TICKETS}/${ticketId}/${API_ACTION.ASSIGN}/${assigneeId}`,
    method: PUT_METHOD,
  });

  return response.data;
};

const unAssignTicketApi = async ({ ticketId }: { ticketId: number }): Promise<Ticket> => {
  const response = await api({
    url: `${SERVICE_API_URL}/${API_PREFIX}/${API_ENTITY.TICKETS}/${ticketId}/${API_ACTION.UNASSIGN}`,
    method: PUT_METHOD,
  });

  return response.data;
};

export function useTicketsQuery() {
  return useQuery<Ticket[], Error>({
    queryKey: ticketKeys.all,
    queryFn: fetchTickets,
    suspense: true,
  });
}

export function useTicketDetailsQuery(id: number) {
  return useQuery<Ticket, Error>({
    queryKey: ticketKeys.details(`${id}`),
    queryFn: () => fetchTicketById(id),
    enabled: !!id,
  });
}

const useCreateTicketMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.all });
    },
  });
};

const useUpdateTicketStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTicketStatusApi,
    onSuccess: (updatedTicket) => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.details(`${updatedTicket.id}`) });
      queryClient.invalidateQueries({ queryKey: ticketKeys.all });
    },
  });
};

const useAssignTicketMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignTicketApi,
    onSuccess: (updatedTicket) => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.details(`${updatedTicket.id}`) });
      queryClient.invalidateQueries({ queryKey: ticketKeys.all });
    },
  });
};

const useUnAssignTicketMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unAssignTicketApi,
    onSuccess: (updatedTicket) => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.details(`${updatedTicket.id}`) });
      queryClient.invalidateQueries({ queryKey: ticketKeys.all });
    },
  });
};

export { useCreateTicketMutation, useUpdateTicketStatusMutation, useAssignTicketMutation, useUnAssignTicketMutation };
