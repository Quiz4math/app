import React, { createContext, useState, useCallback, useContext } from 'react';
import { UserPreferences } from '../../stores/ILocalStorage';
import { EngineContext } from '../EngineProvider/EngineProvider';

export interface UserPreferencesAccessor {
  readonly userPreferences: UserPreferences;
  update(preferences: UserPreferences): void;
  init(preferences: UserPreferences): void;
}

export const UserPreferencesContext = createContext<UserPreferencesAccessor>({
  userPreferences: {},
  update: (preferences: UserPreferences) => {},
  init: (preferences: UserPreferences) => {},
});

export const UserPreferencesProvider: React.FunctionComponent = (props) => {
  const [userPreferences, setUserPreferences] = useState({});
  const engine = useContext(EngineContext);

  const update = useCallback((preferences: UserPreferences) => {
    setUserPreferences(preferences);
    engine.localStorage.setUserPreferences(preferences);
  }, []);

  const init = useCallback((preferences: UserPreferences) => {
    setUserPreferences(preferences);
  }, []);

  return (
    <UserPreferencesContext.Provider
      value={{ userPreferences: userPreferences, update, init }}
    >
      {props.children}
    </UserPreferencesContext.Provider>
  );
};
