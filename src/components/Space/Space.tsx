import { View } from 'react-native';
import { Dimens } from '../../constants/Dimens';
import React from 'react';

export const Space = View;

export const VerticalSpaceMedium = React.memo(() => (
  <View style={{ height: Dimens.spaces.medium }} />
));

export const VerticalSpaceLarge = React.memo(() => (
  <View style={{ height: Dimens.spaces.large }} />
));
