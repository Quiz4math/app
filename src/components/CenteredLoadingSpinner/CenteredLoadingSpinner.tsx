import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useColors } from '../ThemeProvider/ThemeProvider';

const centeredLoadingSpinner: React.FunctionComponent = () => {
  const colors = useColors();
  return (
    <View style={[styles.container, StyleSheet.absoluteFill]}>
      <ActivityIndicator size="large" color={colors.defaultIconColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export const CenteredLoadingSpinner = React.memo(centeredLoadingSpinner);
