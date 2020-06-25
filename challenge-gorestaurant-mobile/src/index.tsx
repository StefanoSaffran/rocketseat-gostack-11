import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar } from 'react-native';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <AppProvider>
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </View>
  </AppProvider>
);

export default App;
