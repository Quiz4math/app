import React from 'react';
import { Text } from './Text';
import { TextStyle, StyleProp, Platform } from 'react-native';
import { iOSUIKit, material } from 'react-native-typography';

interface Props {
  style?: StyleProp<TextStyle>;
  children?: string;
}

const textStyle: StyleProp<TextStyle> =
  Platform.OS == 'ios' ? iOSUIKit.bodyEmphasized : material.body2;

const textEmphasized: React.FunctionComponent<Props> = (props) => {
  return <Text style={[textStyle, props.style]}>{props.children}</Text>;
};

export const TextEmphasized = React.memo(textEmphasized);
