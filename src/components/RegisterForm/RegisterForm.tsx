import { yupResolver } from '@hookform/resolvers/yup';
import { Picker } from '@react-native-picker/picker';
import * as WebBrowser from 'expo-web-browser'; //@ToDo
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { number, object, ref, string } from 'yup';
import { useRegisterNavigator } from '../../../Navigators';
import { Dimens } from '../../constants/Dimens';
import { Curriculum } from '../../models/Curriculum';
import {
  ErrorState, NewDefaultState, RequestState, StateType
} from '../../services/API/ApiService';
import { RegisterResult } from '../../services/IAuthService';
import { useCleanSubscriptions } from '../../utils/hooks';
import { AuthContext, useAuthState } from '../AuthProvider/AuthProvider';
import { Button } from '../Button/Button';
import { CheckBox } from '../Checkbox/Checkbox';
import { useUserRepo } from '../EngineProvider/EngineProvider';
import { Select } from '../Select/Select';
import { TextInput } from '../TextInput/TextInput';
import { useColors, useThemeStyle } from '../ThemeProvider/ThemeProvider';
import { Touchable } from '../Touchable/Touchable';
import { ErrorText } from '../Typography/ErrorText';
import { Paragraph, SplittingParagraph } from '../Typography/Paragraph';
import { TextEmphasized } from '../Typography/TextEmphasized';

interface Props {
  style?: StyleProp<ViewStyle>;
  curriculums: Curriculum[];
}

interface FormData {
  firstName: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
  curriculumId: number;
}


const schema = object().shape({
  firstName: string().required('Το όνομα είναι υποχρεωτικό').max(255),
  email: string()
    .required('Το email είναι υποχρεωτικό')
    .email('Ελέγξτε την μορφή του email')
    .max(255),
  password: string()
    .required('Ο κωδικός πρόσβασης είναι υποχρεωτικός')
    .min(8, 'Ο κωδικός πρόσβασης πρέπει να περιέχει τουλάχιστον 8 χαρακτήρες')
    .max(255),
  passwordConfirmation: string()
    .required('Η επιβεβαίωση κωδικού είναι υποχρεωτική')
    .oneOf([ref('password')], 'Οι κωδικοί πρέπει να είναι ίδιοι'),
  curriculumId: number()
    .typeError('Το πεδίο είναι υποχρεωτικό')
    .required('Το πεδίο είναι υποχρεωτικό'),
});

function useRegisterRequest(): [
  RequestState<RegisterResult>,
  (form: FormData) => void
] {
  const [state, setState] = useState<RequestState<RegisterResult>>(
    NewDefaultState()
  );
  const userRepo = useUserRepo();
  const subs = useCleanSubscriptions();

  const perfomRegister = useCallback((form: FormData) => {
    const sub = userRepo.register(form).subscribe(setState);

    subs.push(sub);
  }, []);

  return [state, perfomRegister];
}

const registerForm: React.FunctionComponent<Props> = (props) => {
  const _openWebsiteWithWebBrowserTermsOfUse = () => {
    WebBrowser.openBrowserAsync('https://beta.quiz4math.gr/auth/terms-of-use');
  };
  const _openWebsiteWithWebBrowserPrivacyPolicy = () => {
    WebBrowser.openBrowserAsync(
      'https://beta.quiz4math.gr/auth/privacy-policy'
    );
  };

  const themeStyle = useThemeStyle();
  const [state, perform] = useRegisterRequest();
  const navigator = useRegisterNavigator();
  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });
  const [isTOSAccepted, setTOSAccepted] = useState(false);
  const onSubmit = useMemo(() => form.handleSubmit(perform), []);
  const colors = useColors();

  const authState = useContext(AuthContext);
  const genericError = state.isErrored ? 'Κάτι πήγε στραβά' : undefined
  useEffect(() => {
    if (state.isSuccess) {
      authState.loggedIn()
    }
  }, [state])

  const textOnBackground = themeStyle.styles.text.textOnBackground;

  const curriculumViews = props.curriculums.map((c) => (
    <Picker.Item label={c.name} value={c.id} key={String(c.id)} />
  ));

  return (
    <View style={[props.style]}>
      <Controller
        control={form.control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            placeholder='Ονόμα'
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            viewStyle={[styles.textInput, { marginTop: Dimens.spaces.medium }]}
            textContentType='givenName'
            error={form.formState.errors.firstName?.message}
          />
        )}
        name='firstName'
        defaultValue=''
      />

      <Controller
        control={form.control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            placeholder='Email'
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            viewStyle={styles.textInput}
            textContentType='emailAddress'
            error={
              form.formState.errors.email?.message
            }
          />
        )}
        name='email'
        defaultValue=''
      />

      <Controller
        control={form.control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            placeholder='Password'
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            viewStyle={styles.textInput}
            textContentType='password'
            secureTextEntry={true}
            error={form.formState.errors.password?.message}
          />
        )}
        name='password'
        defaultValue=''
      />
      <Controller
        control={form.control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            placeholder='Επιβεβαίωση κωδικού πρόσβασης'
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            viewStyle={styles.textInput}
            textContentType='password'
            secureTextEntry={true}
            error={form.formState.errors.passwordConfirmation?.message}
          />
        )}
        name='passwordConfirmation'
        defaultValue=''
      />

      <Controller
        control={form.control}
        render={({field: { onChange, onBlur, value }}) => (
          <Select
            containerStyle={styles.select}
            selectedValue={value}
            onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
          >
            {curriculumViews}
          </Select>
        )}
        name='curriculumId'
        defaultValue={props.curriculums[0].id}
      />

      <View style={[styles.checkBoxContainer]}>
        <CheckBox
          value={isTOSAccepted}
          onValueChanged={setTOSAccepted}
          style={[styles.checkbox]}
        />

        <View style={[styles.checkBoxTextContainer]}>
          <SplittingParagraph style={[textOnBackground]} startingKey={0}>
           Είμαι πάνω από 16 ετών και συμφωνώ με τους
          </SplittingParagraph>
          <Touchable onPress={_openWebsiteWithWebBrowserTermsOfUse}>
            <Paragraph style={[{ color: colors.linkColor }]}>
              όρους χρήσης{' '}
            </Paragraph>
          </Touchable>
          <SplittingParagraph style={[textOnBackground]} startingKey={100}>
            της ιστοσελίδας και την
          </SplittingParagraph>
          <Touchable onPress={_openWebsiteWithWebBrowserPrivacyPolicy}>
            <Paragraph style={[{ color: colors.linkColor }]}>
              πολιτική απορρήτου.
            </Paragraph>
          </Touchable>
        </View>
      </View>

      <ErrorText style={[styles.errorText]}>{genericError}</ErrorText>

      <Button
        title='Εγγραφή'
        style={styles.button}
        onPress={onSubmit}
        disabled={!isTOSAccepted}
        loading={state.type == StateType.Loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginTop: Dimens.spaces.medium,
  },
  headline: {
    textAlign: 'center',
  },
  select: {
    marginTop: Dimens.spaces.medium,
  },
  button: {
    marginTop: Dimens.spaces.large,
  },
  avoidingView: {
    flex: 1,
    paddingVertical: Dimens.spaces.large,
  },
  errorText: {
    marginTop: Dimens.spaces.medium,
    textAlign: 'center',
  },
  checkBoxContainer: {
    marginTop: Dimens.spaces.large,
    flexDirection: 'row',
  },
  checkbox: {
    minWidth: 32,
    minHeight: 32,
  },
  checkBoxTextContainer: {
    flex: 1,
    marginStart: Dimens.spaces.small,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export const RegisterForm = React.memo(registerForm);
