import React, { useState } from 'react';
import { Text, TextProps } from './Text';
import { TextStyle, StyleProp, Platform } from 'react-native';
import { material } from 'react-native-typography';
import { iOSUIKit } from 'react-native-typography';

const textStyle: StyleProp<TextStyle> =
  Platform.OS == 'ios' ? iOSUIKit.body : material.body1;

const paragraph: React.FunctionComponent<TextProps> = (props) => {
  const { style, ...rest } = props;
  return <Text style={[textStyle, style]} {...rest} />;
};

export const Paragraph = React.memo(paragraph);

interface SplittingProps extends TextProps {
  startingKey: number;
}
const splittingParagraph: React.FunctionComponent<SplittingProps> = (props) => {
  const { children, ...rest } = props;
  const text = props.children as string;
  const words = text.split(' ');
  const paragraphs = words.map((word, index) => (
    <Paragraph key={String(props.startingKey + index)} {...rest}>
      {word + ' '}
    </Paragraph>
  ));
  return <>{paragraphs}</>;
};

export const SplittingParagraph = React.memo(splittingParagraph);
