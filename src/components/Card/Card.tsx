import React, { ReactNode, useContext, useMemo } from 'react';
import { ViewStyle, StyleProp, StyleSheet, View } from 'react-native';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import { Touchable } from '../Touchable/Touchable';

interface Props {
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  touchableStyle?: StyleProp<ViewStyle>;
  children?: ReactNode;
  onPress?: () => void;
  clickable?: boolean;
}

const card: React.FunctionComponent<Props> = (props) => {
  const theme = useContext(ThemeContext).themeStyle.theme;

  const isTouchable = props.onPress != undefined || props.clickable;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surfaceColor,
          borderRadius: theme.borderRadius,
        },
        props.style,
      ]}
    >
      <Touchable
        style={[
          { borderRadius: theme.borderRadius },
          styles.ripple,
          props.touchableStyle,
        ]}
        onPress={() => props.onPress?.()}
        contentContainerStyle={[styles.container, props.containerStyle]}
        disabled={!isTouchable}
      >
        {props.children}
      </Touchable>
    </View>
  );
};

export const Card = React.memo(card);

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ripple: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  container: {},
});
