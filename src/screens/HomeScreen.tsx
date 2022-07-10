import * as WebBrowser from "expo-web-browser";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { useUniveristyLearnNavigator } from "../../Navigators";
import { Card } from "../components/Card/Card";
import { CourseList } from "../components/CourseList/CourseList";
import {
  EngineContext,
  useCourseRepo
} from "../components/EngineProvider/EngineProvider";
import { ScreenAvoidingView } from "../components/ScreenAvoidingView/ScreenAvoidingView";
import { ThemeContext } from "../components/ThemeProvider/ThemeProvider";
import { Title } from "../components/Typography/Title";
import { UserGreeting } from "../components/UserGreeting/UserGreeting";
import { Dimens } from "../constants/Dimens";
import { Course } from "../models/Course";
import { QuizSession } from "../models/QuizSession";
import { Suggestion } from "../models/Suggestion";
import { NewDefaultState, RequestState } from "../services/API/ApiService";
import { useCleanSubscriptions } from "../utils/hooks";

interface Props {
	navigation: any;
}

type QuizSessionState = RequestState<QuizSession>;

type CourseGeneratorFn = (course: Course) => void;

function useGenerateQuiz(): [QuizSessionState, CourseGeneratorFn] {
	const [state, setState] = useState<QuizSessionState>(NewDefaultState());
	const repo = useCourseRepo();
	const subs = useCleanSubscriptions();

	const generateQuizSessionCourse = useCallback((course: Course) => {
		const sub = repo.generateQuizSession(course.id).subscribe(setState);

		subs.push(sub);
	}, []);

	return [state, generateQuizSessionCourse];
}

