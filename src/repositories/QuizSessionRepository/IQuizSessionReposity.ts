import { Observable } from "rxjs";
import { Question } from "../../models/Question";
import { UserAnswer, UserAnswerSubmit } from "../../models/UserAnswer";

export interface IQuizSessionRepository {
	currentQuestion(sessionId: number): Observable<Question | null>;
	nextQuestion(sessionId: number): Observable<Question | null>;
	submitAnswer(
		sessionId: number,
		questionId: number,
		answer: UserAnswerSubmit
	): Observable<UserAnswer>;
	summary(sessionId: number): Observable<UserAnswer[]>;
}
