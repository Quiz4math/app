import { Picker, PickerProps } from '@react-native-picker/picker';
import React, { PropsWithChildren } from 'react';
import {
  StyleProp, StyleSheet, View, ViewStyle
} from 'react-native';
import { Dimens } from '../../constants/Dimens';
import { Card } from '../Card/Card';

interface Props extends PropsWithChildren<PickerProps> {
  containerStyle?: StyleProp<ViewStyle>;
}

const select: React.FunctionComponent<Props> = (props) => {
  const { containerStyle, ...rest } = props;

  return (
    <Card style={[containerStyle]}>
      <View style={[styles.viewContainerStyle]}>
        <Picker {...rest}>{props.children}</Picker>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  viewContainerStyle: {
    padding: Dimens.spaces.xSmall,
  },
});
export const Select = React.memo(select);
