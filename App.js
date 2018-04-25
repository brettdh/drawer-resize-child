import React from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Button,
  Platform
} from 'react-native';
import { GestureHandler } from 'expo';

const { DrawerLayout } = GestureHandler;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      progressValue: null,
    };
  }

  getAnimatedStyles() {
    const margin =
      this.state.progressValue
        ? this.state.progressValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 30],
        })
        : 0;
    return {
      marginVertical: margin,
    }
  }

  renderDrawer(progressValue) {
    if (!this.state.progressValue) {
      setTimeout(() => this.setState({ progressValue }), 100);
    }

    return (
      <View style={styles.drawer}>
        <Text>Drawer content</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <DrawerLayout
          ref={drawer => { this.drawer = drawer; }}
          renderNavigationView={(pv) => this.renderDrawer(pv)}
          drawerWidth={Dimensions.get('window').width * 0.75}
          drawerType="back"
          overlayColor="#00000000"
          useNativeAnimations={false}
        >
          <Animated.View style={[styles.main, this.getAnimatedStyles()]}>
            <Button onPress={() => this.drawer.openDrawer()} title="Open drawer"/>
          </Animated.View>
        </DrawerLayout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F95A570C',
  },
  drawer: {
    flex: 1,
    //backgroundColor: '#F95A570C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
