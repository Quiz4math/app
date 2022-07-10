import React, { PropsWithChildren } from 'react';
import {
  TextStyle,
  StyleProp,
  Text as NativeText,
  Platform,
} from 'react-native';
import { material, iOSUIKit } from 'react-native-typography';

interface Props {
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

export interface TextProps extends PropsWithChildren<Props> {}

const fontFamily: string = Platform.OS == 'ios' ? 'System' : 'Roboto';
export const PlainTextStyle: StyleProp<TextStyle> =
  Platform.OS == 'ios' ? iOSUIKit.body : material.body1;

const text: React.FunctionComponent<TextProps> = (props) => {
  const { style, ...rest } = props;
  return (
    <NativeText
      style={[PlainTextStyle, { fontFamily: fontFamily }, props.style]}
      {...rest}
    />
  );
};

export const Text = React.memo(text);
