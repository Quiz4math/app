import { Observable } from 'rxjs';
import { Curriculum } from '../../models/Curriculum';
import { RequestState } from '../../services/API/ApiService';

export interface ICurriculumRepository {
  getCurriculums(): Observable<RequestState<Curriculum[]>>;
}
