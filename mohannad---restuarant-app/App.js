import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// الشاشات
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import ItemDetailScreen from './screens/ItemDetailScreen';
import CartScreen from './screens/CartScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'تسجيل الدخول' }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ title: 'تسجيل الاشتراك' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'الرئيسية' }}
        />
        <Stack.Screen
          name="ItemDetail"
          component={ItemDetailScreen}
          options={{ title: 'تفاصيل الصنف' }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: 'السلة' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
