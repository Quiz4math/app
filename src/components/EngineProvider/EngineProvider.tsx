import React, { useContext } from 'react';
import { createContext } from 'react';
import { EngineFactory, Engine } from '../../engine';
import { UserRepository } from '../../repositories/UserRepository/UserRepository';
import { ApiAuthService } from '../../services/API/ApiAuthService';
import { AuthStore } from '../../stores/AuthStore';
import { CourseRepository } from '../../repositories/CourseRepository/CourseRepository';
import { ApiCourseService } from '../../services/API/ApiCourseService';
import { QuizSessionRepository } from '../../repositories/QuizSessionRepository/QuizSessionRepository';
import { QuizSessionService } from '../../services/API/QuizSessionService';
import { LocalStorage } from '../../stores/LocalStorage';
import { StatisticsRepository } from '../../repositories/StatisticsRepository/StatisticsRepository';
import { StatisticsService } from '../../services/API/StatisticsService';
import { QuizSessionGenerationRepository } from '../../repositories/QuizSessionGenerationRepository/QuizSessionGenerationRepository';
import { ApiQuizSessionGenerationService } from '../../services/API/ApiQuizSessionGenerationService';
import { ServiceExecutorImpl } from '../../repositories/ServiceExecutor';
import { CurriculumRepository } from '../../repositories/CurriculumRepository/CurriculumRepository';
import { ApiCurriculumService } from '../../services/API/ApiCurriculumService';
import { MemoryCacheStore } from '../../utils/CacheStore';
import { ChangeAccountInformationRepository } from '../../repositories/ChangeAccountInformationRepository/ChangeAccountInformationRepository';
import { APIChangeAccountInfromationService } from '../../services/API/APIChangeAccountInformationService';

const authStore = AuthStore.shared();

const executor = new ServiceExecutorImpl();

export function useCurriculumRepo() {
  return useContext(EngineContext).curriculumRepo;
}

export function useUserRepo() {
  return useContext(EngineContext).userRepository;
}

export function useCourseRepo() {
  return useContext(EngineContext).courseRepository;
}

export function useChangeAccountInformationRepo(){
  return useContext(EngineContext).changeAccountInformationRepository;
}

const cacheStore = new MemoryCacheStore();

const factory: EngineFactory = {
  userRepository: new UserRepository(new ApiAuthService(), authStore, executor),
  courseRepository: new CourseRepository(new ApiCourseService(), executor),
  quizSessionRepository: new QuizSessionRepository(new QuizSessionService()),
  localStorage: new LocalStorage(),
  statisticsRepository: new StatisticsRepository(new StatisticsService()),
  quizSessionGenerationRepository: new QuizSessionGenerationRepository(
    new ApiQuizSessionGenerationService()
  ),
  curriculumRepo: new CurriculumRepository(
    executor,
    new ApiCurriculumService()
  ),
  changeAccountInformationRepository: new ChangeAccountInformationRepository(executor, new APIChangeAccountInfromationService()),
};

const engine = new Engine(factory);

export const EngineContext = createContext<Engine>(engine);

const engineProvider: React.FunctionComponent = (props) => {
  return (
    <EngineContext.Provider value={engine}>
      {props.children}
    </EngineContext.Provider>
  );
};

export const EngineProvider = React.memo(engineProvider);
