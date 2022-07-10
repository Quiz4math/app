import { Entity } from './Entity';
import {
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  Question,
} from './Question';

export interface UserAnswer extends Entity {
  correct: boolean;
  detailsType: string;
  question: Question;
  correctAnswer: SpecificExplanation;
}

interface SpecificExplanation {
  explanation: string;
}

export interface MultipleChoiceUserAnswer extends SpecificExplanation {
  givenAnswerId: number;
  id: number;
  body: string;
}

export interface TrueFalseUserAnswer extends SpecificExplanation {
  correct: boolean;
}

export interface UserAnswerSubmit extends Entity {}

export interface MultipleChoiceUserAnswerSubmit extends UserAnswerSubmit {
  multipleChoiceAnswerId: number;
}

export interface TrueFalseUserAnswerSubmit extends UserAnswerSubmit {
  givenAnswer: boolean;
}
