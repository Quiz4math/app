import React, { useContext, ReactNode } from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
  TextStyle,
  Platform,
  View,
} from 'react-native';

import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import { Dimens } from '../../constants/Dimens';
import { ButtonColors } from '../../constants/Colors';
import { TextEmphasized } from '../Typography/TextEmphasized';
import { Touchable } from '../Touchable/Touchable';

export interface ButtonProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  rightView?: () => JSX.Element | undefined;
  leftView?: () => JSX.Element | undefined;
  loadingIndicatorColor?: string;
}

function innerView(props: ButtonProps, colors: ButtonColors): ReactNode {
  return (
    <View style={{ display: 'flex', flexGrow: 1 }}>
      <TextEmphasized
        style={[
          { color: colors.textButtonText },
          styles.text,
          props.textStyle,
          { opacity: props.loading ? 0 : 1 },
        ]}
      >
        {props.title}
      </TextEmphasized>
    </View>
  );
}

const textButton: React.FunctionComponent<ButtonProps> = (props) => {
  const newProps = {
    ...props,
    disabled: props.disabled ? true : props.loading,
  };

  const colors = useContext(ThemeContext).themeStyle.theme.colors.components
    .button;
  return (
    <Touchable
      onPress={props.onPress}
      disabled={newProps.disabled}
      style={[
        styles.touchable,
        props.style,
        { opacity: newProps.disabled ? 0.5 : 1 },
      ]}
      contentContainerStyle={[
        styles.touchableContainer,
        props.contentContainerStyle,
      ]}
    >
      {props.leftView?.()}
      {innerView(newProps, colors)}
      {props.rightView?.()}
      {props.loading && (
        <View style={styles.loadingIndicatorContainer}>
          <ActivityIndicator
            size="small"
            color={props.loadingIndicatorColor ?? colors.activityIndicator}
          />
        </View>
      )}
    </Touchable>
  );
};

export const TextButton = React.memo(textButton);

const styles = StyleSheet.create({
  touchableContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding:
      Platform.OS == 'ios' ? Dimens.spaces.medium : Dimens.spaces.sMedimum,
  },
  touchable: {
    display: 'flex',
    overflow: 'hidden',
    borderRadius: 12,
  },
  text: {
    textAlign: 'center',
  },
  loadingIndicatorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
