import React, { useEffect, useRef } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Question } from '../../models/Question';
import {
  MultipleChoiceUserAnswer, TrueFalseUserAnswer, UserAnswer, UserAnswerSubmit
} from '../../models/UserAnswer';
import { MultipleChoiceQuestionView } from './QuestionDetails/MultipleChoiceQuestion/MultipleChoiceQuestionView';
import { TrueFalseQuestionView } from './QuestionDetails/TrueFalseQuestion/TrueFalseQuestionView';

interface Props {
  question: Question;
  onAnswerSelection?: (userAnswer: UserAnswerSubmit) => void;
  style?: StyleProp<ViewStyle>;
  explanation?: UserAnswer;
  isReadOnly: boolean;
}

const questionView: React.FunctionComponent<Props> = (props) => {
  if (!props.question) {
    return (
      <View style={[{ backgroundColor: 'transparent' }, props.style]}></View>
    );
  }

  if (props.question.detailsType === 'multiple_choice_question') {
    return (
      <MultipleChoiceQuestionView
        question={props.question}
        details={props.question.details}
        onAnswerSelection={props.onAnswerSelection}
        style={props.style}
        explanation={props.explanation}
        correctAnswer={
          props.explanation?.correctAnswer as MultipleChoiceUserAnswer
        }
        isReadOnly={props.isReadOnly}
      />
    );
  } else if (props.question.detailsType === 'true_false_question') {
    return (
      <TrueFalseQuestionView
        question={props.question}
        details={props.question.details}
        onAnswerSelection={props.onAnswerSelection}
        style={props.style}
        explanation={props.explanation}
        correctAnswer={props.explanation?.correctAnswer as TrueFalseUserAnswer}
        isReadOnly={props.isReadOnly}
      />
    );
  } else {
    return <View style={props.style}></View>;
  }
};

export const QuestionView = React.memo(questionView);
