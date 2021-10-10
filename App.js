import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider } from "native-base"

import Main from './components/Main/Main';

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor="#003c8f" style="light" />
      
      <View style={styles.container}>
        <Main></Main>
      </View>
    
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#4a4a4a',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,  
    justifyContent: 'flex-start',
  },
});
