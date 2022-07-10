import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useContext, useState } from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { zip } from "rxjs";
import { CorrectnessByCourseChartList } from "../components/CorrectnessByCourseChartList/CorrectnessByCourseChartList";
import { EngineContext } from "../components/EngineProvider/EngineProvider";
import { ScreenAvoidingView } from "../components/ScreenAvoidingView/ScreenAvoidingView";
import { ThemeContext } from "../components/ThemeProvider/ThemeProvider";
import { Title } from "../components/Typography/Title";
import { Dimens } from "../constants/Dimens";
import { CorrectnessByCourse } from "../models/CorrectnessByCourse";
import { useCleanSubscriptions } from "../utils/hooks";

interface Props2 {
	data?: { [key: string]: number };
	style?: StyleProp<ViewStyle>;
}
const totalByDayChart: React.FunctionComponent<Props2> = (props) => {
	const themeStyle = useContext(ThemeContext).themeStyle;

	if (!props.data) {
		return (
			<View style={[props.style]}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	const chartColors = themeStyle.theme.colors.components.lineChart;

	const keys = Object.keys(props.data);
	const data = {
		labels: keys.map((key) => key.substr(6) + "/" + key.substr(4, 2)),
		datasets: [
			{
				data: keys.map((key) => props.data![key]),
			},
		],
	};

	const style = StyleSheet.flatten(props.style);
	var { width, height, ...rest } = style ?? {};
	width = parseInt((width as string) ?? "0");
	height = parseInt((height as string) ?? "0");

	return (
		<LineChart
			data={data}
			width={width}
			height={height}
			chartConfig={{
				decimalPlaces: 0, // optional, defaults to 2dp
				backgroundGradientFrom: "#1E2923",
				backgroundGradientFromOpacity: 0,
				backgroundGradientTo: "#08130D",
				backgroundGradientToOpacity: 0,
				color: chartColors.color,
				labelColor: chartColors.labelColor,
				style: {
					borderRadius: 16,
				},
				propsForDots: {
					r: "4",
					strokeWidth: "0",
					stroke: "#ffa726",
				},
			}}
			style={rest}
			bezier
		/>
	);
};

const TotalByDayChart = React.memo(totalByDayChart);

const statisticsScreen: React.FunctionComponent = () => {
	const themeStyle = useContext(ThemeContext).themeStyle;
	const statsRepo = useContext(EngineContext).statisticsRepository;
	const subs = useCleanSubscriptions();
	const [totalByDayData, setTotalByDayData] = useState<{
		[key: string]: number;
	}>();
	const [correctnessByCourse, setCorrectnessByCourse] = useState<
		CorrectnessByCourse[] | undefined
	>();

	const fetchData = useCallback(() => {
		const observable1 = statsRepo.totalByDay();
		const observalbe2 = statsRepo.correctnessByCourse();

		const sub = observable1.subscribe((data) => {
			setTotalByDayData(data);
		});

		const sub2 = observalbe2.subscribe((data) => {
			setCorrectnessByCourse(data);
		});

		subs.push(sub);
		subs.push(sub2);

		return zip(observable1, observalbe2);
	}, []);

	const refreshData = useCallback(() => {
		const sub = fetchData().subscribe();

		subs.push(sub);
	}, [subs]);

	useFocusEffect(refreshData);

	const header = useCallback(() => {
		return (
			<View style={{ marginBottom: Dimens.spaces.large }}>
				<Title
					style={[
						themeStyle.styles.text.textOnBackground,
						styles.descriptionText,
					]}
				>
					Ερωτήσεις ανα μέρα
				</Title>

				<TotalByDayChart
					data={totalByDayData}
					style={[
						styles.chart,
						styles.chartMargin,
						{ backgroundColor: "transparent" },
					]}
				/>
			</View>
		);
	}, [totalByDayData, themeStyle]);

	return (
		<ScreenAvoidingView style={[styles.container]}>
			<CorrectnessByCourseChartList
				data={correctnessByCourse}
				header={header}
				chartStyle={styles.chart}
				style={styles.contentContainer}
			/>
		</ScreenAvoidingView>
	);
};

export const StatisticsScreen = React.memo(statisticsScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		padding: Dimens.spaces.medium,
	},
	descriptionText: {
		marginTop: 0,
	},
	chartMargin: {
		marginLeft: -Dimens.spaces.medium,
	},
	chart: {
		marginTop: Dimens.spaces.medium,
		width: wp("100%") - Dimens.spaces.medium * 2,
		height: 200,
	},
});
