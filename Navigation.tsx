import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  AuthContext,
  AuthState
} from './src/components/AuthProvider/AuthProvider';
import { EngineContext } from './src/components/EngineProvider/EngineProvider';
import {
  ThemeAccessor, ThemeContext, useThemeStyle
} from './src/components/ThemeProvider/ThemeProvider';
import {
  UserPreferencesAccessor,
  UserPreferencesContext
} from './src/components/UserPreferencesProvider/UserPreferencesProvider';
import { Strings } from './src/constants/Strings';
import {
  DarkThemeStyle, ThemeKey, WhiteThemeStyle
} from './src/constants/Theme';
import { Engine } from './src/engine';
import { IUserRepository } from './src/repositories/UserRepository/IUserRepository';
import { ChangeCurriculmScreen } from './src/screens/ChangeCurriculumScreen';
import { ChangeNameScreen } from './src/screens/ChangeNameScreen';
import { ChangePasswordScreen } from './src/screens/ChangePasswordScreen';
import { CourseDetailsScreen } from './src/screens/CourseDetailsScreen/CourseDetailsScreen';
import { CoursesScreen } from './src/screens/CoursesScreen';
import { DeleteAccountScreen } from './src/screens/DeleteAccountScreen';
import { DocumentViewerScreen } from './src/screens/DocumentViewerScreen';
import { ErrorScreen } from './src/screens/ErrorScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { LearnUniversitiesScreen } from './src/screens/LearnUniversitiesScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { OldExamsScreen } from './src/screens/OldExamsScreen';
import { QuizSessionReviewScreen } from './src/screens/QuizSessionReviewScreen';
import { QuizSessionScreen } from './src/screens/QuizSessionScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { RegisterSuccessfullScreen } from './src/screens/RegisterSuccesfullScreen';
import { ResetPasswordScreen } from './src/screens/ResetPasswordScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { StatisticsScreen } from './src/screens/StatisticsScreen';
import { SummaryScreen } from './src/screens/SummaryScreen';
import { ILocalStorage } from './src/stores/ILocalStorage';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const StackHome = createStackNavigator();

