import React from 'react';
import { FlatList, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Course } from '../../models/Course';
import { CourseCard } from '../CourseCard/CourseCard';
import { Dimens } from '../../constants/Dimens';

interface Props {
  courses?: (Course | undefined)[];
  onPress?: (course: Course) => void;
  style?: StyleProp<ViewStyle>;
  courseItemStyle?: StyleProp<ViewStyle>;
}

const courseList: React.FunctionComponent<Props> = (props) => {
  const courses = props.courses ?? [undefined, undefined, undefined];

  return (
    <FlatList
      horizontal={true}
      data={courses}
      contentContainerStyle={{ flexDirection: 'row' }}
      showsHorizontalScrollIndicator={false}
      bounces={true}
      renderItem={({ item }) => (
        <CourseCard
          style={[props.courseItemStyle]}
          course={item}
          onPress={props.onPress}
        />
      )}
      keyExtractor={(c, index) => String(c?.id ?? index - 1000)}
      extraData={props.onPress}
      style={[props.style]}
    />
  );
};

const styles = StyleSheet.create({});

export const CourseList = React.memo(courseList);
