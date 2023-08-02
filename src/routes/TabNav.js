import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  BackHandler,
  Alert,
  View,
  Text,
  Button,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Tab/profileScreen';
import Message from '../screens/Tab/messageScreen';
import Location from '../screens/Tab/locationScreen';
import Notification from '../screens/Tab/notificationScreen';
import Dashboard from '../screens/Tab/Dashboard';
import Modal from 'react-native-modal';
import {IMAGES} from '../constants/images';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';
import AppText from '../components/Text/appText';
import AppButton from '../components/Button/AppButton';
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
  scale,
} from 'react-native-size-matters';

const Tab = createBottomTabNavigator();

const TabNav = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleBackPress = () => {
    setModalVisible(true);
    return true;
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleModalAccept = () => {
    setModalVisible(false);
    BackHandler.exitApp();
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);


  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: 65,
            backgroundColor: COLORS.ORANGE,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
        tabBarOptions={styles.tabBar}>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: false,
            //tabBarStyle:{display:'none'},
            //tabBarButton: () => null,
            tabBarIcon: () => (
              <Image
                source={IMAGES.homeIcon}
                resizeMode="contain"
                style={styles.imageHome}
              />
            ),
            tabBarLabel: ' ',
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            //tabBarStyle:{display:'none'},
            tabBarButton: () => null,
            tabBarIcon: () => (
              <Image
                source={IMAGES.homeIcon}
                resizeMode="contain"
                style={styles.imageHome}
              />
            ),
            tabBarLabel: ' ',
          }}
        />

        <Tab.Screen
          name="Message"
          component={Message}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image
                source={IMAGES.messageIcon}
                resizeMode="contain"
                style={styles.imageMessage}
              />
            ),
            tabBarLabel: ' ',
          }}
        />

        <Tab.Screen
          name="Location"
          component={Location}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image
                source={IMAGES.locationIcon}
                resizeMode="contain"
                style={styles.imageLocation}
              />
            ),
            tabBarLabel: ' ',
          }}
        />

        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image
                source={IMAGES.notificationIcon}
                resizeMode="contain"
                style={styles.imageNotification}
              />
            ),
            tabBarLabel: ' ',
          }}
        />
      </Tab.Navigator>
      <Modal isVisible={isModalVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.WHITE,
            borderRadius: 10,
            marginVertical:verticalScale(270)
          }}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center',alignSelf:'center',}}>
            <AppText
              textTitleStyle={styles.socialnetworkheading}
              signUpTitle={'Are you sure you want to go out?'}
            />
          </View>
          <View style={{flex:1,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
          <View style={styles.loginbuttonContainer}>
            <AppButton
              onPress={handleModalCancel}
              btnText={'Cancel'}
              btnStyle={styles.cancelbutton}
            />
          </View>
          <View style={styles.loginbuttonContainer}>
            <AppButton
              onPress={handleModalAccept}
              btnText={'Accept'}
              btnStyle={styles.acceptbutton}
            />
          </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TabNav;

const styles = StyleSheet.create({
  imageHome: {
    width: 30,
    height: 30,
    top: 5,
    left: 25,
  },
  imageMessage: {
    width: 30,
    height: 30,
    top: 5,
    left: 10,
    right: 20,
  },
  imageLocation: {
    width: 30,
    height: 30,
    top: 5,
    right: 10,
  },
  imageNotification: {
    width: 30,
    height: 30,
    top: 5,
    right: 30,
  },
  tabBar: {
    activeTintColor: COLORS.BLACK,
    tabBarActiveTintColor: COLORS.PINK,
  },
  socialnetworkheading: {
    fontFamily: FONTS.MONTSERRAT_BOLD,
    color: COLORS.BLACK,
    alignSelf:'center',
    //width:moderateScale(140)
  },
  loginbuttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateVerticalScale(-15),
    marginHorizontal: moderateScale(5)
  },
  cancelbutton: {
    borderRadius: moderateScale(10),
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    width: moderateScale(150),
  },
  acceptbutton: {
    borderRadius: moderateScale(10),
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    width: moderateScale(150),
    backgroundColor:'#00bc00'
  },
});
