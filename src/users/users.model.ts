export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  status: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
