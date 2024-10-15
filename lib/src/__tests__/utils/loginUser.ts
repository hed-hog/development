import axios from 'axios';
import { decodeTokenJWT } from './decodeTokenJWT';

export const loginUser = async (
  email: string,
  password: string,
): Promise<any> => {
  const response = await axios.post(`http://localhost:3000/auth/login`, {
    email,
    password,
  });

  const { user } = decodeTokenJWT(response.data.token);

  return user;
};
