import axios from 'axios';

export const loginUser = async (
  username: string,
  password: string,
): Promise<string> => {
  const response = await axios.post(`/auth/login`, { username, password });

  if (response.status !== 200) {
    throw new Error(`Login failed for ${username}`);
  }

  return response.data.token;
};
