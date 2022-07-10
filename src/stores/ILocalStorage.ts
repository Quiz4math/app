import { ThemeKey } from '../constants/Theme';

export interface ILocalStorage {
  getUserPreferences(): Promise<UserPreferences | null>;
  setUserPreferences(preferences: UserPreferences): void;
  isFirstLaunch(): Promise<boolean>;
  setFirstLaunch(): void;
}

export interface UserPreferences {
  activeTheme?: ThemeKey;
  vibrateOnIncorrect?: boolean;
}
