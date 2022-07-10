import { IChangeAccountInformationRepository } from './repositories/ChangeAccountInformationRepository/IChangeAccountInformationRepository';
import { ICourseRepository } from './repositories/CourseRepository/ICourseRepository';
import { ICurriculumRepository } from './repositories/CurriculumRepository/ICurriculumRepository';
import { IQuizSessionGenerationRepository } from './repositories/QuizSessionGenerationRepository/IQuizSessionGenerationRepository';
import { IQuizSessionRepository } from './repositories/QuizSessionRepository/IQuizSessionReposity';
import { IStatisticsRepository } from './repositories/StatisticsRepository/IStatisticsRepository';
import { IUserRepository } from './repositories/UserRepository/IUserRepository';
import { ILocalStorage } from './stores/ILocalStorage';

export class Engine {
  constructor(private factory: EngineFactory) {}

  get userRepository(): IUserRepository {
    return this.factory.userRepository;
  }

  get courseRepository(): ICourseRepository {
    return this.factory.courseRepository;
  }

  get quizSessionRepository(): IQuizSessionRepository {
    return this.factory.quizSessionRepository;
  }

  get localStorage(): ILocalStorage {
    return this.factory.localStorage;
  }

  get statisticsRepository(): IStatisticsRepository {
    return this.factory.statisticsRepository;
  }

  get quizSessionGenerationRepository(): IQuizSessionGenerationRepository {
    return this.factory.quizSessionGenerationRepository;
  }

  get curriculumRepo(): ICurriculumRepository {
    return this.factory.curriculumRepo;
  }
  
  get changeAccountInformationRepository(): IChangeAccountInformationRepository {
    return this.factory.changeAccountInformationRepository;
  }
}

export interface EngineFactory {
  readonly userRepository: IUserRepository;
  readonly courseRepository: ICourseRepository;
  readonly quizSessionRepository: IQuizSessionRepository;
  readonly localStorage: ILocalStorage;
  readonly statisticsRepository: IStatisticsRepository;
  readonly quizSessionGenerationRepository: IQuizSessionGenerationRepository;
  readonly curriculumRepo: ICurriculumRepository;
  readonly changeAccountInformationRepository: IChangeAccountInformationRepository;
}
