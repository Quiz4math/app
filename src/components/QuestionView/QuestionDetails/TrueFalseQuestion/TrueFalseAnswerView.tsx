import React, { useContext } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Dimens } from '../../../../constants/Dimens';
import { Card } from '../../../Card/Card';
import { ThemeContext } from '../../../ThemeProvider/ThemeProvider';
import { Text } from '../../../Typography/Text';
import { AnswerStyles } from '../shared/AnswerStyles';

interface Props {
  text: string;
  style?: StyleProp<ViewStyle>;
  isCorrect?: boolean;
  isSelected?: boolean;
  value: boolean;
  onPress?: (value: boolean) => void;
}

const trueFalseAnswerView: React.FunctionComponent<Props> = (props) => {
  const themeStyle = useContext(ThemeContext).themeStyle;
  const componentColors = themeStyle.theme.colors.components.questionAnswers;

  const selectedStyle = props.isSelected
    ? { backgroundColor: componentColors.selected }
    : {};

  let statusStyle: ViewStyle = {};

  if (props.isCorrect) {
    statusStyle = {
      backgroundColor: componentColors.correct,
    };
  } else if (props.isSelected && props.isCorrect === false) {
    statusStyle = {
      backgroundColor: componentColors.incorrect,
    };
  }

  function onPress() {
    props.onPress?.(props.value);
  }

  return (
    <Card style={[selectedStyle, statusStyle, props.style]} onPress={onPress}>
      <Text style={[AnswerStyles.card, themeStyle.styles.text.textOnSurface]}>
        {props.text}
      </Text>
    </Card>
  );
};

export const TrueFalseAnswerView = React.memo(trueFalseAnswerView);

const styles = StyleSheet.create({
  card: {
    padding: Dimens.spaces.medium,
  },
});
