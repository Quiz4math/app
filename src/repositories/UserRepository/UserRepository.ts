import { Observable } from 'rxjs';
import { RequestState } from '../../services/API/ApiService';
import {
  IAuthService,
  LoginResult, RegisterResult, UserRegisterParams
} from '../../services/IAuthService';
import { AuthData, IAuthStore } from '../../stores/IAuthStore';
import { ServiceExecutor } from '../ServiceExecutor';
import { IUserRepository } from './IUserRepository';

export class UserRepository implements IUserRepository {
  constructor(
    private authService: IAuthService,
    private store: IAuthStore,
    private executor: ServiceExecutor
  ) {}

  async isLoggedIn(): Promise<boolean> {
    const data = await this.store.getAuthData();
    const expiryDate = new Date(Number(data.expiry) * 1000);
    if (data.expiry && expiryDate.getTime() < Date.now()) {
      this.store.clear();
      return false;
    }
    return Boolean(data.accessToken);
  }

  async login(email: string, password: string): Promise<AuthData> {
    const loginResult = await this.authService.login(email, password);
    await this.store.setFromLoginResult(loginResult);

    return await this.getAuthData();
  }

  register(
    params: UserRegisterParams
  ): Observable<RequestState<RegisterResult>> {
    return this.executor.performRequest(async () =>{
      const data = await this.authService.register(params)
      await this.store.setFromLoginResult(data);
      return data;
    });
  }

  resendEmailConfirmation(email: string): Observable<RequestState<void>> {
    return this.executor.performRequest(() =>
      this.authService.resendEmailConfirmation(email)
    );
  }

  resetPassword(email: string): Observable<RequestState<void>> {
    return this.executor.performRequest(() =>
      this.authService.resetPassword(email)
    );
  }

  getAuthData(): Promise<AuthData> {
    return this.store.getAuthData();
  }

  logout() {
    this.authService.logout();
  }
}
