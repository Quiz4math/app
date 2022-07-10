import { Observable } from "rxjs";
import { RequestState } from "../../services/API/ApiService";
import {
  RegisterResult,
  UserRegisterParams
} from "../../services/IAuthService";
import { AuthData } from "../../stores/IAuthStore";

export interface IUserRepository {
	isLoggedIn(): Promise<boolean>;
	login(email: string, password: string): Promise<AuthData>;
	register(
		params: UserRegisterParams
	): Observable<RequestState<RegisterResult>>;
	logout(): void;
	resendEmailConfirmation(email: string): Observable<RequestState<void>>;
	resetPassword(email: string): Observable<RequestState<void>>;
	getAuthData(): Promise<AuthData>;
}
