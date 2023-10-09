import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';

function MyStatusBar({backgroundColor, ...props}) {
  return (
    <View style={[styles.statusBar, {backgroundColor}]}>
      <SafeAreaView style={{ flex:1 }}>
        <StatusBar translucent backgroundColor={backgroundColor} barStyle="dark-content" {...props} />
      </SafeAreaView>
    </View>
  );
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
// const APPBAR_HEIGHT = Platform.OS === 'ios' ? 42 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    // height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor:'#79B45D',
    // height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});


export default MyStatusBar;
