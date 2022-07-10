import React, { useContext } from 'react';
import { ViewStyle, StyleProp, StyleSheet } from 'react-native';
import { ResourceOwner } from '../../../../models/ResourceOwner';
import { ThemeContext } from '../../../ThemeProvider/ThemeProvider';
import { Dimens } from '../../../../constants/Dimens';
import { Caption } from '../../../Typography/Caption';

interface Props {
  style?: StyleProp<ViewStyle>;
  resourceOwner?: ResourceOwner;
}

const resourceOwnerText: React.FunctionComponent<Props> = (props) => {
  const themeStyle = useContext(ThemeContext).themeStyle;

  return (
    <Caption
      style={[
        themeStyle.styles.text.secondaryTextOnBackground,
        styles.text,
        props.style,
      ]}
    >
      {props.resourceOwner?.name}
    </Caption>
  );
};

export const ResourceOwnerText = React.memo(resourceOwnerText);

const styles = StyleSheet.create({
  text: {
    padding: Dimens.spaces.medium,
    textAlign: 'right',
  },
});
