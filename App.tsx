import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './Navigation';
import { AuthProvider } from './src/components/AuthProvider/AuthProvider';
import { ThemeProvider } from './src/components/ThemeProvider/ThemeProvider';
import { UserPreferencesProvider } from './src/components/UserPreferencesProvider/UserPreferencesProvider';

export default function App() {
  return (
    <ThemeProvider>
      <UserPreferencesProvider>
        <AuthProvider>
          <SafeAreaProvider>
            <Navigation />
          </SafeAreaProvider>
        </AuthProvider>
      </UserPreferencesProvider>
    </ThemeProvider>
  );
}
