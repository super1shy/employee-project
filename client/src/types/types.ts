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

export type Employee = {
  id?: number;
  firstName: string;
  lastName: string;
  age: string;
  address: string;
  userId: number;
};
