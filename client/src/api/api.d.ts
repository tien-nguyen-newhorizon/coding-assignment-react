import { Method, ResponseType, GenericAbortSignal } from 'axios';

import { AnyObject } from '@/constants/types';

export type ErrorObjectType = {
  property: string;
  invalidValue: string;
  message: string;
};

export interface DataProperty {
  url: string;
  params?: AnyObject | string;
  method?: Method;
  headers?: AnyObject;
  data?: AnyObject | string;
  responseType?: ResponseType;
  signal?: GenericAbortSignal;
}

export type APIFunction = (params: DataProperty) => any;
