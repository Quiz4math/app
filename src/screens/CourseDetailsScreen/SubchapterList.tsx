import { Subchapter } from '../../models/Course';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  ViewStyle,
  StyleProp,
  StyleSheet,
  View,
  ListRenderItemInfo,
} from 'react-native';
import { Card } from '../../components/Card/Card';
import { TextEmphasized } from '../../components/Typography/TextEmphasized';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Paragraph } from '../../components/Typography/Paragraph';
import { Dimens } from '../../constants/Dimens';
import {
  useThemeStyle,
  useColors,
} from '../../components/ThemeProvider/ThemeProvider';
import { ChipButton } from '../../components/Button/ChipButton';
import {
  RequestState,
  NewDefaultState,
  StateType,
} from '../../services/API/ApiService';
import { Image } from 'react-native-expo-image-cache';
import { useCourseRepo } from '../../components/EngineProvider/EngineProvider';
import { useEffectCleanSubs } from '../../utils/hooks';
import { Feather } from '@expo/vector-icons';
import { Button } from '../../components/Button/Button';
import { ButtonProps } from '../../components/Button/TextButton';

interface Props {
  subchapters: Subchapter[];
  style?: StyleProp<ViewStyle>;
  onSubchapterPress?: (subchapter: Subchapter) => void;
  imageUrl?: string;
  paddingHorizontal?: StyleProp<ViewStyle>;
  onPressTaught?: (subchapter: Subchapter) => void;
}

interface SubchapterItemProps {
  subchapter: Subchapter;
  style?: StyleProp<ViewStyle>;
  onPress?: (subchapter: Subchapter) => void;
  onPressTaught?: (subchapter: Subchapter) => void;
  imageUrl?: string;
}

type TaughtState = RequestState<void>;
type TaughtFn = (
  subchapter: Subchapter,
  onChange?: (s: TaughtState) => void
) => void;

function useSetTaughtSubchapter(): [TaughtState, TaughtFn] {
  const [state, setState] = useState<TaughtState>(NewDefaultState());
  const repo = useCourseRepo();
  const subs = useEffectCleanSubs();

  const toggle = useCallback(
    (subchapter: Subchapter, onChange?: (state: TaughtState) => void) => {
      const sub = repo
        .setSubchaptersTaught(!subchapter.isTaught, [subchapter.id])
        .subscribe((s) => {
          onChange?.(s);
          setState(s);
        });

      subs.push(sub);
    },
    [state]
  );

  return [state, toggle];
}

const subchapterItem: React.FunctionComponent<SubchapterItemProps> = (
  props
) => {
  const colors = useColors();
  const [state, toggle] = useSetTaughtSubchapter();
  const textStyle = useThemeStyle().styles.text;
  const subchapter = props.subchapter;

  let buttonProps: ButtonProps;

  function onPressTaught(subchapter: Subchapter) {
    toggle(subchapter, (updatedState) => {
      if (updatedState.isSuccess) {
        subchapter.isTaught = !subchapter.isTaught;
      }
    });
  }

  if (!state.isLoading) {
    if (subchapter.isTaught) {
      buttonProps = {
        title: 'Επελεγμένο στην ύλη',
        style: [itemStyle.chipButton],
        onPress: () => onPressTaught(props.subchapter),
        rightView: () => (
          <Feather
            name="check"
            size={20}
            color={colors.defaultIconColor}
            style={itemStyle.tick}
          />
        ),
      };
    } else {
      buttonProps = {
        title: 'Πρόσθεσέ το στην ύλη σου',
        style: [itemStyle.chipButton],
        onPress: () => onPressTaught(props.subchapter),
      };
    }
  } else if (state.isLoading) {
    buttonProps = {
      title: 'Πρόσθεσέ το στην ύλη σου',
      style: [itemStyle.chipButton],
      loading: true,
    };
  }

  return (
    <Card style={[props.style]} containerStyle={{ flex: 1 }}>
      <View style={[itemStyle.cardContainer]}>
        <Image
          uri={'https://quiz4math.gr/' + props.imageUrl}
          style={{
            height: hp('20%'),
          }}
          resizeMode="stretch"
        />
        <View style={[itemStyle.container]}>
          <View style={itemStyle.textContainer}>
            <TextEmphasized style={[textStyle.textOnSurface]}>
              {props.subchapter.name}
            </TextEmphasized>
            <Paragraph
              style={[itemStyle.description, textStyle.secondaryTextOnSurface]}
            >
              {props.subchapter.description}
            </Paragraph>
          </View>
          <ChipButton {...buttonProps!} />
          <Button
            title="Κάνε quiz"
            onPress={() => props.onPress?.(props.subchapter)}
            style={[itemStyle.button]}
            contentContainerStyle={[itemStyle.buttonContainer]}
          />
        </View>
      </View>
    </Card>
  );
};

const SubchapterItem = React.memo(subchapterItem);

const subchapterList: React.FunctionComponent<Props> = (props) => {
  const renderItem = useCallback(
    (info: ListRenderItemInfo<Subchapter>) => {
      const subchapter = info.item;

      return (
        <SubchapterItem
          subchapter={subchapter}
          imageUrl={props.imageUrl}
          onPress={props.onSubchapterPress}
          style={[styles.item]}
          onPressTaught={props.onPressTaught}
        />
      );
    },
    [props.onSubchapterPress, props.onPressTaught]
  );

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={props.subchapters}
      bounces={true}
      renderItem={renderItem}
      contentContainerStyle={[props.style, styles.contentContainer]}
      keyExtractor={(c, index) => String(c.id)}
      extraData={props.onSubchapterPress}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: Dimens.spaces.medium,
    marginVertical: Dimens.spaces.medium,
    width: wp('60%'),
  },
  contentContainer: {},
});

const itemStyle = StyleSheet.create({
  container: {
    padding: Dimens.spaces.medium,
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  description: {
    marginTop: Dimens.spaces.medium,
  },
  cardContainer: {
    flex: 1,
  },
  chipButton: {
    marginTop: Dimens.spaces.medium,
    maxWidth: '100%',
    width: '100%',
  },
  tick: {
    marginLeft: Dimens.spaces.small,
  },
  button: {
    marginTop: Dimens.spaces.small,
  },
  buttonContainer: {
    padding: Dimens.spaces.platformSMedium,
  },
});

export const SubchapterList = React.memo(subchapterList);
