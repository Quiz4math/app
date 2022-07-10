import React from 'react';
import { Text } from './Text';
import { TextStyle, StyleProp, Platform } from 'react-native';
import { material } from 'react-native-typography';
import { iOSUIKit } from 'react-native-typography';

interface Props {
  style?: StyleProp<TextStyle>;
  children?: string;
}

const textStyle: StyleProp<TextStyle> =
  Platform.OS == 'ios' ? iOSUIKit.largeTitleEmphasized : material.display1;

const headline: React.FunctionComponent<Props> = (props) => {
  return <Text style={[textStyle, props.style]}>{props.children}</Text>;
};

export const Headline = React.memo(headline);
