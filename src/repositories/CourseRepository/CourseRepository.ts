import { BehaviorSubject, from, Observable } from 'rxjs';
import { Course } from '../../models/Course';
import { QuizSession } from '../../models/QuizSession';
import { RequestState } from '../../services/API/ApiService';
import { ICourseService } from '../../services/ICourseService';
import { ServiceExecutor } from '../ServiceExecutor';
import { ICourseRepository } from './ICourseRepository';

export class CourseRepository implements ICourseRepository {
  constructor(
    private service: ICourseService,
    private executor: ServiceExecutor
  ) {}

  getUserCourses(): Promise<Course[]> {
    return this.service.getUserCourses();
  }

  getCourse(id: number): Observable<RequestState<Course>> {
    return this.executor.performRequest(() => this.service.getCourse(id));
  }

  getCourses(): Observable<RequestState<Course[]>> {
    return this.executor.performRequest(() => this.service.getCourses());
  }

  generateQuizSession(courseId: number): Observable<RequestState<QuizSession>> {
    return this.executor.performRequest(() =>
      this.service.generateQuizSession(courseId)
    );
  }

  generateQuizSessionSubchapter(
    subchapterId: number
  ): Observable<RequestState<QuizSession>> {
    return this.executor.performRequest(() =>
      this.service.generateQuizSessionSubchapter(subchapterId)
    );
  }

  setSubchaptersTaught(
    flag: boolean,
    ids: number[]
  ): Observable<RequestState<void>> {
    if (flag) {
      return this.executor.performRequest(() =>
        this.service.markSubchaptersAsTaught(ids)
      );
    }

    return this.executor.performRequest(() =>
      this.service.markSubchaptersAsNotTaught(ids)
    );
  }
}
