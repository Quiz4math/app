import React, { useContext } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Dimens } from '../../../../constants/Dimens';
import { UserAnswer } from '../../../../models/UserAnswer';
import { Card } from '../../../Card/Card';
import { QuillView } from '../../../QuillView/QuillView';
import { ThemeContext } from '../../../ThemeProvider/ThemeProvider';
import { Title } from '../../../Typography/Title';

interface Props {
  explanation: UserAnswer;
  style?: StyleProp<ViewStyle>;
  cardStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  onLoadEnd?: () => void;
}

const explanationView: React.FunctionComponent<Props> = (props) => {
  const themeStyle = useContext(ThemeContext).themeStyle;
  return (
    <View style={[props.style]}>
      <Title style={[styles.title, themeStyle.styles.text.textOnBackground]}>
        Επεξήγηση
      </Title>
      <Card containerStyle={[styles.card, props.cardStyle]}>
        <QuillView
          deltaOps={props.explanation.correctAnswer.explanation}
          cssOptions={{ textColor: themeStyle.theme.colors.textColorOnSurface }}
          onLoadEnd={props.onLoadEnd}
        />
        {props.children}
      </Card>
    </View>
  );
};

export const ExplanationView = React.memo(explanationView);

const styles = StyleSheet.create({
  card: {
    padding: Dimens.spaces.medium,
  },
  title: {
    marginTop: Dimens.spaces.medium,
    paddingVertical: Dimens.spaces.medium,
  },
});
