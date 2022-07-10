import React, { useState } from 'react';
import { createContext, useCallback, useEffect, useContext } from 'react';
import { StatusBar } from 'react-native';
import { EngineContext } from '../EngineProvider/EngineProvider';
import {
  ThemeStyle,
  DarkThemeStyle,
  WhiteThemeStyle,
  ThemedStyles,
  TextThemedStyles,
} from '../../constants/Theme';
import { Colors } from '../../constants/Colors';

export interface ThemeAccessor {
  readonly themeStyle: ThemeStyle;
  setThemeStyle(theme: ThemeStyle): void;
}

export const ThemeContext = createContext<ThemeAccessor>({
  themeStyle: DarkThemeStyle,
  setThemeStyle: (theme: ThemeStyle) => {},
});

export function useColors(): Colors {
  return useContext(ThemeContext).themeStyle.theme.colors;
}

export function useStyles(): ThemedStyles {
  return useContext(ThemeContext).themeStyle.styles;
}

export function useThemeStyle(): ThemeStyle {
  return useContext(ThemeContext).themeStyle;
}

export function useTextStyles(): TextThemedStyles {
  return useContext(ThemeContext).themeStyle.styles.text;
}

export const ThemeProvider: React.FunctionComponent = (props) => {
  const [theme, setTheme] = useState(WhiteThemeStyle);

  const setThemeStyle = useCallback((theme: ThemeStyle) => {
    setTheme(theme);
    StatusBar.setBarStyle(theme.theme.statusBarColor);
  }, []);

  useEffect(() => {
    StatusBar.setBarStyle(theme.theme.statusBarColor), [theme];
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ themeStyle: theme, setThemeStyle }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
