import * as React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';
import AttendanceScreen from './screens/AttendanceScreen';
import clearData from './Api/clearData';


const Stack = createNativeStackNavigator();
const Auth = () => {
  return (
  <Stack.Navigator initialRouteName="LoginScreen">
    <Stack.Screen
      options={{ headerShown: false }}
      name="LoginScreen"
      component={LoginScreen}
    />
  </Stack.Navigator>
  // <LoginScreen />
  )
}
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator which includer Login Signup will come once */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AttendanceScreen"
          component={AttendanceScreen}
          // Hiding header for Navigation Drawer as we will use our custom header
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="clearData"
          component={clearData}
          // Hiding header for Navigation Drawer as we will use our custom header
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App