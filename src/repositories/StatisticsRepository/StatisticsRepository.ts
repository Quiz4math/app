import { from, Observable } from 'rxjs';
import { CorrectnessByCourse } from '../../models/CorrectnessByCourse';
import { StatisticsService } from '../../services/API/StatisticsService';
import { IStatisticsRepository } from './IStatisticsRepository';

export class StatisticsRepository implements IStatisticsRepository {
  constructor(private service: StatisticsService) { }

  totalByDay(): Observable<{ [key: string]: number }> {
    return from(this.service.totalByDay());
  }

  correctnessByCourse(): Observable<CorrectnessByCourse[]> {
    return from(this.service.correctnessByCourse());
  }
}
