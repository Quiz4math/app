export function errorCallbackComeBack(
  navigation: any,
  currentScreen: string,
  params?: any
) {
  return () => navigation.replace(currentScreen, params);
}
