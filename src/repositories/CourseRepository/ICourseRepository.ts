import { Observable } from 'rxjs';
import { Course } from '../../models/Course';
import { QuizSession } from '../../models/QuizSession';
import { RequestState } from '../../services/API/ApiService';

export interface ICourseRepository {
  getUserCourses(): Promise<Course[]>;
  getCourses(): Observable<RequestState<Course[]>>;
  getCourse(id: number): Observable<RequestState<Course>>;
  setSubchaptersTaught(
    flag: boolean,
    ids: number[]
  ): Observable<RequestState<void>>;
  generateQuizSession(courseId: number): Observable<RequestState<QuizSession>>;
  generateQuizSessionSubchapter(
    subchapterId: number
  ): Observable<RequestState<QuizSession>>;
}
