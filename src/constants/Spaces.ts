import { rv } from '../utils/responsive';
import { Platform } from 'react-native';

export const Spaces = {
  xSmall: rv(4),
  small: rv(8),
  platformSMedium: Platform.OS == 'ios' ? rv(12) : rv(8),
  sMedimum: rv(12),
  medium: rv(16),
  large: rv(32),
  xLarge: rv(48),
  xxLarge: rv(72),
  screen: rv(16),
  textInputPadding: rv(16),
};
