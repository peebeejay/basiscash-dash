import { ApiData } from './types';

export const apiGetData = async (): Promise<ApiData | undefined> => {
  const uri = 'https://basiscash-server.junto2015.vercel.app/api/data';

  try {
    const response = await fetch(uri, { method: 'GET' });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.warn('Failed to fetch dashboard data');
  }
};
