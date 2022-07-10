import { Entypo } from '@expo/vector-icons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator, Modal, StyleSheet, View
} from 'react-native';
import { useCourseDetailsNavigator } from '../../../Navigators';
import { Card } from '../../components/Card/Card';
import { CenteredLoadingSpinner } from '../../components/CenteredLoadingSpinner/CenteredLoadingSpinner';
import { useCourseRepo } from '../../components/EngineProvider/EngineProvider';
import { ErrorView } from '../../components/ErrorView/ErrorView';
import { ScreenAvoidingView } from '../../components/ScreenAvoidingView/ScreenAvoidingView';
import {
  useColors, useStyles, useThemeStyle
} from '../../components/ThemeProvider/ThemeProvider';
import { TextEmphasized } from '../../components/Typography/TextEmphasized';
import { Dimens } from '../../constants/Dimens';
import { Course } from '../../models/Course';
import { QuizSession } from '../../models/QuizSession';
import { Subchapter } from '../../models/Subchapter';
import {
  NewDefaultState, RequestState, StateType
} from '../../services/API/ApiService';
import { useEffectCleanSubs } from '../../utils/hooks';
import { ChapterList } from './ChapterList';
import { CourseScreenHeader } from './CourseScreenHeader';

type State = RequestState<Course>;
type QuizSessionState = RequestState<QuizSession>;

type FetchFn = () => void;
type SubchapterGeneratorFn = (subchapter: Subchapter) => void;
type CourseGeneratorFn = (course: Course) => void;

interface Route {
  params: { course: Course };
}

interface Props {
  route: Route;
}

function useCourse(id: number): [State, FetchFn] {
  const [state, setState] = useState<State>(NewDefaultState());
  const repo = useCourseRepo();
  const subs = useEffectCleanSubs();
  const fetchCourse = useCallback(() => {
    const sub = repo.getCourse(id).subscribe(setState);

    subs.push(sub);
  }, [id]);

  return [state, fetchCourse];
}

function useGenerateQuiz(): [
  QuizSessionState,
  CourseGeneratorFn,
  SubchapterGeneratorFn
] {
  const [state, setState] = useState<QuizSessionState>(NewDefaultState());
  const repo = useCourseRepo();
  const subs = useEffectCleanSubs();

  const generateQuizSessionSubchapter = useCallback(
    (subchapter: Subchapter) => {
      const sub = repo
        .generateQuizSessionSubchapter(subchapter.id)
        .subscribe(setState);

      subs.push(sub);
    },
    []
  );

  const generateQuizSessionCourse = useCallback((course: Course) => {
    const sub = repo.generateQuizSession(course.id).subscribe(setState);

    subs.push(sub);
  }, []);

  return [state, generateQuizSessionCourse, generateQuizSessionSubchapter];
}

const courseDetailsScreen: React.FunctionComponent<Props> = (props) => {
  const themeStyle = useThemeStyle();
  const course = props.route.params.course;
  const [state, fetchCourse] = useCourse(course.id);
  const themedStyles = useStyles();
  const navigator = useCourseDetailsNavigator();
  const [quizState, courseGenerator, subchapterGenerator] = useGenerateQuiz();
  const colors = useColors();
  useEffect(() => {
    fetchCourse();
  }, []);

  useEffect(() => {
    if (quizState.isSuccess) {
      navigator.navigateToQuizSession(quizState.data.id);
    }
  }, [quizState]);

  const generateCourseQuiz = useCallback(() => {
    courseGenerator(course);
  }, [courseGenerator]);

  const onOldExamsPressed = useCallback(() => {
    navigator.navigateToOldExams(course);
  }, []);

  const innerView = useMemo(() => {
    switch (state.type) {
      case StateType.Success:
        return (
          <ChapterList
            chapters={state.data.chapters ?? []}
            header={() => (
              <CourseScreenHeader
                style={[styles.header]}
                course={state.data}
                onPress={generateCourseQuiz}
                onOldExamsPressed={onOldExamsPressed}
              />
            )}
            paddingHorizontal={styles.paddingHorizontal}
            onSubchapterPress={subchapterGenerator}
          />
        );
      case StateType.Error:
        return <ErrorView onPress={fetchCourse} style={[styles.errorView]} />;
      default:
        return <CenteredLoadingSpinner />;
    }
  }, [state]);

  return (
    <ScreenAvoidingView
      style={[styles.container, themeStyle.styles.backgroundColor]}
      onlyTop
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={quizState.isLoading}
      >
        <View style={[styles.modal]}>
          <Card
            style={[styles.modalCard]}
            containerStyle={[styles.cardContent]}
          >
            <TextEmphasized style={[themedStyles.text.textOnSurface]}>
              Δημιουργούμε ένα μοναδικό quiz για εσένα
            </TextEmphasized>
            <ActivityIndicator size="large" style={[styles.loadingIndicator]} />
          </Card>
        </View>
      </Modal>

      {innerView}
    </ScreenAvoidingView>
  );
};

export const CourseDetailsScreen = React.memo(courseDetailsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorView: {
    padding: Dimens.spaces.screen,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
  },
  loadingIndicator: {
    marginTop: Dimens.spaces.medium,
  },
  cardContent: {
    padding: Dimens.spaces.medium,
    flexGrow: 1,
  },
  paddingHorizontal: {
    paddingHorizontal: Dimens.spaces.medium,
  },
  header: {
    padding: Dimens.spaces.medium,
    marginBottom: Dimens.spaces.large,
  },
  backButton: {
    position: 'absolute',
    top: Dimens.spaces.large,
  },
});
