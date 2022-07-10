import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export function rp(percent: number) {
  return RFPercentage(percent);
}

export function rv(value: number, standardScreenHeight = 680) {
  return RFValue(value, standardScreenHeight);
}
