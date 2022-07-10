import { Course } from '../../models/Course';
import { QuizSession } from '../../models/QuizSession';
import { ICourseService } from '../ICourseService';
import { ApiService } from './ApiService';

export class ApiCourseService extends ApiService implements ICourseService {
  async getUserCourses(): Promise<Course[]> {
    const resp = await this.axios.get('/user/courses');

    return resp.data;
  }

  async getCourses(): Promise<Course[]> {
    const resp = await this.axios.get('/courses');

    return resp.data;
  }

  async getCourse(id: number): Promise<Course> {
    const resp = await this.axios.get<Course>(`/courses/${id}`);

    return resp.data;
  }

  async generateQuizSession(courseId: number): Promise<QuizSession> {
    const resp = await this.axios.post('/quiz_generator/courses', {
      id: courseId,
    });

    return resp.data;
  }

  async generateQuizSessionSubchapter(
    subchapterId: number
  ): Promise<QuizSession> {
    const resp = await this.axios.post<QuizSession>(
      '/quiz_generator/subchapters',
      {
        id: subchapterId,
      }
    );

    return resp.data;
  }

  async markSubchaptersAsTaught(ids: number[]): Promise<void> {
    await this.axios.post('/taught_subchapters', { id: ids });
  }

  async markSubchaptersAsNotTaught(ids: number[]): Promise<void> {
    await this.axios.delete('/taught_subchapters', { data: { id: ids } });
  }
}
