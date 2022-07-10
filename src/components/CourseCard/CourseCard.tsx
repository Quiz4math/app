import React, { useContext } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { Dimens } from '../../constants/Dimens';
import { Course } from '../../models/Course';
import { Card } from '../Card/Card';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import { Title } from '../Typography/Title';

interface Props {
  course?: Course;
  style?: StyleProp<ViewStyle>;
  onPress?: (course: Course) => void;
}

const courseCard: React.FunctionComponent<Props> = (props) => {
  const themeStyles = useContext(ThemeContext).themeStyle;

  if (!props.course) {
    return (
      <Card style={[props.style]}>
        <View
          style={[
            { flex: 1, overflow: 'hidden' },
            themeStyles.styles.borderRadius,
          ]}
        >
        </View>
      </Card>
    );
  }

  return (
    <Card
      style={[styles.courseCard, props.style]}
      containerStyle={{ flex: 1 }}
      onPress={() => props.onPress?.(props.course!)}
    >
      <Image
        uri={'https://quiz4math.gr/' + props.course.imageUrl}
        style={{
          flex: 1,
          borderTopLeftRadius: themeStyles.theme.borderRadius,
          borderTopRightRadius: themeStyles.theme.borderRadius,
        }}
        resizeMode="contain"
      />

      <Title style={[styles.courseName, themeStyles.styles.text.textOnSurface]}>
        {props.course?.name}
      </Title>
    </Card>
  );
};

const styles = StyleSheet.create({
  courseCard: {},
  placeHolderCard: {},
  placeHolderMedia: {
    height: '50%',
    width: '100%',
  },
  horizontalSpace: {
    marginHorizontal: Dimens.spaces.medium,
  },
  firstLine: {
    marginTop: Dimens.spaces.medium,
  },
  courseName: {
    textAlign: 'center',
    paddingBottom: Dimens.spaces.medium,
  },
});

export const CourseCard = React.memo(courseCard);
