export type ErrorWithMessage = {
  status: number;
  data: {
    message: string;
  };
};

export type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
};
