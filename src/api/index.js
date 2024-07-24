import api from './fetch';

export const submitFeedback = (data) => {
  return api.post('/message/messages', JSON.stringify(data));
};