function HomeTabs() {
  const themeStyle = useContext(ThemeContext).themeStyle;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveBackgroundColor: themeStyle.theme.colors.components.bottomNavigation.background,
        tabBarActiveBackgroundColor: themeStyle.theme.colors.components.bottomNavigation.background,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: Strings.homeScreen.title,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          tabBarLabel: Strings.statisticsScreen.title,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="bar-graph" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Courses"
        component={CoursesScreen}
        options={{
          tabBarLabel: 'Διάλεξε Ύλη',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="open-book" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

async function checkIsLoggedIn(
  userRepo: IUserRepository,
  authState: AuthState
) {
  const isLoggedIn = await userRepo.isLoggedIn();

  if (isLoggedIn) {
    authState.loggedIn();
  } else {
    authState.loggedOut();
  }
}

async function setUserPreferences(
  storage: ILocalStorage,
  themeAccessor: ThemeAccessor,
  preferencesAccesor: UserPreferencesAccessor
) {
  const preferences = await storage.getUserPreferences();

  preferencesAccesor.init(preferences ?? {});

  if (preferences?.activeTheme === ThemeKey.DARK) {
    themeAccessor.setThemeStyle(DarkThemeStyle);
  } else {
    themeAccessor.setThemeStyle(WhiteThemeStyle);
  }
}

function initializeApp(
  engine: Engine,
  authState: AuthState,
  themeAccessor: ThemeAccessor,
  preferencesAccesor: UserPreferencesAccessor
): () => Promise<void> {
  return async function (): Promise<void> {
    await checkIsLoggedIn(engine.userRepository, authState);
    await setUserPreferences(
      engine.localStorage,
      themeAccessor,
      preferencesAccesor
    );
  };
}

function createNavigation(
  isLoggedIn: boolean | undefined,
  isReady: boolean,
  setIsReady: (value: boolean) => void,
  authState: AuthState,
  engine: Engine,
  themeAccessor: ThemeAccessor,
  preferencesAccesor: UserPreferencesAccessor
): ReactNode {
  const themeStyle = themeAccessor.themeStyle;
  
  if (isLoggedIn) {
    return (
      <StackHome.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: themeStyle.theme.colors.surfaceColor,
          },
          headerTitleStyle: {
            color: themeStyle.theme.colors.textColorOnSurface,
          },
          headerTintColor: themeStyle.theme.colors.textColorOnSurface,
          cardStyle: {
            backgroundColor: themeStyle.theme.colors.backgroundColor,
          },
        }}
      >
        <StackHome.Screen
          name="Home"
          component={HomeTabs}
          options={{ title: Strings.homeScreen.title, headerShown: false }}
        />
        <StackHome.Screen
          name="Error"
          component={ErrorScreen}
          options={{
            title: 'Error',
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <StackHome.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: Strings.settingsScreen.title,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <StackHome.Screen
          name="QuizSession"
          component={QuizSessionScreen}
          options={{
            title: Strings.questionScreen.title,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <StackHome.Screen
          name="QuizSessionReviewScreen"
          component={QuizSessionReviewScreen}
          options={{
            title: Strings.quizSessionReviewScreen.title,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <StackHome.Screen
          name="CourseDetails"
          component={CourseDetailsScreen}
          options={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <StackHome.Screen
          name="OldExams"
          component={OldExamsScreen}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <StackHome.Screen
          name="DocumentViewer"
          component={DocumentViewerScreen}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <StackHome.Screen
          name="Summary"
          component={SummaryScreen}
          options={{
            title: 'Αποτελέσματα',
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
          <StackHome.Screen
          name="UniversityLearn"
          component={LearnUniversitiesScreen}
          options={{
            title: 'Τι θα σπουδάσω;',
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />

          <StackHome.Screen
          name="ChangeCurriculum"
          component={ChangeCurriculmScreen}
          options={{
            title: 'Αλλαγή πεδίου',
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />

          <StackHome.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{
            title: 'Αλλαγή κωδικού',
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />

        <StackHome.Screen
          name="ChangeName"
          component={ChangeNameScreen}
          options={{
            title: 'Αλλαγή ονόματος',
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />

        <StackHome.Screen
          name="DeleteAccount"
          component={DeleteAccountScreen}
          options={{
            title: 'Διαγραφή Λογαριασμού',
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
    
  </StackHome.Navigator>
    );
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: themeStyle.theme.colors.surfaceColor,
        },
        headerTitleStyle: {
          color: themeStyle.theme.colors.textColorOnSurface,
        },
        headerTintColor: themeStyle.theme.colors.textColorOnSurface,
        cardStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen
        name="AuthStackNavigator"
        component={AuthNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="RegisterSuccessfull"
        component={RegisterSuccessfullScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AuthNavigator() {
  const themeStyle = useThemeStyle();

  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: themeStyle.theme.colors.surfaceColor,
        },
        headerTitleStyle: {
          color: themeStyle.theme.colors.textColorOnSurface,
        },
        headerTintColor: themeStyle.theme.colors.textColorOnSurface,
        cardStyle: { backgroundColor: 'transparent' },
      }}
    >
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: Strings.loginScreen.title, headerShown: false }}
      />

      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: Strings.registerScreen.title }}
      />
      <AuthStack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ title: 'Επαναφορά κωδικού' }}
      />
    </AuthStack.Navigator>
  );
}

interface Props {
  children?: ReactNode;
}

const navigation: React.FunctionComponent<Props> = (props) => {
  const authState = useContext(AuthContext);
  const themeAccessor = useContext(ThemeContext);
  const preferencesAccessor = useContext(UserPreferencesContext);
  const engine = useContext(EngineContext);
  const userRepo = engine.userRepository;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }
  
  return (
    <NavigationContainer>
      <View
        style={{
          flex: 1,
          backgroundColor:
            themeAccessor.themeStyle.theme.colors.backgroundColor,
        }}
        onLayout={onLayoutRootView}
      >
        {createNavigation(
          authState.isLoggedIn,
          isReady,
          setIsReady,
          authState,
          engine,
          themeAccessor,
          preferencesAccessor
        )}
      </View>
    </NavigationContainer>
  );
};

export const Navigation = React.memo(navigation);
