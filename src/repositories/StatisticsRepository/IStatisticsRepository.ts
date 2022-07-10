import { Observable } from 'rxjs';
import { CorrectnessByCourse } from '../../models/CorrectnessByCourse';

export interface IStatisticsRepository {
  totalByDay(): Observable<{ [key: string]: number }>;
  correctnessByCourse(): Observable<CorrectnessByCourse[]>;
}
