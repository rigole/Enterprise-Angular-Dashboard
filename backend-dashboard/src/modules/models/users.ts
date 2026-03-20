export interface Employee {
   [x: string]: any;
  id: string | null;
  email: string;
  role: string;
  createdAt: Date;
  profession: string;
  phone: string;
  dateOfBirth: Date;
  hiringDate: Date;
  firstName: string;
  lastName: string;
}

export interface UserInput {
  email: string;
  password: string;
}