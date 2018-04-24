import React from 'react';
import { Dimensions, StyleSheet, Text, View, Button } from 'react-native';
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
      paddingVertical: margin,
    }
  }

  renderDrawer(progressValue) {
    if (!this.state.progressValue) {
      this.setState({ progressValue });
    }

    return (
      <View style={styles.drawer}>
        <Text>Drawer content</Text>
      </View>
    );
  }

  render() {
    return (
      <DrawerLayout
        ref={drawer => {this.drawer = drawer;}}
        renderNavigationView={(pv) => this.renderDrawer(pv)}
        drawerWidth={Dimensions.get('window').width * 0.75}
        drawerType="back"
        overlayColor="#00000000"
      >
        <View style={[styles.container, this.getAnimatedStyles()]}>
          <Button onPress={() => this.drawer.openDrawer()} title="Open drawer"/>
        </View>
      </DrawerLayout>
    );
  }
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: '#F95A570C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
