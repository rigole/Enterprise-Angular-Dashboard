export interface User {
  id: string | null;
  email: string;
  role: string;
  created_at: Date;
}

export interface UserInput {
  email: string;
  password: string;
}