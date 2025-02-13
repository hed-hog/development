import { bodies, CreatePersonUserlessType, defaults } from './templates';

const getBodyWrapper = (content: string[]) => {
  return defaults.default_body(content);
};

export const getCreatePersonUserlessEmail = (
  data: CreatePersonUserlessType,
) => {
  const body = bodies['create_person_userless'];
  const content = [
    defaults.header('Crie sua conta'),
    body(data),
    defaults.footer(),
  ];
  return getBodyWrapper(content);
};
