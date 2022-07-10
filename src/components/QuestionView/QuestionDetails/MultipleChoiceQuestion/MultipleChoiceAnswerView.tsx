import React, { useContext } from 'react';
import { MultipleChoiceAnswer } from '../../../../models/Question';
import { Card } from '../../../Card/Card';
import { QuillView } from '../../../QuillView/QuillView';
import { StyleProp, ViewStyle, View } from 'react-native';
import { ThemeContext } from '../../../ThemeProvider/ThemeProvider';
import { AnswerStyles } from '../shared/AnswerStyles';

interface Props {
  style?: StyleProp<ViewStyle>;
  answer: MultipleChoiceAnswer;
  isSelected?: boolean;
  isCorrect?: boolean;
  onPress?: (answerId: number) => void;
}

const multipleChoiceAnswerView: React.FunctionComponent<Props> = (props) => {
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
    props.onPress?.(props.answer.id ?? 0);
  }

  return (
    <Card style={[props.style, selectedStyle, statusStyle]} onPress={onPress}>
      <View style={AnswerStyles.card}>
        <QuillView
          deltaOps={props.answer.body ?? ''}
          cssOptions={{
            textColor: themeStyle.theme.colors.textColorOnSurface,
            fontSize: 15,
          }}
        ></QuillView>
      </View>
    </Card>
  );
};

export const MultipleChoiceAnswerView = React.memo(multipleChoiceAnswerView);
