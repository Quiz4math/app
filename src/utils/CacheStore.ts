export enum Time {
  Millisecond = 1,
  Second = 1000 * Millisecond,
  Minute = 60 * Second,
  Hour = 60 * Minute,
}

export interface CacheStore {
  set(key: any, value: any, expireIn: number): void;
  get<T>(key: any): T | undefined;
}

class CachedValue {
  constructor(public value: any, public expiresAt: number) {}

  get isExpired(): boolean {
    return Date.now() >= this.expiresAt;
  }

  static whichExpires(value: any, expiresIn: number): CachedValue {
    return new CachedValue(value, Date.now() + expiresIn);
  }
}

export class MemoryCacheStore implements CacheStore {
  private cache = new Map<any, CachedValue>();

  set(key: any, value: any, expireIn: number): void {
    this.cache.set(key, CachedValue.whichExpires(value, expireIn));
  }

  get<T>(key: any): T | undefined {
    const cachedValue = this.cache.get(key);

    return cachedValue?.value as T;
  }
}
