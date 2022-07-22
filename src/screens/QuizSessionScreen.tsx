import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { Animated, InteractionManager, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Observable } from "rxjs";
import { CenteredLoadingSpinner } from "../components/CenteredLoadingSpinner/CenteredLoadingSpinner";
import { EngineContext } from "../components/EngineProvider/EngineProvider";
import { QuestionContainer } from "../components/QuestionView/QuestionContainer";
import { ThemeContext } from "../components/ThemeProvider/ThemeProvider";
import { Dimens } from "../constants/Dimens";
import { Question } from "../models/Question";
import { UserAnswer, UserAnswerSubmit } from "../models/UserAnswer";
import { useCleanSubscriptions } from "../utils/hooks";
import { errorCallbackComeBack } from "../utils/utilFunctions";

export const AfterInteractions: React.FC<{
	loadingComponent?: React.ReactNode;
}> = (props) => {
	const [loaded, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		InteractionManager.runAfterInteractions(() => {
			setLoaded(true);
		});
	}, []);

	if (!loaded) {
		return <>{props.loadingComponent ?? null}</>;
	}

	return <>{props.children}</>;
};

interface Route {
	params: { sessionId: number };
}

interface Props {
	route: Route;
	navigation: any;
}

const quizSessionScreen: React.FunctionComponent<Props> = (props) => {
	const themeStyle = useContext(ThemeContext).themeStyle;
	const sessionRepo = useContext(EngineContext).quizSessionRepository;
	const sessionId = props.route.params.sessionId;

	const subs = useCleanSubscriptions();
	const [question1, setQuestion1] = useState<Question | null>(null);
	const [question2, setQuestion2] = useState<Question | null>(null);
	const [isShowingLeft, setIsShowingLeft] = useState(true);
	const nextQuestionObservable = useRef<Observable<Question | null>>();
	const anim = useRef(new Animated.Value(0)).current;

	const isFirstQuestion = useRef<boolean>(true);

	const updateTitleForQuestion = useCallback(
		(question: Question) => {
			props.navigation.setOptions({
				title: question.subchapter?.name.substring(0, 25) ?? "Ερώτηση",
			});
		},
		[props.navigation]
	);

	function loadCurrentQuestion() {
		const sub = sessionRepo.currentQuestion(sessionId).subscribe(
			(q) => {
				if (!q) {
					props.navigation.replace("Summary", {
						sessionId: sessionId,
					});
				} else if (isFirstQuestion.current) {
					setQuestion1(q);
					isFirstQuestion.current = false;
					updateTitleForQuestion(q);
				}
			},
			(error) =>
				props.navigation.replace("Error", {
					callback: errorCallbackComeBack(
						props.navigation,
						"QuizSession",
						{
							sessionId: sessionId,
						}
					),
					message: `Error code: ${error?.response?.status ?? -1}`,
				})
		);

		subs.push(sub);
	}

	function loadNextQuestion() {
		nextQuestionObservable.current = sessionRepo.nextQuestion(sessionId);
		const sub = nextQuestionObservable.current.subscribe(
			(q) => {
				if (q) {
					if (isShowingLeft) {
						setQuestion2(q);
					} else {
						setQuestion1(q);
					}
				}
			},
			(error) =>
				props.navigation.replace("Error", {
					callback: errorCallbackComeBack(
						props.navigation,
						"QuizSession",
						{
							sessionId: sessionId,
						}
					),
					message: `Error code: ${error?.response?.status ?? -1}`,
				})
		);

		subs.push(sub);
	}

	function onSubmit(
		question: Question,
		userAnswer: UserAnswerSubmit,
		callback?: (exp: UserAnswer) => void
	) {
		const sub = sessionRepo
			.submitAnswer(sessionId, question.id ?? 0, userAnswer)
			.subscribe(
				(explanation) => {
					callback?.(explanation);
				},
				(error) => {
					props.navigation.replace("Error", {
						callback: errorCallbackComeBack(
							props.navigation,
							"QuizSession",
							{
								sessionId: sessionId,
							}
						),
						message: `Error code: ${error?.response?.status ?? -1}`,
					});
				}
			);

		subs.push(sub);
	}

	const onNext = useCallback(() => {
		const sub = nextQuestionObservable.current!.subscribe((q) => {
			if (!q) {
				props.navigation.replace("Summary", { sessionId: sessionId });
			} else {
				Animated.timing(anim, {
					toValue: -wp("100%"),
					duration: 500,
					useNativeDriver: true,
				}).start(() => {
					anim.setValue(0);
					setIsShowingLeft(!isShowingLeft);
				});
			}
		});

		subs.push(sub);
	}, [nextQuestionObservable, setIsShowingLeft, anim, isShowingLeft]);

	useEffect(() => {
		loadCurrentQuestion();
		loadNextQuestion();

		if (isShowingLeft && question1) {
			updateTitleForQuestion(question1);
		} else if (question2) {
			updateTitleForQuestion(question2);
		}
	}, [isShowingLeft]);

	const flexDirect = isShowingLeft ? "row" : "row-reverse";

	return (
		<AfterInteractions loadingComponent={<CenteredLoadingSpinner />}>
			{!question1 && <CenteredLoadingSpinner />}
			<Animated.View
				style={[
					styles.questionViewContainer,
					{ transform: [{ translateX: anim }] },
					{ flexDirection: flexDirect },
					themeStyle.styles.backgroundColor,
				]}
			>
				<View style={{ flex: 1 }}>
					<QuestionContainer
						question={question1!}
						isActive={true}
						onSubmit={onSubmit}
						style={{ flex: 1 }}
						onNext={onNext}
					/>
				</View>

				<View style={{ flex: 1 }}>
					<QuestionContainer
						question={question2!}
						isActive={true}
						onSubmit={onSubmit}
						style={{ flex: 1 }}
						onNext={onNext}
					/>
				</View>
			</Animated.View>
		</AfterInteractions>
	);
};

export const QuizSessionScreen = React.memo(quizSessionScreen);

const styles = StyleSheet.create({
	button: {
		marginTop: Dimens.spaces.large,
	},
	questionViewContainer: {
		width: "200%",
		flexWrap: "nowrap",
		height: "100%",
	},
});
