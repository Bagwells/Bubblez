import axios from 'axios';

const useApi = () => {
  // When running Next + Express (pnpm dev), API is on 3001. Set NEXT_PUBLIC_API_BASE_URL to override.
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    (typeof window !== "undefined" ? "http://localhost:3001" : "http://localhost:3001");
  const api = axios.create({
    baseURL: `${baseURL.replace(/\/$/, "")}/api`,
    headers: {
      'Content-Type': 'application/json',
      
    },
  });

  const post = async (url: string, data: unknown) => {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const get = async (url:string) => {
    try {
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const put = async (url: string, data: unknown) => {
    try {
      const response = await api.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const del = async (url: string) => {
    try {
      const response = await api.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { get, post, put, delete: del };
};

export default useApi;
