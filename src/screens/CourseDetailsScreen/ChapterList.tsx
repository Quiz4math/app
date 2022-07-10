import React, { useCallback } from 'react';
import { Chapter, Subchapter } from '../../models/Course';
import {
  FlatList,
  ViewStyle,
  StyleProp,
  StyleSheet,
  View,
  ListRenderItemInfo,
} from 'react-native';
import { Title } from '../../components/Typography/Title';
import { useThemeStyle } from '../../components/ThemeProvider/ThemeProvider';
import { Dimens } from '../../constants/Dimens';
import { SubchapterList } from './SubchapterList';

interface Props {
  chapters: Chapter[];
  style?: StyleProp<ViewStyle>;
  onSubchapterPress?: (subchapter: Subchapter) => void;
  onPressTaught?: (subchapter: Subchapter) => void;
  header?: () => React.ReactElement;
  paddingHorizontal?: StyleProp<ViewStyle>;
}

interface ChapterItemProps {
  chapter: Chapter;
  style?: StyleProp<ViewStyle>;
  paddingHorizontal?: StyleProp<ViewStyle>;
  onSubchapterPress?: (subchapter: Subchapter) => void;
  onPressTaught?: (subchapter: Subchapter) => void;
}

const chapterItem: React.FunctionComponent<ChapterItemProps> = (props) => {
  const themeStyle = useThemeStyle();
  const textStyles = themeStyle.styles.text;

  return (
    <View style={[props.style]}>
      <Title style={[textStyles.textOnBackground, props.paddingHorizontal]}>
        {props.chapter.name}
      </Title>

      <SubchapterList
        subchapters={props.chapter.subchapters ?? []}
        style={[styles.subchapterList]}
        imageUrl={props.chapter.imageUrl}
        onPressTaught={props.onPressTaught}
        onSubchapterPress={props.onSubchapterPress}
      />
    </View>
  );
};

const ChapterItem = React.memo(chapterItem);

const chapterList: React.FunctionComponent<Props> = (props) => {
  const renderItem = useCallback(
    (info: ListRenderItemInfo<Chapter>) => {
      const chapter = info.item;

      return (
        <ChapterItem
          style={[styles.chapterItem]}
          chapter={chapter}
          paddingHorizontal={props.paddingHorizontal}
          onSubchapterPress={props.onSubchapterPress}
          onPressTaught={props.onPressTaught}
        />
      );
    },
    [props.onSubchapterPress, props.onPressTaught, props.paddingHorizontal]
  );

  return (
    <FlatList
      data={props.chapters}
      bounces={true}
      renderItem={renderItem}
      ListHeaderComponent={props.header}
      keyExtractor={(c, index) => String(c.id)}
      contentContainerStyle={[props.style]}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  chapterItem: {
    marginVertical: Dimens.spaces.medium,
  },
  subchapterList: {},
});

export const ChapterList = React.memo(chapterList);
