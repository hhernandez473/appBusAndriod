import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import { StackNavigator } from './src/navigator/StackNavigator';
//import { LateralMenu } from './src/navigator/LateralMenu';
import { UserStackNavigator } from './src/navigator/UserStackNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { PermissionProvider } from './src/context/PermissionContext';

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
};

const AppState2 = ({ children }: any) => {
  return (
    <PermissionProvider>
      {children}
    </PermissionProvider>
  )
};

const App = () => {
  return (
    <NavigationContainer>
      {/* <LateralMenu /> */}
      <AppState>
        <PermissionProvider>
          <UserStackNavigator />
        </PermissionProvider>
      </AppState>
    </NavigationContainer>
  )
}

export default App;




