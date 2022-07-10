import { Observable } from 'rxjs';
import { number, string } from 'yup';
import { Curriculum } from '../models/Curriculum';
export interface LoginResult {
  uid: string;
  client: string;
  id: number;
  accessToken: string;
  expiry: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: string;
  curriculum: Curriculum;
}

export interface UserRegisterParams {
  firstName: string;
  curriculumId: number;
  email: string;
  password: string;
}

export interface UserRegister {
  id:number
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  curriculum: Curriculum;
}
export interface RegisterResult extends LoginResult {
  user: RegisterResult | PromiseLike<RegisterResult>;
}

export interface IAuthService {
  login(email: string, password: string): Promise<LoginResult>;
  register(params: UserRegisterParams): Promise<RegisterResult>;
  resendEmailConfirmation(email: string): Promise<void>;
  resetPassword(email: string): Promise<void>;
  logout(): void;
}
