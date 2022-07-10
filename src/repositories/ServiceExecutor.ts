import {
  Observable, ReplaySubject, Subject, Subscriber,
  Subscription
} from 'rxjs';
import {
  NewErrorState, NewLoadingState,
  NewSuccessState, RequestState, StateType
} from '../services/API/ApiService';

export interface ServiceExecutor {
  performRequest<Result>(
    fn: () => Promise<Result>
  ): Observable<RequestState<Result>>;

  performRequestWithObservable<Result>(
    observable: MutableObservable<RequestState<Result>>,
    fn: () => Promise<Result>
  ): Promise<void>;
}

export interface LiveObservable<T> {
  readonly value: T | undefined;
  subscribe(next?: (value: T) => void): Subscription;
}

export class MutableObservable<T> implements LiveObservable<T> {
  private subject: Subject<T>;
  private lastValue: T | undefined;

  constructor() {
    this.subject = new ReplaySubject(1);
  }

  get observable(): Observable<T> {
    return this.subject;
  }

  subscribe(next?: (value: T) => void): Subscription {
    return this.subject.subscribe(next);
  }

  get value(): T | undefined {
    return this.lastValue;
  }

  set value(newValue: T | undefined) {
    this.lastValue = newValue;
    this.subject.next(newValue);
  }

  complete() {
    this.subject?.complete();
  }
}

export class ServiceExecutorImpl implements ServiceExecutor {
  performRequest<Result>(
    fn: () => Promise<Result>
  ): Observable<RequestState<Result>> {
    const observable = new MutableObservable<RequestState<Result>>();

    this.performRequestWithObservable(observable, fn);

    return observable.observable;
  }

  performRequestCached<Result>(
    observable: MutableObservable<RequestState<Result>>,
    fn: () => Promise<Result>
  ) {
    if (!observable.value || observable.value.type == StateType.Error) {
      this.performRequestWithObservable(observable, fn);
    }
  }

  async performRequestWithObservable<Result>(
    observable: MutableObservable<RequestState<Result>>,
    fn: () => Promise<Result>
  ): Promise<void> {
    observable.value = NewLoadingState();

    try {
      const res = await fn();
      observable.value = NewSuccessState(res);
    } catch (err) {
      observable.value = NewErrorState(err);
    }
  }
}
