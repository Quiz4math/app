import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, StatusBar, ViewStyle } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Observable, Subscription } from 'rxjs';
import { NewDefaultState, RequestState } from '../services/API/ApiService';

export function useCleanSubscriptions(): Subscription[] {
  const subscriptions = useRef<Subscription[]>([]).current;

  const focusEffectCallback = useCallback(() => {
    return () => {
      subscriptions.forEach((sub) => sub?.unsubscribe());
    };
  }, []);

  useFocusEffect(focusEffectCallback);

  return subscriptions;
}

export function useData<T>(
  fn: () => Observable<RequestState<T>>
): [RequestState<T>, () => void] {
  const [state, setState] = useState<RequestState<T>>(NewDefaultState());
  const subs = useEffectCleanSubs();

  const fetch = useCallback(() => {
    const sub = fn().subscribe(setState);
    subs.push(sub);
  }, [fn]);

  return [state, fetch];
}

export function useEffectCleanSubs(): Subscription[] {
  const subscriptions = useRef<Subscription[]>([]).current;

  useEffect(() => {
    return () => {
      subscriptions.forEach((sub) => sub?.unsubscribe());
    };
  }, []);

  return subscriptions;
}

export function useBottomPadding(): ViewStyle {
  const insets = useSafeAreaInsets();

  return { paddingBottom: insets.bottom };
}

export function useScreenInsets(): EdgeInsets {
  const insets = useSafeAreaInsets();

  if (Platform.OS == 'ios') {
    return insets;
  }

  return { top: StatusBar.currentHeight ?? 0, bottom: 0, left: 0, right: 0 };
}
