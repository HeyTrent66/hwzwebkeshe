import request from './request';

interface CreditRecord {
  id: number;
  userId: number;
  type: string;
  amount: number;
  description: string;
  createdAt: string;
}

interface CreditResponse {
  records: CreditRecord[];
  totalPages: number;
  currentPage: number;
}

export const getCreditRecords = async (params: { page: number; size: number }) => {
  const response = await request.get<CreditResponse>('/credits/records', { params });
  return response.data;
};

export const getCreditRules = async () => {
  const response = await request.get('/credits/rules');
  return response.data;
};

export const exchangeCredit = async (data: {
  itemId: number;
  amount: number;
}) => {
  const response = await request.post('/credits/exchange', data);
  return response.data;
}; 