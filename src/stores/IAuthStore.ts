import { LoginResult } from '../services/IAuthService';

export interface AuthData {
  uid: string | null;
  client: string | null;
  accessToken: string | null;
  expiry: string | null;
  email: string | null;
  role: string | null;
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  curriculumId: string | null;
  curriculumName: string | null ;
}

export interface IAuthStore {
  getAuthData(): Promise<AuthData>;
  setFromLoginResult(loginResult: LoginResult): Promise<void>;
  clear(): void;
}
