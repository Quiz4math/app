import React, { useCallback, useEffect, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Dimens } from '../../../../constants/Dimens';
import { Question, TrueFalseQuestion } from '../../../../models/Question';
import {
  TrueFalseUserAnswer,
  TrueFalseUserAnswerSubmit, UserAnswer, UserAnswerSubmit
} from '../../../../models/UserAnswer';
import { QuestionBody } from '../shared/QuestionBody';
import { ResourceOwnerText } from '../shared/ResourceOwnerText';
import { TrueFalseAnswerView } from './TrueFalseAnswerView';

interface Props {
  question: Question;
  style?: StyleProp<ViewStyle>;
  details: TrueFalseQuestion;
  onAnswerSelection?: (userAnswer: UserAnswerSubmit) => void;
  explanation?: UserAnswer;
  correctAnswer?: TrueFalseUserAnswer;
  isReadOnly: boolean;
}

function isCorrect(
  value: boolean,
  correct: boolean | undefined
): boolean | undefined {
  if (correct === undefined) {
    return undefined;
  }

  return value === correct;
}

export const TrueFalseQuestionView: React.FunctionComponent<Props> = (
  props
) => {
  const [selectedValue, setSelectedValue] = useState<boolean | undefined>();

  const onPress = useCallback(
    (value: boolean) => {
      if (!props.isReadOnly) {
        setSelectedValue(value);
        const answer: TrueFalseUserAnswerSubmit = { givenAnswer: value };
        props.onAnswerSelection?.(answer);
      }
    },
    [props.onAnswerSelection, props.isReadOnly]
  );

  useEffect(() => {
    setSelectedValue(undefined);

    if (props.explanation && props.correctAnswer) {
      if (props.explanation.correct) {
        setSelectedValue(props.correctAnswer.correct);
      } else {
        setSelectedValue(!props.correctAnswer.correct);
      }
    }
  }, [props.question, props.explanation]);

  return (
    <View style={[props.style]}>
      <QuestionBody body={props.details.body ?? ''} />
      <ResourceOwnerText
        resourceOwner={props.question.resourceOwner}
        style={[styles.resourceOwner]}
      />
      <TrueFalseAnswerView
        text="Σωστό"
        style={[styles.answerView]}
        value={true}
        isCorrect={isCorrect(true, props.correctAnswer?.correct)}
        isSelected={selectedValue}
        onPress={onPress}
      />
      <TrueFalseAnswerView
        text="Λάθος"
        style={[styles.answerView]}
        value={false}
        isCorrect={isCorrect(false, props.correctAnswer?.correct)}
        isSelected={selectedValue === false}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  answerView: {
    marginTop: Dimens.spaces.medium,
  },
  resourceOwner: {
    marginBottom: Dimens.spaces.large,
  },
});
