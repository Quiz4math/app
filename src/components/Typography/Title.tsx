import React, { PropsWithChildren } from 'react';
import { TextStyle, StyleProp, Platform } from 'react-native';
import { material } from 'react-native-typography';
import { Text } from './Text';
import { iOSUIKit } from 'react-native-typography';

interface Props {
  style?: StyleProp<TextStyle>;
}

const textStyle: StyleProp<TextStyle> =
  Platform.OS == 'ios' ? iOSUIKit.title3Emphasized : material.title;

const title: React.FunctionComponent<PropsWithChildren<Props>> = (props) => {
  return (
    <Text style={[textStyle, { fontSize: 24 }, props.style]}>
      {props.children}
    </Text>
  );
};

export const Title = React.memo(title);
