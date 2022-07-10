import { Colors } from './Colors';
import { StatusBarStyle, ViewStyle, TextStyle } from 'react-native';
import { iOSColors } from 'react-native-typography';

export enum ThemeKey {
  WHITE = 'White theme',
  DARK = 'Dark Theme',
}

export interface Theme {
  readonly colors: Colors;
  readonly borderRadius: number;
  readonly statusBarColor: StatusBarStyle;
  readonly bottomNavigationBorderWidth: number;
}

export interface ThemeStyle {
  readonly styles: ThemedStyles;
  readonly theme: Theme;
}

export interface ThemedStyles {
  components: ComponentsThemedStyles;
  text: TextThemedStyles;
  borderRadius: ViewStyle;
  backgroundColor: ViewStyle;
  surfaceColor: ViewStyle;
}

export interface ComponentsThemedStyles {
  textInput: ViewStyle;
  button: ViewStyle;
  placeHolder: PlaceholderThemedStyles;
}

export interface PlaceholderThemedStyles {
  mediaBackground: ViewStyle;
  lineBackground: ViewStyle;
}

export interface TextThemedStyles {
  textOnBackground: TextStyle;
  textOnSurface: TextStyle;
  textOnPrimary: TextStyle;
  secondaryTextOnBackground: TextStyle;
  secondaryTextOnSurface: TextStyle;
}

export const WhiteTheme: Theme = {
  colors: {
    backgroundColor: '#f6fafb',
    surfaceColor: '#ffffff',
    textColorOnBackground: '#000000',
    textColorOnSurface: '#000000',
    primaryColor: '#6361f3',
    secondaryColor: '#f8b3b8',
    textColorOnPrimary: '#ffffff',
    textColorOnSecondary: '#000000',
    secondaryTextColorOnBackground: iOSColors.gray,
    secondaryTextColorOnSurface: iOSColors.gray,
    errorColor: iOSColors.red,
    defaultIconColor: 'black',
    linkColor: '#6361f3',
    components: {
      textInput: {
        background: '#ffffff',
        placeholder: iOSColors.gray,
        text: 'black',
        border: 'black',
        tint: 'black',
      },
      button: {
        background: '#6361f3',
        text: '#ffffff',
        activityIndicator: 'white',
        textButtonText: '#000000',
        ripple: 'black',
      },
      bottomNavigation: {
        background: 'white',
        activeTab: 'black',
        inactiveTab: 'black',
      },
      questionAnswers: {
        normal: '#ffffff',
        selected: iOSColors.lightGray,
        correct: iOSColors.green,
        incorrect: iOSColors.pink,
      },
      lineChart: {
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      },
      correctnessByCourse: {
        correctColor: '#7CB342',
        incorrectColor: iOSColors.red,
        legendColor: '#7F7F7F',
      },
      pagination: {
        activeDot: iOSColors.gray,
        innactiveDot: iOSColors.lightGray,
      },
      placeholder: {
        mediaBackground: iOSColors.customGray,
        lineBackground: iOSColors.customGray,
      },
      chipButton: {
        borderColor: 'transparent',
        backgroundColor: iOSColors.customGray,
        textColor: 'black',
        loadingIndicatorColor: 'black',
      },
      secondaryButton: {
        backgroundColor: iOSColors.lightGray,
        textColor: 'black',
        loadingIndicatorColor: 'black',
      },
    },
  },
  borderRadius: 8,
  bottomNavigationBorderWidth: 1,
  statusBarColor: 'dark-content',
};

export const DarkTheme: Theme = {
  colors: {
    backgroundColor: '#242529',
    surfaceColor: '#47474A',
    textColorOnBackground: '#ffffff',
    textColorOnSurface: '#ffffff',
    primaryColor: '#6361f3',
    secondaryColor: '#f8b3b8',
    textColorOnPrimary: '#ffffff',
    textColorOnSecondary: '#000000',
    secondaryTextColorOnBackground: iOSColors.lightGray2,
    secondaryTextColorOnSurface: iOSColors.lightGray,
    errorColor: 'red',
    defaultIconColor: 'white',
    linkColor: '#6361f3',
    components: {
      textInput: {
        background: '#47474A',
        placeholder: iOSColors.gray,
        text: 'white',
        border: 'white',
        tint: 'white',
      },
      button: {
        background: '#6361f3',
        text: '#ffffff',
        activityIndicator: 'white',
        textButtonText: '#FFFFFF',
        ripple: 'white',
      },
      bottomNavigation: {
        background: '#47474A',
        activeTab: '',
        inactiveTab: 'black',
      },
      questionAnswers: {
        normal: '#47474A',
        selected: iOSColors.gray,
        correct: iOSColors.green,
        incorrect: iOSColors.pink,
      },
      lineChart: {
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      },
      correctnessByCourse: {
        correctColor: '#7CB342',
        incorrectColor: iOSColors.red,
        legendColor: '#7F7F7F',
      },
      pagination: {
        activeDot: iOSColors.lightGray2,
        innactiveDot: iOSColors.gray,
      },
      placeholder: {
        mediaBackground: iOSColors.gray,
        lineBackground: iOSColors.gray,
      },
      chipButton: {
        borderColor: 'transparent',
        backgroundColor: iOSColors.gray,
        textColor: 'white',
        loadingIndicatorColor: 'white',
      },
      secondaryButton: {
        backgroundColor: iOSColors.gray,
        textColor: 'white',
        loadingIndicatorColor: 'white',
      },
    },
  },
  borderRadius: 8,
  bottomNavigationBorderWidth: 0,
  statusBarColor: 'light-content',
};

export const WhiteThemeStyle = makeThemeStyle(WhiteTheme);
export const DarkThemeStyle = makeThemeStyle(DarkTheme);

function makeThemeStyle(theme: Theme): ThemeStyle {
  return {
    styles: {
      components: {
        textInput: {
          backgroundColor: theme.colors.backgroundColor,
        },
        button: {
          backgroundColor: theme.colors.primaryColor,
        },
        placeHolder: {
          lineBackground: {
            backgroundColor: theme.colors.components.placeholder.lineBackground,
          },
          mediaBackground: {
            backgroundColor:
              theme.colors.components.placeholder.mediaBackground,
          },
        },
      },
      text: {
        secondaryTextOnBackground: {
          color: theme.colors.secondaryTextColorOnBackground,
        },
        secondaryTextOnSurface: {
          color: theme.colors.secondaryTextColorOnSurface,
        },
        textOnBackground: { color: theme.colors.textColorOnBackground },
        textOnSurface: { color: theme.colors.textColorOnSurface },
        textOnPrimary: { color: theme.colors.textColorOnPrimary },
      },
      borderRadius: { borderRadius: theme.borderRadius },
      backgroundColor: { backgroundColor: theme.colors.backgroundColor },
      surfaceColor: { backgroundColor: theme.colors.surfaceColor },
    },
    theme: theme,
  };
}