const homeScreen: React.FunctionComponent<Props> = (props) => {
	const themeStyles = useContext(ThemeContext).themeStyle;
	const engine = useContext(EngineContext);
	const userRepo = engine.userRepository;
	const courseRepo = engine.courseRepository;
	const generatorRepo = engine.quizSessionGenerationRepository;
	const [quizState, generateQuizFromCourse] = useGenerateQuiz();

	const [name, setName] = useState<string>("");
	const themeStyle = useContext(ThemeContext).themeStyle;

	const [courses, setCourses] = useState<Course[] | undefined>(undefined);
	const [suggestions, setSuggestions] = useState<Suggestion[] | undefined>(
		undefined
	);

	const _inviteViber = () => {
		WebBrowser.openBrowserAsync(
			"https://invite.viber.com/?g2=AQBhBu2Ut1pKTUygLvsG0QwbTIY8pyRJrzlzm%2FWGwVBPI82jPb%2BITO1odPi%2F0uk6&lang=en"
		);
	};

	const _instagramProfile = () => {
		WebBrowser.openBrowserAsync("https://www.instagram.com/quiz4math/");
	};

	const _facebookPage = () => {
		WebBrowser.openBrowserAsync("https://www.facebook.com/quiz4math");
	};

	const _researchPage = () => {
		WebBrowser.openBrowserAsync("https://forms.gle/zV6rT2wc1tKVjF9i6");
	};

	const subs = useCleanSubscriptions();

	useEffect(() => {
		if (quizState.isSuccess) {
			props.navigation.navigate("QuizSession", {
				sessionId: quizState.data.id,
			});
		}
	}, [quizState]);

	async function loadCourses() {
		try {
			const courses = await courseRepo.getUserCourses();
			setCourses(courses);
		} catch (err) {}
	}

	function loadSuggestions() {
		const sub = generatorRepo.generateSuggestions().subscribe();
		subs.push(sub);
	}

	function handleCourseClick(course: Course) {
		generateQuizFromCourse(course);
	}

	useEffect(() => {
		userRepo.getAuthData().then((data) => {
			setName(data.firstName ?? "");
		});

		loadCourses();
		loadSuggestions();
	}, []);

	const navigatorUni = useUniveristyLearnNavigator();
	const onUniveristyLearn = useCallback(() => {
		navigatorUni.navigateToUniveristyLearn();
	}, [navigatorUni]);

	return (
		<ScreenAvoidingView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<UserGreeting
					name={name}
					style={[styles.standardSpace, styles.marginTop]}
					onAvatarPress={() => props.navigation.navigate("Settings")}
				/>
				<Title
					style={[
						themeStyle.styles.text.textOnBackground,
						styles.standardSpace,
						{ marginTop: Dimens.spaces.large },
					]}
				>
					Διάλεξε Quiz και παίξε
				</Title>
				<CourseList
					courses={courses}
					style={[styles.courseCardList]}
					courseItemStyle={styles.courseCard}
					onPress={handleCourseClick}
				/>
				<Title
					style={[
						themeStyle.styles.text.textOnBackground,
						styles.standardSpace,
						{ marginTop: Dimens.spaces.large },
					]}
				>
					Περισσότερα
				</Title>
				<ScrollView
					showsHorizontalScrollIndicator={false}
					horizontal={true}
					style={styles.otherHeight}
				>
					<Card
						style={styles.courseCard}
						containerStyle={[{ flex: 1 }]}
						onPress={_researchPage}
					>
						<View style={{ flex: 1, alignItems: "center" }}>
							<Image
								source={require("../../assets/research.png")}
								style={{
									marginVertical: Dimens.spaces.xSmall,
									borderTopLeftRadius:
										themeStyles.theme.borderRadius,
									borderTopRightRadius:
										themeStyles.theme.borderRadius,
									maxWidth: "100%",
									maxHeight: "100%",
								}}
								resizeMode="contain"
							/>
						</View>
						<Title
							style={[
								styles.calculatePointsName,
								themeStyles.styles.text.textOnSurface,
								{ paddingBottom: Dimens.spaces.medium },
							]}
						>
							Απάντα στην έρευνα μας
						</Title>
					</Card>

					<Card
						style={styles.courseCard}
						containerStyle={[{ flex: 1 }]}
						onPress={onUniveristyLearn}
					>
						<View style={{ flex: 1, alignItems: "center" }}>
							<Image
								source={require("../../assets/uni.png")}
								style={{
									marginVertical: Dimens.spaces.xSmall,
									borderTopLeftRadius:
										themeStyles.theme.borderRadius,
									borderTopRightRadius:
										themeStyles.theme.borderRadius,
									maxWidth: "100%",
									maxHeight: "100%",
								}}
								resizeMode="contain"
							/>
						</View>
						<Title
							style={[
								styles.calculatePointsName,
								themeStyles.styles.text.textOnSurface,
								{ paddingBottom: Dimens.spaces.medium },
							]}
						>
							Τι θα σπουδάσω;
						</Title>
					</Card>
				</ScrollView>
			</ScrollView>
		</ScreenAvoidingView>
	);
};

export const HomeScreen = React.memo(homeScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 0,
		paddingRight: 0,
	},
	spinner: {
		marginTop: Dimens.spaces.large,
	},
	courseCardList: {
		height: hp("30%"),
	},
	suggestionImage: {
		height: hp("25%"),
	},
	suggestionItem: {
		width: wp("35%"),
		marginHorizontal: Dimens.spaces.small,
		marginVertical: Dimens.spaces.medium,
	},
	firstSuggestionItem: {
		marginLeft: Dimens.spaces.medium,
	},
	lastSuggestionItem: {
		marginRight: Dimens.spaces.medium,
	},
	courseCard: {
		flex: 1,
		marginHorizontal: Dimens.spaces.medium,
		marginVertical: Dimens.spaces.medium,
		width: wp("50%"),
	},
	standardSpace: {
		marginHorizontal: Dimens.spaces.medium,
	},
	marginTop: {
		marginTop: Dimens.spaces.medium,
	},
	calculatePointsName: {
		textAlign: "center",
		paddingVertical: Dimens.spaces.small,
		paddingHorizontal: Dimens.spaces.medium,
	},
	otherHeight: {
		height: hp("30"),
	},
});
