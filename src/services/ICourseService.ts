import { Course } from '../models/Course';
import { QuizSession } from '../models/QuizSession';

export interface ICourseService {
  getUserCourses(): Promise<Course[]>;
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course>;
  markSubchaptersAsTaught(ids: number[]): Promise<void>;
  markSubchaptersAsNotTaught(ids: number[]): Promise<void>;
  generateQuizSession(courseId: number): Promise<QuizSession>;
  generateQuizSessionSubchapter(subchapterId: number): Promise<QuizSession>;
}
