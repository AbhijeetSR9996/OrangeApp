import React, { useContext } from 'react';
// import { TouchableOpacity, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// import { AuthContext } from '../API_Services/Context';
import Dashboard from '../screens/Tab/Dashboard';
import TabNav from './TabNav';
import ProfileScreen from '../screens/Tab/profileScreen';
import Checkin from '../screens/Stack/checkIn';
import Checkout from '../screens/Stack/checkOut';
import SuccessCheckIn from '../screens/Stack/SuccessCheckin';
import SuccessCheckOut from '../screens/Stack/SuccessCheckout';
import Demo from '../screens/Stack/Demo';

export default function AppNavigation() {
  // const { signOut } = useContext(AuthContext);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="TabNav" component={TabNav} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Profile" component={ProfileScreen} />

          <Stack.Screen name="Checkin" component={Checkin} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="SuccessCheckin" component={SuccessCheckIn} />
          <Stack.Screen name="SuccessCheckout" component={SuccessCheckOut} />
          <Stack.Screen name="Demo" component={Demo} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* <TouchableOpacity onPress={() => signOut()} >
        <Text>Log out</Text>
      </TouchableOpacity> */}

    </>
  );
}

