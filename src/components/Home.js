/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

class Home extends Component {
  render() {
    return (
     <SafeAreaView style={styles.parentView}>
         {/* <View style={{ height:  }}></View> */}
     </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    parentView: {
      flex: 1,
    },
});
export default Home;
