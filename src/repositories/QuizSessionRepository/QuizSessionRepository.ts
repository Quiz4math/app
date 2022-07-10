import { from, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Question } from '../../models/Question';
import { UserAnswer, UserAnswerSubmit } from '../../models/UserAnswer';
import { IQuizSessionService } from '../../services/IQuizSessionService';
import { IQuizSessionRepository } from './IQuizSessionReposity';

export class QuizSessionRepository implements IQuizSessionRepository {
  constructor(private service: IQuizSessionService) { }

  currentQuestion(sessionId: number): Observable<Question | null> {
    return from(this.service.currentQuestion(sessionId));
  }

  nextQuestion(sessionId: number): Observable<Question | null> {
    return from(this.service.nextQuestion(sessionId)).pipe(shareReplay(1));
  }

  submitAnswer(
    sessionId: number,
    questionId: number,
    answer: UserAnswerSubmit
  ): Observable<UserAnswer> {
    return from(this.service.submitAnswer(sessionId, questionId, answer));
  }

  summary(sessionId: number): Observable<UserAnswer[]> {
    return from(this.service.summary(sessionId));
  }
}
