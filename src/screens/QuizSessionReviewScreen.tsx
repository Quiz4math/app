import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ExplanationView } from '../components/QuestionView/QuestionDetails/shared/ExplanationView';
import { QuestionView } from '../components/QuestionView/QuestionView';
import { VerticalSpaceMedium } from '../components/Space/Space';
import { ThemeContext } from '../components/ThemeProvider/ThemeProvider';
import { Dimens } from '../constants/Dimens';
import { UserAnswer } from '../models/UserAnswer';

interface Route {
  params: { userAnswers: UserAnswer[] };
}

interface Props {
  route: Route;
  navigation: any;
}

interface CarouselProps {
  userAnswers: UserAnswer[];
  onSnapToItem?: (index: number) => void;
}

interface EntryProps {
  userAnswer: UserAnswer;
}

const questionEntry: React.FunctionComponent<EntryProps> = (props) => {
  const themeStyle = useContext(ThemeContext).themeStyle;
  return (
    <ScrollView
      contentContainerStyle={[
        { paddingBottom: Dimens.spaces.medium },
        { paddingHorizontal: Dimens.spaces.small },
        themeStyle.styles.backgroundColor,
      ]}
      horizontal={false}
    >
      <VerticalSpaceMedium />

      <QuestionView
        question={props.userAnswer.question}
        explanation={props.userAnswer}
        isReadOnly={true}
      />
      <ExplanationView explanation={props.userAnswer} />
    </ScrollView>
  );
};

const QuestionEntry = React.memo(questionEntry);

const questionCarousel: React.FunctionComponent<CarouselProps> = (props) => {
  return (
    <Carousel
      data={props.userAnswers}
      renderItem={(item: any) => {
        const userAnswer: UserAnswer = item.item;
        return <QuestionEntry userAnswer={userAnswer} />;
      }}
      layout={'default'}
      sliderWidth={wp('100%')}
      itemWidth={wp('95%')}
      style={[{ padding: 0, margin: 0 }]}
      keyExtractor={(userAnswer: UserAnswer, index: number) =>
        String(userAnswer?.id ?? index - 1000)
      }
      windowSize={4}
      onSnapToItem={props.onSnapToItem}
    />
  );
};

const QuestionCarousel = React.memo(questionCarousel);

export const QuizSessionReviewScreen: React.FunctionComponent<Props> = (props) => {
  const themeStyle = useContext(ThemeContext).themeStyle;
  const userAnswers = props.route.params.userAnswers;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <QuestionCarousel userAnswers={userAnswers} onSnapToItem={setActiveIndex} />
      <View style={[styles.pagination]}>
        <Pagination
          dotsLength={userAnswers.length}
          activeDotIndex={activeIndex}
          containerStyle={[{ backgroundColor: 'transparent' }]}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: themeStyle.theme.colors.components.pagination.activeDot,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagination: {
    marginHorizontal: Dimens.spaces.large,
  },
  space: {
    height: Dimens.spaces.medium,
  },
});
