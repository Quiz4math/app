import React, { PropsWithChildren } from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacityProperties,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';

import { useColors } from '../ThemeProvider/ThemeProvider';

const androidTouchable: React.FunctionComponent<PropsWithChildren<
  TouchableNativeFeedbackProps
>> = (props) => {
  const colors = useColors();
  const { style, ...rest } = props;

  return (
    <View style={[{ overflow: 'hidden' }, style]}>
      <TouchableNativeFeedback
        {...rest}
        background={TouchableNativeFeedback.Ripple(
          colors.components.button.ripple,
          false
        )}
      >
        {props.children}
      </TouchableNativeFeedback>
    </View>
  );
};

const AndroidTouchable = React.memo(androidTouchable);

const Elem: any = Platform.OS == 'ios' ? TouchableOpacity : AndroidTouchable;

interface Props
  extends PropsWithChildren<
    TouchableNativeFeedbackProps & TouchableOpacityProperties
  > {
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const touchable: React.FunctionComponent<Props> = (props) => {
  const { contentContainerStyle, ...rest } = props;

  return (
    <Elem {...rest}>
      <View style={[styles.contentContainer, contentContainerStyle]}>
        {props.children}
      </View>
    </Elem>
  );
};

const styles = StyleSheet.create({
  contentContainer: {},
});
export const Touchable = React.memo(touchable);
