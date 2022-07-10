import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { CorrectnessByCourse } from '../../models/CorrectnessByCourse';
import { CourseCorrectnessChart } from './CourseCorrectnessChart';
import { Dimens } from '../../constants/Dimens';

interface Props {
  style?: StyleProp<ViewStyle>;
  data?: CorrectnessByCourse[];
  chartStyle?: StyleProp<ViewStyle>;
  header?: () => any;
}

const correctnessByCourseChartList: React.FunctionComponent<Props> = (
  props
) => {
  if (!props.data) {
    return (
      <View style={[props.style]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={props.data}
      renderItem={(item) => (
        <CourseCorrectnessChart
          data={item.item}
          chartStyle={props.chartStyle}
          textStyle={{ marginVertical: Dimens.spaces.small }}
        />
      )}
      keyExtractor={(_, index) => index.toString()}
      ListHeaderComponent={props.header}
      contentContainerStyle={[props.style]}
    />
  );
};

export const CorrectnessByCourseChartList = React.memo(
  correctnessByCourseChartList
);

const styles = StyleSheet.create({});
