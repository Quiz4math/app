import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  StyleProp,
  StyleSheet,
  Vibration,
  View,
  ViewStyle
} from "react-native";
import * as Animatable from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";
import { Dimens } from "../../constants/Dimens";
import { Question } from "../../models/Question";
import { UserAnswer, UserAnswerSubmit } from "../../models/UserAnswer";
import { SecondaryButton } from "../Button/SecondaryButton";
import { TextButton } from "../Button/TextButton";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";
import { UserPreferencesContext } from "../UserPreferencesProvider/UserPreferencesProvider";
import { ExplanationView } from "./QuestionDetails/shared/ExplanationView";
import { QuestionView } from "./QuestionView";

interface Props {
	question: Question;
	onNext?: () => void;
	isActive: boolean;
	onSubmit?: (
		question: Question,
		userAnswer: UserAnswerSubmit,
		callback: (explanation: UserAnswer) => void
	) => void;
	style?: StyleProp<ViewStyle>;
}

export const QuestionContainer: React.FunctionComponent<Props> = (props) => {
	const themeStyle = useContext(ThemeContext).themeStyle;
	const question = props.question;
	const [userAnswer, setUserAnswer] = useState<
		UserAnswerSubmit | undefined
	>();
	const [explanation, setExplanation] = useState<UserAnswer | undefined>();
	const [isSubmitLoading, setSubmitLoading] = useState(false);
	const [isNextEnabled, setIsNextEnabled] = useState(true);
	const [isExplanationLoaded, setIsExplanationLoaded] = useState(false);
	const animatableViewRef = useRef<any>();
	const userPreferences = useContext(UserPreferencesContext).userPreferences;
	const vibrationValue = Boolean(userPreferences.vibrateOnIncorrect);

	const onSubmitCallback = useCallback(
		(explanation: UserAnswer) => {
			setSubmitLoading(false);
			setExplanation(explanation);

			if (vibrationValue && !explanation.correct) {
				Vibration.vibrate(100);
			}
		},
		[setSubmitLoading, setExplanation, vibrationValue]
	);

	const onSubmit = useCallback(() => {
		if (userAnswer) {
			setSubmitLoading(true);
			props.onSubmit?.(question, userAnswer, onSubmitCallback);
		}
	}, [props.onSubmit, userAnswer]);

	const onSelectionChanged = useCallback((userAnswer: UserAnswerSubmit) => {
		setUserAnswer(userAnswer);
	}, []);

	useEffect(() => {
		setExplanation(undefined);
		setUserAnswer(undefined);
		setSubmitLoading(false);
		setIsNextEnabled(true);
		setIsExplanationLoaded(false);
	}, [props.question]);

	useEffect(() => {
		if (explanation?.correct) {
			props.onNext?.();
		}
	}, [explanation]);

	const onNext = useCallback(() => {
		setIsNextEnabled(false);
		props.onNext?.();
	}, [props.onNext, setIsNextEnabled]);

	const onExplanationLoaded = useCallback(() => {
		animatableViewRef.current?.fadeInUpBig(500);
		setIsExplanationLoaded(true);
	}, [animatableViewRef]);

	const explanationStyle = useMemo<ViewStyle>(
		() => (isExplanationLoaded ? {} : { opacity: 0 }),
		[isExplanationLoaded]
	);

	return (
		<View
			style={[
				{ paddingVertical: Dimens.spaces.screen },
				styles.container,
				themeStyle.styles.backgroundColor,
				props.style,
			]}
		>
			<ScrollView overScrollMode="never">
				<QuestionView
					question={question}
					onAnswerSelection={onSelectionChanged}
					style={[styles.horizontalSpace]}
					explanation={explanation}
					isReadOnly={explanation !== undefined}
				/>

				{explanation === undefined && (
					<SecondaryButton
						title="Υποβολή"
						onPress={onSubmit}
						disabled={userAnswer === undefined}
						style={[styles.horizontalSpace, styles.nextButton]}
						loading={isSubmitLoading}
					/>
				)}
				{explanation?.correct === false && (
					<Animatable.View
						ref={animatableViewRef}
						useNativeDriver={true}
					>
						<View style={styles.explanationContainer}>
							<ExplanationView
								explanation={explanation}
								style={[
									styles.horizontalSpace,
									styles.explanation,
									explanationStyle,
								]}
								cardStyle={{ paddingBottom: 0 }}
								onLoadEnd={onExplanationLoaded}
							></ExplanationView>
							<TextButton
								title="Επόμενο"
								onPress={onNext}
								disabled={!isNextEnabled}
							/>
						</View>
					</Animatable.View>
				)}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	nextButton: {
		marginTop: Dimens.spaces.large,
	},
	horizontalSpace: {
		marginHorizontal: Dimens.spaces.screen,
	},
	explanation: {
		marginBottom: Dimens.spaces.large,
	},
	explanationContainer: {
		minHeight: 350,
	},
});
