import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import { TextButton, ButtonProps } from './TextButton';

const button: React.FunctionComponent<ButtonProps> = (props) => {
  const colors = useContext(ThemeContext).themeStyle.theme.colors.components
    .button;
  const { style, textStyle, ...rest } = props;
  return (
    <TextButton
      style={[
        {
          backgroundColor: colors.background,
        },
        styles.button,
        style,
      ]}
      textStyle={[{ color: colors.text }, textStyle]}
      {...rest}
    />
  );
};

export const Button = React.memo(button);

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
  },
});
