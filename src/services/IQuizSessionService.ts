import { Question } from '../models/Question';
import { UserAnswer, UserAnswerSubmit } from '../models/UserAnswer';

export interface IQuizSessionService {
  currentQuestion(sessionId: number): Promise<Question | null>;
  nextQuestion(sessionId: number): Promise<Question | null>;
  submitAnswer(
    sessionId: number,
    questionId: number,
    answer: UserAnswerSubmit
  ): Promise<UserAnswer>;
  summary(sessionId: number): Promise<UserAnswer[]>;
}
