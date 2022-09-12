import React, { useContext } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Dimens } from '../../../../constants/Dimens';
import { Card } from '../../../Card/Card';
import { QuillView } from '../../../QuillView/QuillView';
import { ThemeContext } from '../../../ThemeProvider/ThemeProvider';

interface Props {
  body: string;
  style?: StyleProp<ViewStyle>;
}

const questionBody: React.FunctionComponent<Props> = (props) => {
  const themeStyle = useContext(ThemeContext).themeStyle;

  return (
    <Card style={[styles.card, props.style]}>
        <QuillView
          deltaOps={props.body}
          cssOptions={{ textColor: themeStyle.theme.colors.textColorOnSurface }}
        />
    </Card>
  );
};

export const QuestionBody = React.memo(questionBody);

const styles = StyleSheet.create({
  card: {
    padding: Dimens.spaces.medium,
  },
});
