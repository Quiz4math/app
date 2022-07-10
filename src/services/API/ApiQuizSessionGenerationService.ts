import { Suggestion } from '../../models/Suggestion';
import { ApiService } from './ApiService';

export class ApiQuizSessionGenerationService extends ApiService {
  async generateSuggestions(): Promise<Suggestion[]> {
    const resp = await this.axios.get('/suggestions');

    return resp.data;
  }
}
