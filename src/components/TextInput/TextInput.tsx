import React, { useContext } from 'react';
import {
  TextInput as NativeTextInput,
  TextInputProps,
  View,
  TextStyle,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Text } from '../Typography/Text';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import { Spaces } from '../../constants/Spaces';
import { Dimens } from '../../constants/Dimens';
import { material } from 'react-native-typography';
import { Caption } from '../Typography/Caption';

interface Props extends TextInputProps {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  error?: string;
}

const textInput: React.FunctionComponent<Props> = (props) => {
  const theme = useContext(ThemeContext).themeStyle.theme;
  const colors = theme.colors.components.textInput;

  let errorElement: JSX.Element | undefined;
  let borderStyle = {};

  if (props.error) {
    errorElement = (
      <Caption style={[styles.caption, { color: theme.colors.errorColor }]}>
        {props.error}
      </Caption>
    );
    borderStyle = { borderColor: theme.colors.errorColor };
  }

  const { style, ...rest } = props;
  return (
    <View style={[props.viewStyle]}>
      {props.label && (
        <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
      )}
      <NativeTextInput
        placeholderTextColor={colors.placeholder}
        style={[
          material.button,
          {
            backgroundColor: colors.background,
            padding: Spaces.textInputPadding,
            fontSize: Dimens.fonts.textInput,
            color: colors.text,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: theme.borderRadius,
          },
          borderStyle,
          style,
        ]}
        selectionColor={colors.tint}
        {...rest}
      ></NativeTextInput>
      {errorElement}
    </View>
  );
};

export const TextInput = React.memo(textInput);

const styles = StyleSheet.create({
  label: {
    marginBottom: Spaces.small,
  },
  caption: {
    marginHorizontal: Dimens.spaces.small,
    marginTop: Dimens.spaces.small,
  },
});
