import React from 'react';
import { StyleSheet } from 'react-native';
import { ButtonProps, TextButton } from './TextButton';
import { useColors } from '../ThemeProvider/ThemeProvider';

const linkButton: React.FunctionComponent<ButtonProps> = (props) => {
  const { textStyle, ...rest } = props;
  const colors = useColors();
  return (
    <TextButton
      {...rest}
      textStyle={[{ color: colors.linkColor }, textStyle]}
    />
  );
};

const styles = StyleSheet.create({});

export const LinkButton = React.memo(linkButton);
