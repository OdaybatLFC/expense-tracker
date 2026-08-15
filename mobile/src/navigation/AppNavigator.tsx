import React from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { useAuth } from '../auth/AuthContext';
import { HomeScreen } from '../screens/HomeScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { colors } from '../constants/theme';

export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  Register: undefined;
  Home: undefined;
};

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const {
    isLoading,
    isAuthenticated,
  } = useAuth();

  if (isLoading) {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: colors.white,
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator
          color={colors.primary}
          size="large"
        />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={
        isAuthenticated ? 'Home' : 'Welcome'
      }
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen
          component={HomeScreen}
          name="Home"
        />
      ) : (
        <>
          <Stack.Screen
            component={WelcomeScreen}
            name="Welcome"
          />

          <Stack.Screen
            component={SignInScreen}
            name="SignIn"
          />

          <Stack.Screen
            component={RegisterScreen}
            name="Register"
          />
        </>
      )}
    </Stack.Navigator>
  );
}