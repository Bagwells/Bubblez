import axios from 'axios';

const useApi = () => {
  // Dev: hit Express on 3001. Production: always same-origin /api (Vercel rewrites proxy to backend) — never call non-www from www to avoid preflight redirect.
  const isProduction = process.env.NODE_ENV === "production";
  const baseURL = isProduction ? "" : "http://localhost:3001";
  const api = axios.create({
    baseURL: baseURL ? `${baseURL.replace(/\/$/, "")}/api` : "/api",
  headers: {
    "Content-Type": "application/json",
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
