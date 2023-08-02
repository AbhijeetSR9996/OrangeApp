import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import { CameraScreen } from 'react-native-camera-kit';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';
import { IMAGES } from '../../constants/images';
import { verifyQR } from '../../API_Services/Call_API';
import Toast from 'react-native-toast-message';
import Geolocation from '@react-native-community/geolocation';
import AppText from '../../components/Text/appText';

const Checkout = ({ navigation }) => {
  const [qrvalue, setQrvalue] = useState('');
  const [openScanner, setOpenScanner] = useState(false);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  //console.log('lat: ', latitude);
  //console.log('long: ', longitude);

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setLatitude(info?.coords?.latitude)
      setLongitude(info?.coords?.longitude)
    });
    onOpenScanner();
  }, [latitude, longitude])

  const handleVerifyQR = async () => {
    const data = {
      qr_code: '09b07f30-27c0-11ee-a737-b342fff6251d64ba784bde9fbf49f6ca9151Shekharcentral1689942121089',
      latitude: latitude,
      longitude: longitude,
    };
    const response = await verifyQR(data);
    if (response?.status) {
      navigation.navigate('SuccessCheckout', { result: response });
    } else {
      Toast.show({
        type: 'error',
        text1: response?.message,
      })
    }
  };

  const onBarcodeScan = qrvalue => {
    setQrvalue(qrvalue);
    setOpenScanner(false);
    handleVerifyQR(qrvalue);
  };

  const onOpenScanner = () => {
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs permission for camera access',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setQrvalue('');
            setOpenScanner(true);
          } else {
            //Alert.alert('CAMERA permission denied');
            Toast.show({
              type: 'error',
              text1: 'CAMERA permission denied',
            });
          }
        } catch (err) {
          //Alert.alert('Camera permission err', err);
          Toast.show({
            type: 'error',
            text1: 'CAMERA permission err',
          });
          console.warn(err);
        }
      }
      requestCameraPermission();
    } else {
      setQrvalue('');
      setOpenScanner(true);
    }
  };

  //console.log('result: ', qrvalue);

  return (
    <ImageBackground style={styles.imageBg} source={IMAGES.qrpopupBg}>
      <View style={styles.child}>
        {openScanner ? (
          <View style={{ flex: 1 }}>
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
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <AppText
              textTitleStyle={styles.socialnetworkheading}
              signUpTitle={'Loading...'}
            />
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    padding: 10,
    alignItems: 'center',
  },
  titleText: {
    color: COLORS.BLACK,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    color: COLORS.BLACK,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    marginTop: 16,
  },
  buttonStyle: {
    fontSize: 16,
    color: COLORS.WHITE,
    backgroundColor: 'green',
    padding: 5,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  textLinkStyle: {
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    color: 'blue',
    paddingVertical: 20,
  },
  socialnetworkheading: {
    fontFamily: FONTS.MONTSERRAT_BOLD,
  },
  imageBg: {
    width: '100%',
    height: '100%',
  },
  child: {
    flex: 1,
    backgroundColor: 'rgba(255, 119, 0, 0.6)',
  },
});
