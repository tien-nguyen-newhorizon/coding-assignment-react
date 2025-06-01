import axios from 'axios';
import get from 'lodash/get';
import qs from 'query-string';

import { APIFunction } from './api';
import { GET_METHOD } from '@client/constants/apiCode';

export const API_ERROR_MESSAGE_GENERAL = 'Oops. Something wrong happened';
export const ERROR_MESSAGE_NO_NETWORK = 'ERROR_MESSAGE_NO_NETWORK';

const api: APIFunction = async ({
  url,
  params = '',
  method = GET_METHOD,
  headers = {},
  data = '',
  responseType,
  signal,
}) => {
  const newParams = qs.parse(qs.stringify(params as object, { arrayFormat: 'comma' }));

  try {
    const response = await axios({
      method,
      url,
      headers: {
        Accept: 'application/json',
        ...headers,
      },
      responseType,
      params: newParams,
      data,
      signal,
    });
    return response;
  } catch (error: unknown) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
      return null;
    } else {
      const response = get(error, 'response', {});
      console.warn('error response ', response);

      throw error;
    }
  } finally {
    // dome something else
  }
};

export default api;
