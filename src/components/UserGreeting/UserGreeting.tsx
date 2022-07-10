import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ColorPropType,
  TouchableOpacity,
} from 'react-native';
import { Title } from '../Typography/Title';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import { TextEmphasized } from '../Typography/TextEmphasized';
import { AntDesign } from '@expo/vector-icons';

interface Props {
  name?: string;
  style?: StyleProp<ViewStyle>;
  onAvatarPress?: () => void;
}

const userGreeting: React.FunctionComponent<Props> = (props) => {
  const themeStyle = useContext(ThemeContext).themeStyle;

  return (
    <View style={[styles.topSectionContainer, props.style]}>
      <View style={[styles.nameContainer]}>
        <TextEmphasized
          style={[themeStyle.styles.text.secondaryTextOnBackground]}
        >
          Γεια σου
        </TextEmphasized>
        <Title style={[themeStyle.styles.text.textOnBackground]}>
          {props.name}
        </Title>
      </View>
      <TouchableOpacity
        onPress={props.onAvatarPress}
        hitSlop={{ top: 48, bottom: 48, right: 48, left: 48 }}
      >
        <AntDesign
          name="setting"
          size={28}
          color={themeStyle.theme.colors.defaultIconColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export const UserGreeting = React.memo(userGreeting);

const styles = StyleSheet.create({
  nameContainer: {
    flex: 1,
  },
  topSectionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
