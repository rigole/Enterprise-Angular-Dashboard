export interface Employee {
  id: string | null;
  email: string;
  role: string;
  created_at: Date;
  profession: string;
  phone_number: string;
  date_of_birth: Date;
  work_anniversary: Date;
  first_name: string;
  last_name: string;
}

export interface UserInput {
  email: string;
  password: string;
}