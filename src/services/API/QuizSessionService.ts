import humps from 'humps';
import { Question } from '../../models/Question';
import { UserAnswer, UserAnswerSubmit } from '../../models/UserAnswer';
import { IQuizSessionService } from '../IQuizSessionService';
import { ApiService } from './ApiService';

export class QuizSessionService extends ApiService
  implements IQuizSessionService {
  async currentQuestion(sessionId: number): Promise<Question | null> {
    const resp = await this.axios.get(
      `/quiz_sessions/${sessionId}/current_question`
    );

    if (!resp.data) {
      return resp.data;
    }

    return {
      ...resp.data,
      sessionId,
    };
  }

  async nextQuestion(sessionId: number): Promise<Question | null> {
    const resp = await this.axios.get(
      `/quiz_sessions/${sessionId}/next_question`
    );

    if (!resp.data) {
      return resp.data;
    }

    return {
      ...resp.data,
      sessionId,
    };
  }

  async submitAnswer(
    sessionId: number,
    questionId: number,
    answer: UserAnswerSubmit
  ): Promise<UserAnswer> {
    const resp = await this.axios.post(
      `/quiz_sessions/${sessionId}/questions/${questionId}/user_answers`,
      humps.decamelizeKeys(answer)
    );

    return resp.data;
  }

  async summary(sessionId: number): Promise<UserAnswer[]> {
    const resp = await this.axios.get(`/quiz_sessions/${sessionId}/summary`);

    return resp.data;
  }
}
