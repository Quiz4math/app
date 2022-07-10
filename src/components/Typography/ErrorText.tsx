import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { useThemeStyle } from '../ThemeProvider/ThemeProvider';
import { Caption } from './Caption';

interface Props {
  style?: StyleProp<TextStyle>;
  children?: string;
}

const errorText: React.FunctionComponent<Props> = (props) => {
  const themeStyle = useThemeStyle();

  if (!props.children) {
    return null;
  }

  return (
    <Caption
      style={[{ color: themeStyle.theme.colors.errorColor }, props.style]}
    >
      {props.children}
    </Caption>
  );
};

export const ErrorText = React.memo(errorText);
