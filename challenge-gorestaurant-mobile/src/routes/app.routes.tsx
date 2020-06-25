import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeContext } from 'styled-components';

import Icon from 'react-native-vector-icons/Feather';
import TabRoutes from './tab.routes';

import Home from '../pages/Home';
import FoodDetails from '../pages/FoodDetails';
import OrderDetails from '../pages/OrderDetails';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <NavigationContainer>
      <App.Navigator initialRouteName="Home">
        <App.Screen
          options={{
            cardStyle: { backgroundColor: '#C72828' },
            headerShown: false,
          }}
          name="Home"
          component={Home}
        />
        <App.Screen
          name="MainBottom"
          component={TabRoutes}
          options={{
            headerShown: false,
            gestureEnabled: false,
            cardStyle: { backgroundColor: colors.background },
          }}
        />
        <App.Screen
          name="FoodDetails"
          component={FoodDetails}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Icon
                name="arrow-left"
                size={24}
                color="#FFB84D"
                onPress={() => navigation.goBack()}
              />
            ),
            headerLeftContainerStyle: {
              marginLeft: 24,
            },
            headerRight: () => <Icon name="heart" size={24} color="#FFB84D" />,
            headerRightContainerStyle: {
              marginRight: 24,
            },
            headerTitle: 'Prato - Massas',
            headerTitleStyle: {
              color: '#fff',
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
            },
            headerStyle: {
              backgroundColor: '#C72828',
              elevation: 0,
              borderWidth: 0,
              shadowColor: 'transparent',
            },
          })}
        />
        <App.Screen
          name="OrderDetails"
          component={OrderDetails}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Icon
                name="arrow-left"
                size={24}
                color="#FFB84D"
                onPress={() => navigation.goBack()}
              />
            ),
            headerLeftContainerStyle: {
              marginLeft: 24,
            },
            headerRight: () => <Icon name="heart" size={24} color="#FFB84D" />,
            headerRightContainerStyle: {
              marginRight: 24,
            },
            headerTitle: 'Detalhas do Pedido',
            headerTitleStyle: {
              color: '#fff',
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
            },
            headerStyle: {
              backgroundColor: '#C72828',
              elevation: 0,
              borderWidth: 0,
              shadowColor: 'transparent',
            },
          })}
        />
      </App.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
