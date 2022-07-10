import { Curriculum } from '../models/Curriculum';
export interface ICurriculumService {
  getCurriculums(): Promise<Curriculum[]>;
}
