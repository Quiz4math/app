import React from 'react';
import { TextStyle, StyleProp, Platform } from 'react-native';
import { material, iOSUIKit } from 'react-native-typography';
import { Text } from './Text';

interface Props {
  style?: StyleProp<TextStyle>;
  children?: string;
}

const textStyle: StyleProp<TextStyle> =
  Platform.OS == 'ios' ? iOSUIKit.subhead : material.subheading;

const subheading: React.FunctionComponent<Props> = (props) => {
  return <Text style={[textStyle, props.style]}>{props.children}</Text>;
};

export const Subheading = React.memo(subheading);
