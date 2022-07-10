import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { useColors } from '../ThemeProvider/ThemeProvider';
import { StyleProp, ViewStyle, TouchableOpacity } from 'react-native';

interface Props {
  value: boolean;
  size?: number;
  onValueChanged: (newValue: boolean) => void;
  disabled?: boolean;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const defaultSize = 32;

const checkBox: React.FunctionComponent<Props> = (props) => {
  const colors = useColors();
  const size = props.size ?? defaultSize;
  const color = props.color ?? colors.defaultIconColor;

  return (
    <TouchableOpacity
      onPress={() => props.onValueChanged(!props.value)}
      disabled={props.disabled}
      style={[props.style]}
    >
      <MaterialIcons
        size={size}
        color={color}
        name={props.value ? 'check-box' : 'check-box-outline-blank'}
      />
    </TouchableOpacity>
  );
};

export const CheckBox = React.memo(checkBox);
