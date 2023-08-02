import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import AppText from '../../components/Text/appText';
import AppTextForget from '../../components/Text/appTextForget';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';
import { IMAGES } from '../../constants/images';
import Geolocation from '@react-native-community/geolocation';
import { useIsFocused } from '@react-navigation/native';
//for QR
import { CameraScreen } from 'react-native-camera-kit';
import { verifyQR, getUserProfile } from '../../API_Services/Call_API';
import Toast from 'react-native-toast-message';

const Dashboard = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [qrvalue, setQrvalue] = useState('');
  const [openScanner, setOpenScanner] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [userImage, setUserImage] = useState('');

  const [isCheckInVisible, setIsCheckInVisible] = useState(true);
  const [isCheckOutVisible, setIsCheckOutVisible] = useState(true);

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setLatitude(info?.coords?.latitude);
      setLongitude(info?.coords?.longitude);
    });
    getProfileImage();
    if (isFocused) {
      getProfileImage();
    }
  }, [latitude, longitude, userImage, isFocused]);

  const handleCheckInPress = () => {
    setIsCheckInVisible(false);
    navigation.navigate('Checkin');
  };

  const handleCheckOutPress = () => {
    setIsCheckOutVisible(false);
    navigation.navigate('Checkout');
  };

  const getProfileImage = async () => {
    const response = await getUserProfile();
    if (response?.status) {
      setUserImage(response?.Profile_data?.profile)
    } else {
      Toast.show({
        type: 'error',
        text1: response?.message,
      })
    }
  }

  const handleVerifyQR = async () => {
    if (latitude && longitude !== null) {
      const data = {
        //qr_code: value,
        qr_code: '09b07f30-27c0-11ee-a737-b342fff6251d64ba784bde9fbf49f6ca9151Shekharcentral1689942121089',
        latitude: latitude,
        longitude: longitude,
      };

      console.warn("Passing data", data)
      const response = await verifyQR(data);
      console.warn('API Response', response);
      if (response?.status) {
        navigation.navigate('SuccessCheckin', { result: response });
      } else {
        Toast.show({
          type: 'error',
          text1: response?.message,
        });
      }
    }
  };

  const onBarcodeScan = qrvalue => {
    setQrvalue(qrvalue);
    setOpenScanner(false);
    handleVerifyQR(qrvalue);
  };

  return (
    <ImageBackground style={styles.container} source={IMAGES.dashboardBg}>
      {openScanner ? (
        <View style={styles.camContainer}>
          <CameraScreen
            showFrame={true}
            scanBarcode={true}
            laserColor={'blue'}
            frameColor={'blue'}
            colorForScannerFrame={'black'}
            onReadCode={event =>
              onBarcodeScan(event.nativeEvent.codeStringValue)
            }
          />
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <TouchableOpacity
            style={styles.dummyDpContainer}
            onPress={() => navigation.navigate('Profile')}>
            <Image source={userImage ? { uri: userImage } : IMAGES.dummyDp} style={styles.dummyDp} />
          </TouchableOpacity>

          <View style={styles.checkContainer}>

            {isCheckInVisible ? (
              <AppTextForget
                onPress={handleCheckInPress}
                textForgetTitleStyle={styles.checkinText}
                title={`Check-in`}
              />
            ) : (<AppTextForget
              onPress={handleCheckOutPress}
              textForgetTitleStyle={styles.checkoutText}
              title={`Check-out`}
            />)}

          </View>

          <View style={styles.headerContainer}>
            <AppText
              textTitleStyle={styles.headerText}
              signUpTitle={'Here you will find'}
            />
            <AppText
              textTitleStyle={styles.headerText}
              signUpTitle={'everything'}
            />
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.firstoptionContainer}>
              <Image
                source={IMAGES.dashboardFirstOption}
                resizeMode="stretch"
                style={styles.imageContainer}
              />
              <View style={styles.imageoptionContainer}>
                <AppText
                  textTitleStyle={styles.optionfirstTitle}
                  signUpTitle={`Your works`}
                />
                <AppText
                  textTitleStyle={styles.optionsecondTitle}
                  signUpTitle={'Points'}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                source={IMAGES.dashboardSecondOption}
                resizeMode="stretch"
                style={styles.imageContainer}
              />
              <View style={styles.imageoptionContainer}>
                <AppText
                  textTitleStyle={styles.optionfirstTitle}
                  signUpTitle={`Your hours`}
                />
                <AppText
                  textTitleStyle={styles.optionsecondTitle}
                  signUpTitle={'Worked'}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  camContainer: { flex: 1 },
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 119, 0, 0.7)',
    //backgroundColor: COLORS.ORANGE,
  },
  dummyDpContainer: {
    marginTop: verticalScale(30),
    marginLeft: verticalScale(30),
    marginRight: verticalScale(250),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 100,
    width: moderateScale(60),
    height: moderateScale(60),
  },
  dummyDp: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: 30,
  },
  checkContainer: {
    marginTop: moderateVerticalScale(-40),
    marginLeft: moderateScale(250),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkinText: {
    fontFamily: FONTS.MONTSERRAT_SEMI_BOLD,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  checkoutText: {
    fontFamily: FONTS.MONTSERRAT_SEMI_BOLD,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  headerContainer: {
    marginTop: moderateVerticalScale(70),
    marginHorizontal: moderateScale(10),
    width: moderateScale(300),
    alignSelf: 'center',
  },
  headerText: { fontFamily: FONTS.MONTSERRAT_BOLD, fontSize: 25 },
  optionsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: verticalScale(40),
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 20,
  },
  firstoptionContainer: {
    marginBottom: moderateVerticalScale(-20),
  },
  imageContainer: { height: verticalScale(150), width: moderateScale(320) },
  imageoptionContainer: {
    marginTop: moderateVerticalScale(-90),
    marginLeft: moderateScale(120),
  },
  optionfirstTitle: {
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    color: COLORS.WHITE,
    fontSize: 30,
  },
  optionsecondTitle: {
    fontFamily: FONTS.MONTSERRAT_BOLD,
    color: COLORS.WHITE,
    fontSize: 30,
  },
});
