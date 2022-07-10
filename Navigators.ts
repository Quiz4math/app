import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { Course } from './src/models/Course';

class Navigator {
  constructor(protected navigation: any) {}

  goBack() {
    this.navigation.goBack();
  }
}
const tosURL = 'https://beta.quiz4math.gr/auth/terms-of-use';
const privacyURL = 'https://beta.quiz4math.gr/auth/privacy-policy';

export class RegisterNavigator {
  constructor(private navigation: any) {}

  finished(email: string) {
    this.navigation.replace('RegisterSuccessfull', { email });
  }

  showTOS() {
    this.navigation.navigate('DocumentViewer', {
      url: tosURL,
      title: 'Όροι χρήσης',
    });
  }

  showPrivacy() {
    this.navigation.navigate('DocumentViewer', {
      url: privacyURL,
      title: 'Πολιτική απορρήτου',
    });
  }
}

export class SuccessfullyRegisterNavigator {
  constructor(private navigation: any) {}

  backToLogin() {
    this.navigation.replace('AuthStackNavigator');
  }
}

export class CoursesNavigator {
  constructor(private navigation: any) {}

  navigateToCourse(course: Course) {
    this.navigation.push('CourseDetails', { course });
  }
}

export class CourseDetailsNavigator extends Navigator {
  constructor(navigation: any) {
    super(navigation);
  }

  navigateToQuizSession(sessionId: number) {
    this.navigation.navigate('QuizSession', { sessionId });
  }

  navigateToOldExams(course: Course) {
    this.navigation.navigate('OldExams', { course });
  }
}

export class OldExamsNavigator extends Navigator {
  constructor(navigation: any) {
    super(navigation);
  }

  showDocument(url: string, title: string) {
    this.navigation.navigate('DocumentViewer', { url, title });
  }
}


export class UniveristyLearnNavigator extends Navigator{

  constructor(navigation: any) {
    super(navigation);
  }

  navigateToUniveristyLearn(){
    this.navigation.navigate('UniversityLearn');
  }

}

export class ChangePasswordNavigator extends Navigator{

  constructor(navigation: any) {
    super(navigation);
  }

  navigateToChangePassword(){
    this.navigation.navigate('ChangePassword');
  }
}

export class ChangeNameNavigator extends Navigator{

  constructor(navigation: any) {
    super(navigation);
  }

  navigateToChangeName(){
    this.navigation.navigate('ChangeName');
  }
}

export class ChangeCurriculumNavigator extends Navigator{

  constructor(navigation: any) {
    super(navigation);
  }

  navigateToChangeCurriculum(){
    this.navigation.navigate('ChangeCurriculum');
  }
}


export class DeleteAccountNavigator extends Navigator{

  constructor(navigation: any) {
    super(navigation);
  }

  navigateToDeleteAccount(){
    this.navigation.navigate('DeleteAccount');
  }
}

export function useCourseDetailsNavigator(): CourseDetailsNavigator {
  const navigation = useNavigation();

  const navigator = useMemo(() => new CourseDetailsNavigator(navigation), [
    navigation,
  ]);

  return navigator;
}

export function useRegisterNavigator(): RegisterNavigator {
  const navigation = useNavigation();

  const navigator = useMemo(() => new RegisterNavigator(navigation), [
    navigation,
  ]);

  return navigator;
}

export function useSuccessfullyRegisterNavigator(): SuccessfullyRegisterNavigator {
  const navigation = useNavigation();

  const navigator = useMemo(
    () => new SuccessfullyRegisterNavigator(navigation),
    [navigation]
  );

  return navigator;
}

export function useCoursesNavigator(): CoursesNavigator {
  const navigation = useNavigation();

  const navigator = useMemo(() => new CoursesNavigator(navigation), [
    navigation,
  ]);

  return navigator;
}

export function useOldExamsNavigator(): OldExamsNavigator {
  const navigation = useNavigation();

  const navigator = useMemo(() => new OldExamsNavigator(navigation), [
    navigation,
  ]);
  return navigator;
}


export function useUniveristyLearnNavigator(): UniveristyLearnNavigator {
  const navigation = useNavigation();
  const navigator = useMemo(() => new UniveristyLearnNavigator(navigation),[
    navigation,
  ]);
  return navigator;
}


export function useChangeCurriculumNavigator(): ChangeCurriculumNavigator {
  const navigation = useNavigation();
  const navigator = useMemo(() => new ChangeCurriculumNavigator(navigation),[
    navigation,
  ]);
  return navigator;
}

export function useChangePasswordNavigator(): ChangePasswordNavigator {
  const navigation = useNavigation();
  const navigator = useMemo(() => new ChangePasswordNavigator(navigation),[
    navigation,
  ]);
  return navigator;
}

export function useChangeNameNavigator(): ChangeNameNavigator {
  const navigation = useNavigation();
  const navigator = useMemo(() => new ChangeNameNavigator(navigation),[
    navigation,
  ]);
  return navigator;
}

export function useDeleteAccountNavigator(): DeleteAccountNavigator {
  const navigation = useNavigation();
  const navigator = useMemo(() => new DeleteAccountNavigator(navigation),[
    navigation,
  ]);
  return navigator;
}
