import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonProps, TextButton } from './TextButton';
import { Dimens } from '../../constants/Dimens';
import { useColors } from '../ThemeProvider/ThemeProvider';
import { Text, PlainTextStyle } from '../../components/Typography/Text';
import { Touchable } from '../Touchable/Touchable';

interface Props extends ButtonProps {
  rightView?: () => JSX.Element | undefined;
  leftView?: () => JSX.Element | undefined;
}

const chipButton: React.FunctionComponent<Props> = (props) => {
  const { style, ...rest } = props;
  const chipColors = useColors().components.chipButton;

  return (
    <TextButton
      style={[
        styles.ripple,
        {
          backgroundColor: chipColors.backgroundColor,
          borderColor: chipColors.borderColor,
        },
        style,
      ]}
      contentContainerStyle={styles.rippleContainer}
      textStyle={[
        PlainTextStyle,
        styles.textStyle,
        { color: chipColors.textColor },
      ]}
      loadingIndicatorColor={chipColors.loadingIndicatorColor}
      {...rest}
    />
  );
};

export const ChipButton = React.memo(chipButton);

const styles = StyleSheet.create({
  ripple: {
    display: 'flex',
    borderRadius: 24,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    borderWidth: 1,
    overflow: 'hidden',
  },
  rippleContainer: {
    padding: Dimens.spaces.small,
    paddingLeft: Dimens.spaces.sMedimum,
  },
  textStyle: {
    fontSize: 14,
    textAlign: 'left',
  },
});
