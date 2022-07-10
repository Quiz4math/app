import React, { useState, useEffect, useCallback } from 'react';
import {
  Question,
  MultipleChoiceQuestion,
  MultipleChoiceAnswer,
} from '../../../../models/Question';
import { ViewStyle, StyleProp, StyleSheet, View } from 'react-native';
import { QuestionBody } from '../shared/QuestionBody';
import { MultipleChoiceAnswerView } from './MultipleChoiceAnswerView';
import { Dimens } from '../../../../constants/Dimens';
import { ResourceOwnerText } from '../shared/ResourceOwnerText';
import {
  UserAnswer,
  UserAnswerSubmit,
  MultipleChoiceUserAnswer,
  MultipleChoiceUserAnswerSubmit,
} from '../../../../models/UserAnswer';

interface Props {
  question: Question;
  style?: StyleProp<ViewStyle>;
  details: MultipleChoiceQuestion;
  explanation?: UserAnswer;
  correctAnswer?: MultipleChoiceUserAnswer;
  onAnswerSelection?: (userAnswer: UserAnswerSubmit) => void;
  isReadOnly: boolean;
}

function isCorrect(
  answer: MultipleChoiceAnswer,
  correctAnswerId: number | undefined
): boolean | undefined {
  if (correctAnswerId === undefined) {
    return undefined;
  }

  return answer.id === correctAnswerId;
}

interface ListProps {
  answers?: MultipleChoiceAnswer[];
  onAnswerPress?: (answerId: number) => void;
  selectedAnswerId?: number;
  correctAnswerId?: number;
}

const multipleChoiceAnswerList: React.FunctionComponent<ListProps> = (
  props
) => {
  const answersView = props.answers?.map((answer) => (
    <MultipleChoiceAnswerView
      answer={answer}
      key={answer.id ?? 0}
      style={styles.answersView}
      isSelected={answer.id === props.selectedAnswerId}
      isCorrect={isCorrect(answer, props.correctAnswerId)}
      onPress={() => props.onAnswerPress?.(answer.id ?? 0)}
    />
  ));

  return <>{answersView}</>;
};

const MulitpleChoiceAnswerList = React.memo(multipleChoiceAnswerList);

export const MultipleChoiceQuestionView: React.FunctionComponent<Props> = (
  props
) => {
  const [selectedAnswerId, setSelectedAnswerId] = useState<number>(0);

  const onAnswerPress = useCallback(
    (answerId: number) => {
      if (!props.isReadOnly) {
        setSelectedAnswerId(answerId);
        const answer: MultipleChoiceUserAnswerSubmit = {
          multipleChoiceAnswerId: answerId,
        };
        props.onAnswerSelection?.(answer);
      }
    },
    [props.onAnswerSelection, props.isReadOnly]
  );

  useEffect(() => {
    setSelectedAnswerId(0);

    if (props.explanation && props.correctAnswer) {
      setSelectedAnswerId(props.correctAnswer.givenAnswerId);
    }
  }, [props.question, props.explanation]);

  return (
    <View style={[props.style]}>
      <QuestionBody
        body={props.details.body ?? ''}
        style={[styles.questionBody]}
      />
      <ResourceOwnerText
        resourceOwner={props.question.resourceOwner}
        style={[styles.resourceOwner]}
      />
      <MulitpleChoiceAnswerList
        answers={props.details.answers}
        onAnswerPress={onAnswerPress}
        selectedAnswerId={selectedAnswerId}
        correctAnswerId={props.correctAnswer?.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  answersView: {
    marginTop: Dimens.spaces.medium,
  },
  resourceOwner: {
    marginBottom: Dimens.spaces.large,
  },
  questionBody: {},
});
