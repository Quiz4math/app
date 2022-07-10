import React, { useContext } from 'react';
import {
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
  View,
} from 'react-native';
import { CorrectnessByCourse } from '../../models/CorrectnessByCourse';
import { Title } from '../Typography/Title';
import { PieChart } from 'react-native-chart-kit';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';

interface Props {
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  chartStyle?: StyleProp<ViewStyle>;
  data: CorrectnessByCourse;
}

const courseCorrectness: React.FunctionComponent<Props> = (props) => {
  const themeStyle = useContext(ThemeContext).themeStyle;
  const pieChartColors = themeStyle.theme.colors.components.correctnessByCourse;

  const chartData = [
    {
      name: 'Σωστές',
      count: props.data.courseData.correctCount,
      color: pieChartColors.correctColor,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Λάθος',
      count: props.data.courseData.wrongCount,
      color: pieChartColors.incorrectColor,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  if (
    props.data.courseData.wrongCount == 0 &&
    props.data.courseData.correctCount == 0
  ) {
    return null;
  }

  const style = StyleSheet.flatten(props.chartStyle);
  var { width, height } = style ?? {};
  width = parseInt((width as string) ?? '0');
  height = parseInt((height as string) ?? '0');

  const chartColors = themeStyle.theme.colors.components.lineChart;

  return (
    <View style={[props.style]}>
      <Title style={[props.textStyle, themeStyle.styles.text.textOnBackground]}>
        {props.data.courseName}
      </Title>
      <PieChart
        data={chartData}
        width={width}
        height={height}
        chartConfig={{
          decimalPlaces: 0, // optional, defaults to 2dp
          color: chartColors.color,
          labelColor: chartColors.labelColor,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="count"
        backgroundColor="transparent"
        paddingLeft="0"
        absolute
      />
    </View>
  );
};

export const CourseCorrectnessChart = React.memo(courseCorrectness);
