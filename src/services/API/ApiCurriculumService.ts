import { Curriculum } from '../../models/Curriculum';
import { ICurriculumService } from '../ICurriculumService';
import { ApiService } from './ApiService';

export class ApiCurriculumService extends ApiService
  implements ICurriculumService {
  async getCurriculums(): Promise<Curriculum[]> {
    return (await this.axios.get('/curriculums')).data;
  }
}
