import { API_BASE } from '@env';
import axios, { AxiosInstance } from 'axios';
import humps from 'humps';
import {
  StaticAuth
} from '../../components/AuthProvider/AuthProvider';
import { AuthStore } from '../../stores/AuthStore';

type CancelFN = () => void;

export type RequestState<Data> =
  | SuccessState<Data>
  | ErrorState
  | LoadingState
  | DefaultState;

export enum StateType {
  Success = 'Success',
  Error = 'Error',
  Loading = 'Loading',
  Default = 'Default',
}

export interface SuccessState<Data> {
  type: StateType.Success;
  readonly data: Data;
  isSuccess: true;
  isLoading: false;
  isErrored: false;
  isDefault: false;
}

export interface ErrorState {
  type: StateType.Error;
  readonly error: string;
  isSuccess: false;
  isLoading: false;
  isErrored: true;
  isDefault: false;
}

export interface LoadingState {
  type: StateType.Loading;
  isSuccess: false;
  isLoading: true;
  isErrored: false;
  isDefault: false;
}

export interface DefaultState {
  type: StateType.Default;
  isSuccess: false;
  isLoading: false;
  isErrored: false;
  isDefault: true;
}

export function NewSuccessState<Data>(data: Data): SuccessState<Data> {
  return {
    type: StateType.Success,
    data: data,
    isSuccess: true,
    isLoading: false,
    isErrored: false,
    isDefault: false,
  };
}

export function NewErrorState(error: any | undefined): ErrorState {
  return {
    type: StateType.Error,
    error: error,
    isSuccess: false,
    isLoading: false,
    isErrored: true,
    isDefault: false,
  };
}

export function NewLoadingState(): LoadingState {
  return {
    type: StateType.Loading,
    isSuccess: false,
    isLoading: true,
    isErrored: false,
    isDefault: false,
  };
}

export function NewDefaultState(): DefaultState {
  return {
    type: StateType.Default,
    isSuccess: false,
    isLoading: false,
    isErrored: false,
    isDefault: true,
  };
}

export class RequestAbortController {
  private onCancel: CancelFN | undefined | null;
  private cancelled = false;

  setOnCancel(cancelFn: CancelFN | null) {
    this.onCancel = cancelFn;
  }

  isCancelled() {
    return this.cancelled;
  }

  cancel() {
    this.cancelled = true;
    this.onCancel?.();
  }
}

export abstract class ApiService {
  protected static _axios?: AxiosInstance;

  protected get axios(): AxiosInstance {
    return ApiService.shared;
  }

  static get shared(): AxiosInstance {
    if (!this._axios) {
      this._axios = axios.create({
        baseURL: API_BASE,
      });

      this._axios.interceptors.response.use(
        (resp) => {
          resp.data = humps.camelizeKeys(resp.data);
          return resp;
        },
        (error) => {
          if (error.response.status === 401 && StaticAuth.isLoggedIn) {
            StaticAuth.logout();
          } else {
            return Promise.reject(error);
          }
        }
      );

      this._axios.interceptors.request.use((req) => {
        req.data = humps.decamelizeKeys(req.data);
        return req;
      });

      this._axios.interceptors.request.use(async (req) => {
        const store = AuthStore.shared();
        const data = await store.getAuthData();

        req.headers['client'] = data.client;
        req.headers['access-token'] = data.accessToken;
        req.headers['uid'] = data.uid;

        return req;
      });
    }
    return this._axios!;
  }
}
