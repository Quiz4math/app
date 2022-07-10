import { CorrectnessByCourse } from '../../models/CorrectnessByCourse';
import { ApiService } from './ApiService';

export interface TotalByDayEntry {}
export class StatisticsService extends ApiService {
  async totalByDay(): Promise<{ [key: string]: number }> {
    const resp = await this.axios.get('/stats/total_by_day');

    return resp.data;
  }

  async correctnessByCourse(): Promise<CorrectnessByCourse[]> {
    const resp = await this.axios.get('/stats/correctness_by_course');

    return resp.data;
  }
}
