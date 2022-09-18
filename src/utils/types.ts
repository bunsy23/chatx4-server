export type createUserDetails = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type validateUserDetails = {
  email: string;
  password: string;
};

export type FindUserParams = Partial<{
  id: number;
  email: string;
}>;
