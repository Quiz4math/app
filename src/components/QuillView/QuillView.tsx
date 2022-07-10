import React, { useState, useMemo, useCallback, useRef } from 'react';
import { View, ViewStyle, StyleProp, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

interface CSSOptions {
  padding?: number;
  fontSize?: number;
  textColor?: number | string;
}

interface Props {
  style?: StyleProp<ViewStyle>;
  webViewStyle?: StyleProp<ViewStyle>;
  deltaOps: string;
  cssOptions?: CSSOptions;
  onLoadEnd?: () => void;
}

interface WebViewProps {
  html: string;
  messageCallback: (a: number) => void;
  onLoadEnd?: () => void;
}

const defaultCssOptions: CSSOptions = {
  padding: 2,
  fontSize: 17,
  textColor: '#000000',
};

export const webQuillView: React.FunctionComponent<WebViewProps> = (props) => {
  const webview = useRef<WebView | null>(null);

  function handleMessage(message: any) {
    const heightNeeded = parseInt(message.nativeEvent.data, 10);
    props.messageCallback(heightNeeded);
  }

  let html = props.html;

  return (
    <WebView
      scrollEnabled={false}
      onMessage={handleMessage}
      source={{ html }}
      style={[styles.webView]}
      javaScriptEnabled={true}
      scalesPageToFit={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onLoadEnd={() => {
        webview.current?.injectJavaScript(
          `window.ReactNativeWebView.postMessage(document.body.scrollHeight); `
        );
        props.onLoadEnd?.();
      }}
      
      ref={(r) => (webview.current = r)}
    />
  );
};
const WebQuillView = React.memo(webQuillView);

export const QuillView: React.FunctionComponent<Props> = (props) => {
  const [height, setHeight] = useState(1);
  const cssOptions = { ...defaultCssOptions, ...props.cssOptions };

  let delta = useMemo(() => {
    return props.deltaOps.replace(/"background":"#ffffff",*/g, '');
  }, [props.deltaOps]);

  const html = useMemo(() => wrapQuil(delta, cssOptions), [delta, cssOptions]);

  const handleHeightChange = useCallback((newHeight: number) => {
    if (height != newHeight) {
      setHeight(newHeight + 2);
    }
  }, []);

  return (
    <View style={[props.style, { height }]}>
      <WebQuillView
        messageCallback={handleHeightChange}
        html={html}
        onLoadEnd={props.onLoadEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  webView: {
    backgroundColor: 'transparent',
    flexGrow: 1,
  },
});

function wrapQuil(content: string, cssOptions: CSSOptions) {
  return `
  <!DOCTYPE html>
  <head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    />
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
    <!-- To automatically render math in text elements, include the auto-render extension: -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
      integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq"
      crossorigin="anonymous"
    />
    <script
    src="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js"
    integrity="sha384-y23I5Q6l+B6vatafAwxRu/0oK/79VlbSz7Q9aiSZUvyWYIYsd+qj+o24G5ZU2zJz"
    crossorigin="anonymous"
    ></script>
    <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
    <style>
      #actualContent {
        font-size: ${cssOptions.fontSize}px;
        font-family: 'Roboto';
        padding: ${cssOptions.padding}px;
      }
      #actualContent, #actualContent * {
        color: ${cssOptions.textColor} !important;
      }
      * {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="editor"></div>
    <div id="actualContent"></div>

    <script>      
      var quill = new Quill('#editor', {
        readOnly: true,
      });
      

      var body = ${content};
      quill.setContents(body);
      var editor = document.getElementById("editor")
      var html = editor.children[0].innerHTML;
      document.getElementById("actualContent").innerHTML = html;
      editor.remove();
      
      </script>
  </body>
  
  `;
}
