import {
  IAuthService,
  LoginResult, RegisterResult, UserRegisterParams
} from '../IAuthService';
import { ApiService } from './ApiService';

const ConfirmURL = 'https://beta.quiz4math.gr/auth/login';
const ResetPasswordRedirectURL = 'https://beta.quiz4math.gr/auth/new-password';

export class ApiAuthService extends ApiService implements IAuthService {
  async login(email: string, password: string): Promise<LoginResult> {
    const resp = await this.axios.post('/auth/sign_in', {
      email: email,
      password: password,
    });

    return {
      client: resp.headers['client'],
      uid: resp.headers['uid'],
      accessToken: resp.headers['access-token'],
      expiry: resp.headers['expiry'],
      ...resp.data.user,
    };
  }

  async register(params: UserRegisterParams): Promise<RegisterResult> {
    const resp = await this.axios.post<RegisterResult>('/auth', {
      ...params,
      confirmSuccessUrl: "https://beta.quiz4math.gr/auth/login"
    });
    return {
      client: resp.headers['client'],
      uid: resp.headers['uid'],
      accessToken: resp.headers['access-token'],
      expiry: resp.headers['expiry'],
      ...resp.data.user,
    };
  }

  async resendEmailConfirmation(email: string): Promise<void> {
    await this.axios.post('/auth/confirmation', {
      email,
      redirectUrl: ConfirmURL,
    });
  }

  async resetPassword(email: string): Promise<void> {
    await this.axios.post('/auth/password', {
      email,
      redirectUrl: ResetPasswordRedirectURL,
    });
  }

  logout(): void {
    this.axios.delete('/auth/');
  }
}
