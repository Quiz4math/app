import React from 'react';
import { Text } from './Text';
import { TextStyle, StyleProp, Platform } from 'react-native';
import { material, iOSUIKit } from 'react-native-typography';

interface Props {
  style?: StyleProp<TextStyle>;
  children?: string;
}

const textStyle: StyleProp<TextStyle> =
  Platform.OS == 'ios' ? iOSUIKit.footnote : material.caption;

const caption: React.FunctionComponent<Props> = (props) => {
  return <Text style={[textStyle, props.style]}>{props.children}</Text>;
};

export const Caption = React.memo(caption);
