import { ButtonProps } from './TextButton';
import React from 'react';
import { useColors } from '../ThemeProvider/ThemeProvider';
import { Button } from './Button';

const secondaryButton: React.FunctionComponent<ButtonProps> = (props) => {
  const colors = useColors().components.secondaryButton;
  const { style, textStyle, ...rest } = props;

  return (
    <Button
      style={[{ backgroundColor: colors.backgroundColor }, style]}
      textStyle={[{ color: colors.textColor }, textStyle]}
      loadingIndicatorColor={colors.loadingIndicatorColor}
      {...rest}
    />
  );
};

export const SecondaryButton = React.memo(secondaryButton);
