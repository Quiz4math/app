import { Course } from '../../models/Course';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import React from 'react';
import { Dimens } from '../../constants/Dimens';
import { useThemeStyle } from '../../components/ThemeProvider/ThemeProvider';
import { Headline } from '../../components/Typography/Headline';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Paragraph } from '../../components/Typography/Paragraph';
import { Title } from '../../components/Typography/Title';
import { Button } from '../../components/Button/Button';
import { StyleProp } from 'react-native';

import { SecondaryButton } from '../../components/Button/SecondaryButton';
import { Image } from 'react-native-expo-image-cache';
interface Props {
  course: Course;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onOldExamsPressed?: () => void;
}

const courseScreenHeader: React.FunctionComponent<Props> = (props) => {
  const themeStyle = useThemeStyle();
  const textStyles = themeStyle.styles.text;

  return (
    <View style={[styles.container, props.style]}>
      <Image
        uri={'https://quiz4math.gr/' + props.course.imageUrl}
        style={{
          height: hp('20%'),
        }}
        resizeMode="contain"
      />
      <Headline style={[textStyles.textOnBackground, styles.headline]}>
        {props.course.name}
      </Headline>
      <Paragraph style={[textStyles.secondaryTextOnBackground]}>
        {props.course.description}
      </Paragraph>
      <View style={[styles.countContainer]}>
        <View style={[styles.sideBySideContainer]}>
          <Title style={[textStyles.textOnBackground, styles.sideBySideText]}>
            {props.course.questionCount}
          </Title>
          <Paragraph
            style={[
              textStyles.secondaryTextOnBackground,
              styles.sideBySideText,
            ]}
          >
            Ερωτήσεις
          </Paragraph>
        </View>
        <View style={[styles.sideBySideContainer]}>
          <Title style={[textStyles.textOnBackground, styles.sideBySideText]}>
            {props.course.subchapterCount}
          </Title>
          <Paragraph
            style={[
              textStyles.secondaryTextOnBackground,
              styles.sideBySideText,
            ]}
          >
            Υποκεφάλαια
          </Paragraph>
        </View>
      </View>
      <Button
        style={[styles.quizButton]}
        title="Κάνε quiz για το μάθημα"
        onPress={props.onPress}
      />
      <SecondaryButton
        style={[styles.oldExamsButton]}
        title="Παλαιά θέματα"
        onPress={props.onOldExamsPressed}
      />
    </View>
  );
};

export const CourseScreenHeader = React.memo(courseScreenHeader);

const styles = StyleSheet.create({
  container: {},
  headline: {
    marginVertical: Dimens.spaces.medium,
  },
  countContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: Dimens.spaces.large,
    alignItems: 'flex-start',
  },
  sideBySideContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  sideBySideText: {
    textAlign: 'center',
  },
  quizButton: {
    marginTop: Dimens.spaces.medium,
  },
  oldExamsButton: {
    marginTop: Dimens.spaces.small,
  },
});
