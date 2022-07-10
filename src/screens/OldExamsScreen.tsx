import { Octicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback, useEffect } from "react";
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Card } from "../components/Card/Card";
import { Space } from "../components/Space/Space";
import {
  useColors,
  useStyles
} from "../components/ThemeProvider/ThemeProvider";
import { Headline } from "../components/Typography/Headline";
import { TextEmphasized } from "../components/Typography/TextEmphasized";
import { Dimens } from "../constants/Dimens";
import { Course } from "../models/Course";
interface Route {
	params: { course: Course };
}

interface Props {
	route: Route;
	navigation: any;
}

function generateUrlForYear(course: Course, year: string) {
	return `https://beta.quiz4math.gr/assets/old-exams-pdf/${course.id}/${year}.pdf`;
}

const years = [
	"2020",
	"2019",
	"2018",
	"2017",
	"2016",
	"2015",
	"2014",
	"2013",
	"2012",
	"2011",
	"2010",
];

interface YearsListProps {
	years: string[];
	onYearPress?: (year: string) => void;
	style?: StyleProp<ViewStyle>;
}

const yearsList: React.FunctionComponent<YearsListProps> = (props) => {
	const themedStyles = useStyles();
	const colors = useColors();

	return (
		<FlatList
			data={props.years}
			bounces={true}
			renderItem={(item) => {
				const year = item.item;
				return (
					<Card
						style={[styles.yearItem]}
						containerStyle={styles.yearItemContainer}
						key={year}
						onPress={() => props.onYearPress?.(year)}
					>
						<TextEmphasized
							style={[
								{ flexGrow: 1 },
								themedStyles.text.textOnSurface,
							]}
						>
							{year}
						</TextEmphasized>
						<Octicons
							name="chevron-right"
							size={24}
							color={colors.defaultIconColor}
						/>
					</Card>
				);
			}}
			keyExtractor={(item, index) => item}
			contentContainerStyle={[styles.contentContainer]}
			style={props.style}
			ListHeaderComponent={() => {
				return (
					<>
						<Headline
							style={[
								themedStyles.text.textOnBackground,
								styles.headline,
							]}
						>
							Πανελαδικά θέματα
						</Headline>
					</>
				);
			}}
		/>
	);
};

const YearsList = React.memo(yearsList);

const oldExamsScreen: React.FunctionComponent<Props> = (props) => {
	const themedStyles = useStyles();
	const course = props.route.params.course;

	useEffect(() => {
		props.navigation.setOptions({
			title: course.name,
		});
	}, []);

	const onYearClicked = useCallback((year: string) => {
		WebBrowser.openBrowserAsync(generateUrlForYear(course, year));
	}, []);

	return (
		<View style={[themedStyles.backgroundColor, styles.container]}>
			<YearsList years={years} onYearPress={onYearClicked} />
			<Space style={{ marginBottom: Dimens.spaces.medium }} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headline: {
		marginVertical: Dimens.spaces.medium,
	},
	yearItem: {
		marginVertical: Dimens.spaces.medium,
	},
	yearItemContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: Dimens.spaces.medium,
	},
	contentContainer: {
		paddingHorizontal: Dimens.spaces.medium,
	},
});

export const OldExamsScreen = React.memo(oldExamsScreen);
