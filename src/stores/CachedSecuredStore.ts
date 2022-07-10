import * as SecureStore from 'expo-secure-store';

export class CachedSecureStore {
  private cache = new Map<string, string | null>();

  async getItemAsync(key: string): Promise<string | null> {
    let cached = this.cache.get(key);

    if (cached === undefined) {
      cached = await SecureStore.getItemAsync(key);
      this.cache.set(key, cached);
    }

    return cached;
  }

  async setItemAsync(key: string, value: string | null): Promise<void> {
    if (!value) {
      return;
    }
    await SecureStore.setItemAsync(key, value);
    this.cache.set(key, value.toString());
  }

  async deleteItemAsync(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
    this.cache.set(key, null);
  }
}
