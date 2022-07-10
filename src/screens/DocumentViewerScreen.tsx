import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { CenteredLoadingSpinner } from '../components/CenteredLoadingSpinner/CenteredLoadingSpinner';
import { useThemeStyle } from '../components/ThemeProvider/ThemeProvider';
import { Headline } from '../components/Typography/Headline';
import {
  NewErrorState, NewLoadingState, NewSuccessState, RequestState, StateType
} from '../services/API/ApiService';
import { useScreenInsets } from '../utils/hooks';

interface Route {
  params: { url: string; title: string };
}

interface Props {
  route: Route;
  navigation: any;
}

const ViewerURL = 'https://drive.google.com/viewerng/viewer?embedded=true&url=';

type State = RequestState<unknown>;

export const DocumentViewerScreen: React.FunctionComponent<Props> = (props) => {
  const [state, setState] = useState<State>(NewLoadingState());
  const insets = useScreenInsets();
  const themedStyles = useThemeStyle();
  const url = props.route.params.url;

  const endUrl = useMemo(() => {
    if (url.endsWith('.pdf')) {
      return ViewerURL + url;
    }

    return url;
  }, [url]);

  useEffect(() => {
    props.navigation.setOptions({
      title: props.route.params.title,
    });
  }, []);

  const loadingIndicator = useMemo(() => {
    switch (state.type) {
      case StateType.Loading:
        return <CenteredLoadingSpinner />;
      default:
        return null;
    }
  }, [state]);

  const webView = useMemo(() => {
    return (
      <WebView
        source={{ uri: endUrl }}
        style={[styles.webView, { opacity: state.isSuccess ? 1 : 0 }]}
        containerStyle={[{ flexGrow: 1 }]}
        javaScriptEnabled={true}
        cacheEnabled={false}
        cacheMode="LOAD_NO_CACHE"
        onLoadEnd={() => {
          setState(NewSuccessState({}));
        }}
        onError={() => {
          setState(NewErrorState({}));
        }}
        scalesPageToFit={true}
      />
    );
  }, [state]);

  return (
    <View
      style={[
        styles.container,
        themedStyles.styles.backgroundColor,
        { paddingBottom: insets.bottom },
      ]}
    >
      {webView}
      {loadingIndicator}
      {state.isErrored && (
        <Headline
          style={[styles.errorText, themedStyles.styles.text.textOnBackground]}
        >
          Κάτι πήγε λάθος
        </Headline>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  errorText: {
    alignSelf: 'center',
    textAlign: 'center',
  },
});
