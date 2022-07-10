import React from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TextStyle,
} from 'react-native';
import { Headline } from '../Typography/Headline';
import { TextEmphasized } from '../Typography/TextEmphasized';
import { Button } from '../Button/Button';
import { useThemeStyle } from '../ThemeProvider/ThemeProvider';
import { Paragraph } from '../Typography/Paragraph';
import { Dimens } from '../../constants/Dimens';

const defaultTitle = 'Ωχ όχι, έχουμε κάποιο πρόβλημα!';
const defaultDescription =
  'Συγνώμη, κάτι πήγε στραβά και δεν μπορέσαμε να φορτώσουμε τα δεδομένα αυτήν τη στιγμή\n\nΠάτα το κουμπί για να προσπαθήσεις ξανά.';
const defaultActionText = 'Προσπάθησε ξανά';

interface Props {
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  title?: string;
  description?: string;
  actionText?: string;
  onPress?: () => void;
}

const errorView: React.FunctionComponent<Props> = (props) => {
  const themeStyle = useThemeStyle();
  const title = props.title ?? defaultTitle;
  const description = props.description ?? defaultDescription;
  const actionText = props.actionText ?? defaultActionText;

  const textOnBackground = themeStyle.styles.text.textOnBackground;
  return (
    <View style={[props.style]}>
      <Headline style={[textOnBackground, props.titleStyle]}>{title}</Headline>
      <Paragraph
        style={[styles.description, textOnBackground, props.descriptionStyle]}
      >
        {description}
      </Paragraph>
      <Button
        title={actionText}
        onPress={props.onPress}
        style={[styles.button, textOnBackground, props.buttonStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    marginTop: Dimens.spaces.medium,
  },
  button: {
    marginTop: Dimens.spaces.large,
  },
});

export const ErrorView = React.memo(errorView);
