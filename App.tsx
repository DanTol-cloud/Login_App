import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Back from './src/assets/Back3.png';
import {FormProvider} from './src/context/FormContext.tsx';
import HomePage from './src/Pages/HomePage';
import LoginPage from './src/Pages/LoginPage';
import MainPage from './src/Pages/MainPage';
import RegisterPage from './src/Pages/RegisterPage';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <FormProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTransparent: true,
            headerTitle: '',
            headerBackImageSource: Back,
          }}>
          <Stack.Screen name="Main" component={MainPage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={RegisterPage} />
          <Stack.Screen
            name="Home"
            component={HomePage}
            initialParams={{email: ''}}
            options={{headerBackVisible: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FormProvider>
  );
}
export default App;
