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

  return { user, token: response.data.token };
};

const userRootData = {
  email: 'root@hedhog.com',
  password: 'hedhog',
};

export const getGlobalToken = async () => {
  const { token: tokenRoot } = await loginUser(
    userRootData.email,
    userRootData.password,
  );

  return tokenRoot;
};
