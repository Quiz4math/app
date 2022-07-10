import { Octicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useCoursesNavigator } from "../../Navigators";
import { Card } from "../components/Card/Card";
import { CenteredLoadingSpinner } from "../components/CenteredLoadingSpinner/CenteredLoadingSpinner";
import { useCourseRepo } from "../components/EngineProvider/EngineProvider";
import { ErrorView } from "../components/ErrorView/ErrorView";
import { ScreenAvoidingView } from "../components/ScreenAvoidingView/ScreenAvoidingView";
import { useThemeStyle } from "../components/ThemeProvider/ThemeProvider";
import { TextEmphasized } from "../components/Typography/TextEmphasized";
import { Dimens } from "../constants/Dimens";
import { Course } from "../models/Course";
import {
  NewDefaultState,
  RequestState,
  StateType
} from "../services/API/ApiService";
import { useEffectCleanSubs } from "../utils/hooks";

type CoursesState = RequestState<Course[]>;
type FetchFn = () => void;

function useCourses(): [CoursesState, FetchFn] {
	const [state, setState] = useState<CoursesState>(NewDefaultState());

	const subs = useEffectCleanSubs();
	const repo = useCourseRepo();

	const fetchCourses = useCallback(() => {
		const sub = repo.getCourses().subscribe(setState);
		subs.push(sub);
	}, [setState]);

	return [state, fetchCourses];
}

interface CourseListProps {
	style?: StyleProp<ViewStyle>;
	courses: Course[];
	onPress?: (course: Course) => void;
}

const coursesList: React.FunctionComponent<CourseListProps> = (props) => {
	const themeStyle = useThemeStyle();

	return (
		<FlatList
			data={props.courses}
			bounces={true}
			renderItem={({ item }) => (
				<Card
					style={[styles.courseItem]}
					containerStyle={styles.courseItemContainer}
					key={String(item.id)}
					onPress={() => props.onPress?.(item)}
				>
					<TextEmphasized
						style={[
							{ flex: 1 },
							themeStyle.styles.text.textOnSurface,
						]}
					>
						{item.name}
					</TextEmphasized>
					<Octicons
						name="chevron-right"
						size={24}
						color={themeStyle.theme.colors.defaultIconColor}
					/>
				</Card>
			)}
			contentContainerStyle={styles.courseListContainer}
			keyExtractor={(c, index) => String(c.id)}
			extraData={props.onPress}
			style={[props.style]}
		/>
	);
};

const CoursesList = React.memo(coursesList);

const coursesScreen: React.FunctionComponent = () => {
	const navigator = useCoursesNavigator();
	const [state, fetchCourses] = useCourses();

	useEffect(() => {
		fetchCourses();
	}, []);

	let innerView: JSX.Element | undefined;

	const onCoursePress = useCallback(
		(course: Course) => {
			navigator.navigateToCourse(course);
		},
		[navigator]
	);

	switch (state.type) {
		case StateType.Success:
			innerView = (
				<CoursesList
					style={[styles.courseList]}
					courses={state.data}
					onPress={onCoursePress}
				/>
			);
			break;
		case StateType.Loading:
			innerView = <CenteredLoadingSpinner />;
			break;
		case StateType.Error:
			innerView = (
				<ErrorView onPress={fetchCourses} style={styles.error} />
			);
			break;
	}

	return <ScreenAvoidingView>{innerView}</ScreenAvoidingView>;
};

export const CoursesScreen = React.memo(coursesScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	courseList: {
		flex: 1,
	},
	courseItem: {
		marginVertical: Dimens.spaces.medium,
	},
	courseItemContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: Dimens.spaces.medium,
	},
	courseListContainer: {
		padding: Dimens.spaces.screen,
	},
	error: {
		margin: Dimens.spaces.screen,
	},
	headline: {
		marginBottom: Dimens.spaces.medium,
	},
});
