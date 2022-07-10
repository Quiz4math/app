import React, { ReactNode, useContext } from 'react';
import {
  Platform,
  StatusBar, StyleProp,
  StyleSheet, View,
  ViewStyle
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimens } from '../../constants/Dimens';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';

interface Props {
  style?: StyleProp<ViewStyle>;
  outerViewStyle?: StyleProp<ViewStyle>;
  children?: ReactNode;
  onlyTop?: boolean;
}

const screenAvoidingView: React.FunctionComponent<Props> = (props) => {
  const theme = useContext(ThemeContext).themeStyle.theme;
  const insets = useSafeAreaInsets();

  if (Platform.OS == 'ios') {
    return (
      <View
        style={[
          {
            flex: 1,
            backgroundColor: theme.colors.backgroundColor,
            paddingTop: insets.top,
            paddingBottom: props.onlyTop ? 0 : insets.bottom,
          },
          ,
          props.outerViewStyle,
        ]}
      >
        <View
          style={[
            styles.screenView,
            { backgroundColor: theme.colors.backgroundColor },
            props.style,
          ]}
        >
          {props.children}
        </View>
      </View>
    );
  }

  const paddingTop: ViewStyle = {
    paddingTop: StatusBar.currentHeight ?? 0,
  };

  return (
    <View
      style={[
        styles.screenView,
        { backgroundColor: theme.colors.backgroundColor },
        paddingTop,
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
};

export const ScreenAvoidingView = React.memo(screenAvoidingView);

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
});
