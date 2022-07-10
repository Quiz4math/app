import { CachedSecureStore } from './CachedSecuredStore';
import { ILocalStorage, UserPreferences } from './ILocalStorage';

enum Key {
  USER_PREFERENCES = 'user_preferences',
  FIRST_LAUNCH = 'first_launch',
}

export class LocalStorage implements ILocalStorage {
  private store: CachedSecureStore = new CachedSecureStore();

  async getUserPreferences(): Promise<UserPreferences | null> {
    const serializedPreferences = await this.store.getItemAsync(
      Key.USER_PREFERENCES
    );

    if (serializedPreferences) {
      return JSON.parse(serializedPreferences);
    }

    return null;
  }

  setUserPreferences(preferences: UserPreferences): void {
    const serializedPrerences = JSON.stringify(preferences);

    this.store.setItemAsync(Key.USER_PREFERENCES, serializedPrerences);
  }

  async isFirstLaunch(): Promise<boolean> {
    const value = await this.store.getItemAsync(Key.FIRST_LAUNCH);

    return Boolean(value);
  }

  setFirstLaunch(): void {
    this.store.setItemAsync(Key.FIRST_LAUNCH, 'true');
  }
}
