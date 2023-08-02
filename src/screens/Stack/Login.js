import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  BackHandler,
  Linking,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { IMAGES } from '../../constants/images';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../API_Services/Context';
import TextInputWithLabel from '../../components/TextInput/textinputWithLabel';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';
import AppButton from '../../components/Button/AppButton';
import AppText from '../../components/Text/appText';
import AppTextForget from '../../components/Text/appTextForget';
import CountryPicker from 'react-native-country-picker-modal';
import TextInputGlobal from '../../styles/login/TextInputGlobal';
import Toast from 'react-native-toast-message';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useNavigation } from '@react-navigation/native';
import { CameraScreen } from 'react-native-camera-kit';
import {
  forgetPassword,
  otpVerification,
  resetPassword,
  validateLogin,
} from '../../API_Services/Call_API';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {

  //toast for GPS 
  useEffect(() => {
    // Check if the Toast has been shown before
    AsyncStorage.getItem('toastShown').then((value) => {
      if (!value) {
        // Show the Toast message if it hasn't been shown before
        const toast = Toast.show({
          type: 'success',
          text1: 'Please turn-on GPS on your device.',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 40,
          bottomOffset: 40,
          onPress: () => {
            Toast.hide(toast);
          },
        });

        // Store a flag to indicate that the Toast has been shown
        AsyncStorage.setItem('toastShown', 'true');
      }
    });
  }, []);
  //---------------------------

  const { signIn } = React.useContext(AuthContext);
  const [qrvalue, setQrvalue] = useState('');
  const [openScanner, setOpenScanner] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisiblee, setModalVisiblee] = useState(false);
  const [modalVisibleee, setModalVisibleee] = useState(false);

  const [email, setEmail] = useState('');
  const [emailedOTP, setEmailedOTP] = useState('');
  const [value, setValue] = useState('');

  const [Id, setId] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [resetpass, setResetpass] = useState('');
  const [resetconfirm, setResetconfirm] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [selectedCountryCode, setSelectedCountryCode] = useState('1');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [isVisible, setVisible] = useState(true);
  const [isVisiblee, setVisiblee] = useState(true);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [secureTextEntryy, setSecureTextEntryy] = useState(true);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisiblee, setPasswordVisiblee] = useState(false);

  const CELL_COUNT = 4;
  const navigation = useNavigation();
  const [countryCodeVisible, setCountryCodeVisible] = useState(false);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const openModal = () => {
    setModalVisible(true);
    setModalVisiblee(false);
    setModalVisibleee(false);
  };

  const strongRegex = new RegExp('^[a-z0-9_.+-]+@[a-z0-9-]+.[a-z0-9-.]+$');

  const handleForgetPasswordModelUnlock = () => {
    if (email == '') {
      Toast.show({
        type: 'error',
        text1: 'Email is required',
      });
      return;
    } else if (!strongRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Enter a valid email.',
      });
      return;
    } else {
      handleForgetPasswordModel();
    }
  };

  const handleForgetPasswordModel = async () => {
    const data = {
      email: email,
    };
    const response = await forgetPassword(data);
    if (response?.data === email) {
      Toast.show({
        type: 'success',
        text1: response?.message,
      });
      setModalVisible(false);
      setModalVisiblee(true);
      setModalVisibleee(false);
    } else {
      Toast.show({
        type: 'error',
        text1: response?.message,
      });
    }
  };

  const handleOTPVerificationRequestUnlock = () => {
    if (value == '') {
      Toast.show({
        type: 'error',
        text1: 'OTP is required',
      });
      return;
    } else {
      handleOTPVerificationRequest();
    }
  };

  const handleOTPVerificationRequest = async () => {
    const data = {
      email: email,
      otp: value,
    };
    const response = await otpVerification(data);
    if (response?.status) {
      Toast.show({
        type: 'success',
        text1: response?.message,
      });
      setModalVisible(false);
      setModalVisiblee(false);
      setModalVisibleee(true);
    } else {
      Toast.show({
        type: 'error',
        text1: response?.message,
      });
    }
  };

  const handleResetPasswordUnlock = () => {
    if (resetpass == '') {
      Toast.show({
        type: 'error',
        text1: 'Password is required.',
      });
      return;
    } else if (resetpass.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Minimum 6 character is allowed.',
      });
      return;
    } else if (resetconfirm == '') {
      Toast.show({
        type: 'error',
        text1: 'Confirm Password is required.',
      });
      return;
    } else if (resetconfirm.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Minimum 6 character is allowed.',
      });
      return;
    } else if (resetpass != resetconfirm) {
      Toast.show({
        type: 'error',
        text1: 'Password do not match.',
      });
      return;
    } else {
      handleResetPassword();
    }
  };

  const handleResetPassword = async () => {
    const data = {
      email: email,
      password: resetpass,
      repeat_password: resetconfirm,
    };
    const response = await resetPassword(data);
    if (response?.status) {
      Toast.show({
        type: 'success',
        text1: response?.message,
      });
      setModalVisibleee(false);
    } else {
      Toast.show({
        type: 'error',
        text1: response?.message,
      });
    }
  };

  const toggleCountryCodeVisibility = () => {
    setCountryCodeVisible(!countryCodeVisible);
  };
  const onSelect = country => {
    setSelectedCountry(country.cca2);
    setSelectedCountryCode(country.callingCode[0]);
  };
  const handleNavigation = () => {
    setModalVisiblee(true);
  };
  const togglePasswordVisibilityy = () => {
    setPasswordVisiblee(!passwordVisiblee);
    setSecureTextEntryy(!secureTextEntryy);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    setSecureTextEntry(!secureTextEntry);
  };

  //-------------for combining code with phone number
  console.log('new', `${selectedCountryCode}${mobile}`);
  let updatePhone = `${selectedCountryCode}${mobile}`;
  console.log('update_phone_login', updatePhone);
  //-----------------------

  const handleLogin = async () => {
    // if (selectedCountryCode == null) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Please select country code',
    //   });
    //   return;
    // }
    if (mobile == '') {
      Toast.show({
        type: 'error',
        text1: 'Id should not be blank',
      });
      return;
    } else if (mobile.length < 8) {
      Toast.show({
        type: 'error',
        text1: 'Minimum 8 digits allowed.',
      });
      return;
    } else if (password == '') {
      Toast.show({
        type: 'error',
        text1: 'Password should not be blank',
      });
      return;
    } else if (password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Password should be atleast 6 characters long',
      });
      return;
    } else {
      const data = {
        id: updatePhone,
        password: password,
        fcm_token: 'ewrsdt7f8g9h0js4d5gf67h98j0kxrc6tv7yb8un9i',
      };
      const response = await validateLogin(data);
      if (response?.status) {
        const token = response?.token;
        AsyncStorage.setItem('token', token);
        signIn(token);
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: response?.message,
        });
      }
    }
  };

  const handleSignUpModal = () => {
    navigation.navigate('Signup');
  };
  const handleLoginUnlock = () => {
    navigation.navigate('Loginblocked');
    //navigation.navigate('MyTabs');
    //onOpenScanner();
  };

  const [backPressCount, setBackPressCount] = useState(0);
  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress,
      );
      return () => subscription.remove();
    }, [backPressCount]),
  );

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const isSmallScreen = windowWidth < 500;

  const onBarcodeScan = qrvalue => {
    setQrvalue(qrvalue);
    setOpenScanner(false);
    navigation.navigate('SuccessCheckin');
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
            Toast.show({
              type: 'error',
              text1: 'CAMERA permission denied',
            });
          }
        } catch (err) {
          Toast.show({
            type: 'error',
            text1: err,
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

  //country code picker

  console.log(' Selected country_code:', selectedCountryCode);

  return (
    <ImageBackground style={styles.imageBg} source={IMAGES.loginBg}>
      {openScanner ? (
        <View style={styles.scannerContainer}>
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
        <View style={styles.child}>
          <View style={styles.questionContainer}>
            <TouchableOpacity>
              <Image
                resizeMode="contain"
                source={IMAGES.questionIcon}
                style={styles.questionIconStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.appTextContainer}>
            <Image
              resizeMode="contain"
              source={IMAGES.appText}
              style={styles.appTextStyle}
            />

            <View style={styles.countryparentContainer}>
              <TextInputGlobal
                editable={false}
                Svg={
                  <TouchableOpacity
                    onPress={toggleCountryCodeVisibility}
                    style={styles.countrychildContainer}>
                    <CountryPicker
                      visible={countryCodeVisible}
                      withCallingCode
                      withFilter
                      countryCode={selectedCountry}
                      withFlagButton
                      withCallingCodeButton
                      onSelect={onSelect}
                      containerButtonStyle={styles.countryContainer}
                      withCloseButton
                    />
                  </TouchableOpacity>
                }
              />
              <TextInputWithLabel
                value={mobile}
                onChangeText={e => setMobile(e)}
                placeHolder="ID"
                placeholderTextColor={COLORS.GREY}
                keyboardType={'numeric'}
                maxLength={10}
                inputStyle={styles.idContainer}
              />
            </View>

            <View>
              <TextInputWithLabel
                value={password}
                onChangeText={e => setPassword(e)}
                secureTextEntry={isVisible}
                rightIcon={isVisible ? IMAGES.showEye : IMAGES.hideEye}
                onPressRight={() => setVisible(!isVisible)}
                placeHolder="Enter your password"
                placeholderTextColor={COLORS.GREY}
                inputStyle={styles.passwordContainer}
              />
            </View>
          </View>
          <View style={styles.forgetextContainer}>
            <AppTextForget
              onPress={() => openModal()}
              textForgetTitleStyle={styles.forgetext}
              title={`Did you forget your password?`}
            />
          </View>
          <View style={styles.loginbuttonContainer}>
            <AppButton
              //onPress={() => handleLogin()}
              onPress={handleLogin}
              btnText={'Enter'}
              btnStyle={styles.loginbutton}
            />
          </View>

          <View style={styles.signupbuttonContainer}>
            <AppText
              onPress={() => handleSignUpModal()}
              textTitleStyle={styles.signupTextone}
              textSubTitleStyle={styles.signupTextwo}
              signUpTitle={`You don't have an account yet?`}
              signUpSubTitle={'Sign Up'}
            />
          </View>

          <View style={styles.qrContainer}>
            <Image style={styles.qrIcon} source={IMAGES.qrCodeIcon} />
          </View>

          <View style={styles.socialnetworkheadingContainer}>
            <AppText
              textTitleStyle={styles.socialnetworkheading}
              signUpTitle={'Follow us on our social networks'}
            />
          </View>

          <View style={styles.socialnetworkparentContainer}>
            <View style={styles.socialnetworkchildContainer}>
              <TouchableOpacity>
                <Image
                  source={IMAGES.fbIcon}
                  resizeMode="center"
                  style={styles.socialnetworkIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={IMAGES.twitterIcon}
                  resizeMode="center"
                  style={styles.socialnetworkIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={IMAGES.linkedinIcon}
                  resizeMode="center"
                  style={styles.socialnetworkIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={IMAGES.instaIcon}
                  resizeMode="center"
                  style={styles.socialnetworkIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* FORGOT PASSWORD MODAL */}

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={[styles.container, styles.modalBackground]}
          onPress={() => setModalVisible(false)}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.forgotscrollContainer}>
            <View style={styles.forgotContainer}>
              <TouchableOpacity
                style={styles.crossiconContainer}
                onPress={() => setModalVisible(false)}>
                <Image style={styles.crossicon} source={IMAGES.crossIcon} />
              </TouchableOpacity>
              <Text style={styles.forgotText}>Forgot Password</Text>
              <Text style={styles.forgotDesc}>
                Enter your email for the verification process, we will send 4
                digits code to your email.
              </Text>

              <View style={[styles.vwphone, styles.emailContainer]}>
                <Text style={styles.emailText}>E-mail</Text>
                <View
                  style={{
                    marginTop: moderateVerticalScale(15),
                    marginBottom: moderateVerticalScale(25),
                  }}>
                  <TextInputWithLabel
                    value={email}
                    onChangeText={e => setEmail(e)}
                    inputStyle={styles.passwordContainer}
                  />
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <AppButton
                  //onPress={handleForgetPasswordModel}
                  onPress={handleForgetPasswordModelUnlock}
                  btnText={'Continue'}
                  btnStyle={styles.loginbutton}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* ------------------ */}

      {/* CODE MODAL */}

      <Modal visible={modalVisiblee} animationType="slide">
        <View
          style={[styles.container, styles.modalBackground]}
          onPress={() => setModalVisiblee(false)}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.codescrollContainer}>
            <View style={styles.codeContainer}>
              <TouchableOpacity
                style={styles.crossicontwoContainer}
                onPress={() => setModalVisiblee(false)}>
                <Image style={styles.crossicontwo} source={IMAGES.crossIcon} />
              </TouchableOpacity>
              <Text style={styles.codeHeading}>Enter 4 Digits Code</Text>
              <Text style={styles.codeDesc}>
                Enter the 4 digits code that you received on your email.
              </Text>

              <SafeAreaView style={styles.root}>
                <CodeField
                  ref={ref}
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFieldRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <Text
                      key={index}
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  )}
                />
              </SafeAreaView>

              {/* <TouchableOpacity
                style={styles.buttonContainertwo}
                onPress={openModalll}>
                <Text style={styles.buttonTextwo}>Continue</Text>
              </TouchableOpacity> */}

              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  {
                    marginTop: verticalScale(-2),
                    backgroundColor: 'transparent',
                    zIndex: 5,
                  },
                ]}>
                <AppButton
                  onPress={() => handleOTPVerificationRequestUnlock()}
                  btnText={'Continue'}
                  btnStyle={styles.loginbutton}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* ------------------ */}

      {/* RESET MODAL */}

      <Modal
        visible={modalVisibleee}
        animationType="slide"
        onRequestClose={() => setModalVisibleee(false)}>
        <View
          style={[styles.container, styles.modalBackground]}
          onPress={() => setModalVisibleee(false)}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.resetscrollContainer}>
            <View style={styles.resetContainer}>
              <Text style={styles.resetHeading}>Reset Password</Text>
              <Text style={styles.resetDesc}>
                Set the new password for your account so you can login and
                access all the features.
              </Text>

              <View style={[styles.vwphone, styles.passwordmodalContainer]}>
                <Text style={styles.passwordmodalText}>Password</Text>

                <TextInputWithLabel
                  inputStyle={styles.inputfield}
                  value={resetpass}
                  onChangeText={e => setResetpass(e)}
                  secureTextEntry={isVisible}
                  rightIcon={isVisible ? IMAGES.showEye : IMAGES.hideEye}
                  onPressRight={() => setVisible(!isVisible)}
                />
              </View>

              <View style={[styles.vwphone, styles.inputContainer]}>
                <Text style={styles.input}>Confirm Password</Text>

                <TextInputWithLabel
                  inputStyle={styles.inputfield}
                  value={resetconfirm}
                  onChangeText={e => setResetconfirm(e)}
                  secureTextEntry={isVisiblee}
                  rightIcon={isVisiblee ? IMAGES.showEye : IMAGES.hideEye}
                  onPressRight={() => setVisiblee(!isVisiblee)}
                />
              </View>

              <View
                style={[
                  styles.buttonContainer,
                  { marginTop: verticalScale(50) },
                ]}>
                <AppButton
                  //onPress={() => handleResetPassword()}
                  onPress={() => handleResetPasswordUnlock()}
                  btnText={'Reset Password'}
                  btnStyle={styles.loginbutton}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* ------------------ */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    width: '100%',
    height: '100%',
  },
  child: {
    flex: 1,
    backgroundColor: 'rgba(255, 119, 0, 0.6)',
    //marginBottom: moderateVerticalScale(20),
  },
  appTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTextStyle: {
    height: moderateScale(25),
    width: moderateScale(220),
    marginTop: moderateVerticalScale(60),
  },
  questionContainer: {
    alignItems: 'flex-end',
    bottom: moderateScale(20),
  },
  questionIconStyle: {
    height: moderateScale(25),
    width: moderateScale(60),
    marginTop: moderateVerticalScale(40),
    marginEnd: moderateScale(10),
  },
  scannerContainer: { flex: 1 },
  mainContainer: {
    flex: 1,
    //backgroundColor: 'rgba(255, 119, 0, 0.6)',
    backgroundColor: COLORS.ORANGE,
    //marginBottom: moderateVerticalScale(20),
  },
  appTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTextStyle: {
    height: moderateScale(25),
    width: moderateScale(220),
    marginTop: moderateVerticalScale(60),
  },
  questionContainer: {
    alignItems: 'flex-end',
    bottom: moderateScale(20),
  },
  questionIconStyle: {
    height: moderateScale(25),
    width: moderateScale(60),
    marginTop: moderateVerticalScale(40),
    marginEnd: moderateScale(10),
  },
  countryparentContainer: {
    flexDirection: 'row',
    marginTop: moderateVerticalScale(30),
  },
  countrychildContainer: {
    width: moderateScale(85),
    marginLeft: moderateScale(10),
    alignSelf: 'center',
  },
  countryContainer: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  idContainer: {
    width: moderateScale(177),
    marginEnd: moderateScale(6),
    height: moderateScale(50),
    backgroundColor: COLORS.WHITE,
    borderRadius: moderateScale(10),
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 10,
  },
  passwordContainer: {
    width: moderateScale(312),
    height: moderateScale(50),
    backgroundColor: COLORS.WHITE,
    borderRadius: moderateScale(10),
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 0,
  },
  forgetextContainer: {
    marginTop: moderateVerticalScale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgetext: {
    fontFamily: FONTS.MONTSERRAT_REGULAR,
  },
  loginbuttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateVerticalScale(20),
  },
  loginbutton: {
    borderRadius: 10,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
  },
  signupbuttonContainer: {
    marginTop: moderateVerticalScale(20),
  },
  signupTextone: {
    fontFamily: FONTS.MONTSERRAT_REGULAR,
  },
  signupTextwo: {
    fontFamily: FONTS.MONTSERRAT_BOLD,
  },
  qrContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(40),
  },
  qrIcon: {
    width: moderateScale(80),
    height: moderateScale(80),
  },
  socialnetworkheadingContainer: {
    marginTop: moderateVerticalScale(30),
  },
  socialnetworkheading: {
    fontFamily: FONTS.MONTSERRAT_REGULAR,
  },
  socialnetworkparentContainer: {
    marginTop: moderateVerticalScale(10),
  },
  socialnetworkchildContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  socialnetworkIcon: {
    height: moderateScale(30),
    width: moderateScale(30),
    margin: moderateScale(3),
  },

  // forgot modal

  forgotscrollContainer: {
    backgroundColor: '#f1f1f1',
    //backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    marginTop: '45%',
    alignSelf: 'center',
    width: '80%',
  },
  forgotContainer: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    paddingBottom: 310,
    //marginTop: '-25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossiconContainer: {
    marginHorizontal: moderateScale(20),
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginTop: verticalScale(15),
  },
  crossicon: {
    // marginRight: widthPercentageToDP('4%'),
    zIndex: 1,
    height: 20,
    width: 20,
  },
  forgotText: {
    marginTop: verticalScale(50),
    color: COLORS.BLACK,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    fontSize: scale(18),
  },
  forgotDesc: {
    color: COLORS.GREY,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    fontSize: scale(13),
    width: moderateScale(300),
    marginTop: verticalScale(20),
    lineHeight: 18,
    alignSelf: 'center',
  },
  emailContainer: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: moderateScale(-260),
    marginTop: verticalScale(100),
    //marginBottom: 5,
    backgroundColor: 'transparent',
    //zIndex: 1,
    //top: 40,
  },
  emailText: {
    color: COLORS.BLACK,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //fontWeight: '600',
    fontSize: scale(14),
    marginHorizontal: moderateScale(18),
    marginBottom: verticalScale(-5),
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateVerticalScale(-50),
    borderRadius: 10,
  },
  buttonText: {
    borderRadius: moderateScale(10),
    fontFamily: FONTS.MONTSERRAT_REGULAR,
  },

  //code modal

  codescrollContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    marginTop: '65%',
    alignSelf: 'center',
    width: '80%',
  },
  codeContainer: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    paddingBottom: 310,
  },
  crossicontwoContainer: {
    marginHorizontal: moderateScale(3),
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginTop: verticalScale(15),
  },
  crossicontwo: {
    zIndex: 1,
    height: 20,
    width: 20,
    marginEnd: moderateScale(20),
  },
  codeHeading: {
    marginTop: 50,
    color: COLORS.BLACK,
    //alignSelf: 'flex-start',
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //fontWeight: 'bold',
    fontSize: scale(18),
    //marginLeft: 34,
    //marginHorizontal: '11%',
    alignSelf: 'center',
    //zIndex: 1,
    top: -10,
  },
  codeDesc: {
    alignSelf: 'center',
    color: COLORS.GREY,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //fontWeight: '600',
    fontSize: scale(13),
    //width: 345,
    //marginHorizontal: 30,
    //marginLeft: 35,
    width: moderateScale(300),
    //marginHorizontal: '11%',
    top: 10,
    zIndex: 1,
    lineHeight: 18,
  },
  buttonContainertwo: {
    width: 332,
    alignSelf: 'center',
    height: 50,
    //backgroundColor: '#F57F17',
    backgroundColor: COLORS.ORANGE,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 0,
    top: 10,
    zIndex: 1,
    left: 2,
  },
  buttonTextwo: {
    fontSize: 19,
    color: COLORS.WHITE,
    //fontWeight: 'bold',
    fontFamily: FONTS.MONTSERRAT_BOLD,
  },

  //reset modal

  resetscrollContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    marginTop: '45%',
    alignSelf: 'center',
    width: '80%',
  },
  resetContainer: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    paddingBottom: 310,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetHeading: {
    marginTop: verticalScale(70),
    color: COLORS.BLACK,
    alignSelf: 'flex-start',
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //fontWeight: 'bold',
    fontSize: scale(18),
    //marginLeft: 34,
    alignSelf: 'center',
    //zIndex: 1,
    top: -10,
  },
  resetDesc: {
    alignSelf: 'center',
    color: COLORS.GREY,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //fontWeight: '600',
    fontSize: scale(13),
    //width: 345,
    //marginHorizontal: 30,
    //width: '80%',
    width: moderateScale(300),
    //marginHorizontal: '11%',
    //marginLeft: 35,
    top: 10,
    zIndex: 1,
    lineHeight: 18,
  },
  passwordmodalContainer: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: 45,
    marginBottom: 5,
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 40,
  },
  passwordmodalText: {
    color: COLORS.BLACK,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //fontWeight: '600',
    fontSize: scale(14),
    marginHorizontal: moderateScale(13),
    marginVertical: -10,
  },
  eyeIconContainer: { bottom: 58, left: 290 },
  eyeIcon: {
    height: 20,
    width: 20,
    //marginLeft: 5,
    marginHorizontal: verticalScale(5),
  },
  inputContainer: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: 45,
    marginBottom: 5,
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 40,
  },
  input: {
    color: COLORS.BLACK,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //fontWeight: '600',
    fontSize: scale(14),
    //marginHorizontal: 10,
    marginHorizontal: moderateScale(13),
    marginVertical: -10,
  },
  buttonContainerModal: {
    width: 332,
    alignSelf: 'center',
    height: 50,
    //backgroundColor: '#F57F17',
    backgroundColor: COLORS.ORANGE,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 0,
    top: 50,
    zIndex: 1,
    left: 2,
  },
  buttonTextModal: {
    fontSize: 19,
    color: COLORS.WHITE,
    fontFamily: FONTS.MONTSERRAT_BOLD,
  },
  container: {
    flex: 1,
    marginHorizontal: '-20%',
    marginBottom: '-10%',
    marginTop: '-10%',
  },
  modalBackground: {
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: 'transparent',
  },
  vwphone: {
    height: 67,
    bottom: 67,
    left: 135,
  },
  root: {
    flex: 1,
    padding: 60,
    marginTop: -70,
    top: 40,
    zIndex: 1,
    //alignSelf: 'center',
    justifyContent: 'center',
  },
  codeFieldRoot: {
    marginTop: 20,
  },
  cell: {
    width: 50,
    height: 60,
    lineHeight: 38,
    fontSize: 24,
    color: COLORS.BLACK,
    borderWidth: 1,
    //borderColor: '#00000030',
    borderColor: 'lightgrey',
    textAlign: 'center',
    borderRadius: 10,
    textAlignVertical: 'center',
    backgroundColor: COLORS.WHITE,
  },
  focusCell: {
    borderColor: COLORS.BLACK,
    color: COLORS.WHITE,
  },
  inputfield: {
    width: moderateScale(315),
    height: moderateScale(50),
    backgroundColor: COLORS.WHITE,
    borderRadius: moderateScale(10),
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 0,
    marginTop: verticalScale(15),
  },
});

export default Login;

//import React, {useState, useCallback} from 'react';
// import {
//   View,
//   Text,
//   ImageBackground,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   SafeAreaView,
//   Dimensions,
//   BackHandler,
//   Linking,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import {IMAGES} from '../../constants/images';
// import {
//   moderateScale,
//   moderateVerticalScale,
//   scale,
//   verticalScale,
// } from 'react-native-size-matters';
// import Modal from 'react-native-modal';
// import {useFocusEffect} from '@react-navigation/native';
// import TextInputForgot from '../../styles/forgotpassword/TextInputForgot';
// import TextInputWithLabel from '../../components/TextInput/textinputWithLabel';
// import {COLORS} from '../../constants/colors';
// import {FONTS} from '../../constants/fonts';
// import TextInputReset from '../../styles/resetpassword/TextInputReset';
// import AppButton from '../../components/Button/AppButton';
// import AppText from '../../components/Text/appText';
// import AppTextForget from '../../components/Text/appTextForget';
// import {styles} from '../../styles/forgetModal/forgetModal';
// import globalStylesForgot from '../../styles/forgotpassword/globalStylesForgot';
// import CountryPicker from 'react-native-country-picker-modal';
// import TextInputGlobal from '../../styles/login/TextInputGlobal';
// import Toast from 'react-native-toast-message';
// import {
//   CodeField,
//   Cursor,
//   useBlurOnFulfill,
//   useClearByFocusCell,
// } from 'react-native-confirmation-code-field';
// import {useNavigation} from '@react-navigation/native';
// import {CameraScreen} from 'react-native-camera-kit';

// const Login = () => {
//   const [qrvalue, setQrvalue] = useState('');
//   const [openScanner, setOpenScanner] = useState(false);

//   const [value, setValue] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalVisiblee, setModalVisiblee] = useState(false);
//   const [modalVisibleee, setModalVisibleee] = useState(false);
//   const [email, setEmail] = useState('');

//   const [Id, setId] = useState('');
//   const [password, setPassword] = useState('');
//   const [resetpass, setResetpass] = useState('');
//   const [resetconfirm, setResetconfirm] = useState('');
//   const [passwordMatch, setPasswordMatch] = useState(true);

//   const [selectedCountryCode, setSelectedCountryCode] = useState('1');
//   const [selectedCountry, setSelectedCountry] = useState('US');
//   const [isVisible, setVisible] = useState(true);

//   const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
//   const [secureTextEntryy, setSecureTextEntryy] = useState(true);
//   const [secureTextEntry, setSecureTextEntry] = useState(true);
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [passwordVisiblee, setPasswordVisiblee] = useState(false);

//   const CELL_COUNT = 4;
//   const navigation = useNavigation();
//   const [countryCodeVisible, setCountryCodeVisible] = useState(false);
//   const [props, getCellOnLayoutHandler] = useClearByFocusCell({
//     value,
//     setValue,
//   });
//   const openModal = () => {
//     setModalVisible(true);
//     setModalVisiblee(false);
//     setModalVisibleee(false);
//   };

//   const openModall = () => {
//     setModalVisible(false);
//     setModalVisiblee(true);
//     setModalVisibleee(false);
//   };

//   const openModalll = () => {
//     setModalVisible(false);
//     setModalVisiblee(false);
//     setModalVisibleee(true);
//   };
//   const toggleCountryCodeVisibility = () => {
//     setCountryCodeVisible(!countryCodeVisible);
//   };
//   const onSelect = country => {
//     setSelectedCountry(country.cca2);
//     setSelectedCountryCode(country.callingCode[0]);
//   };
//   const handleNavigation = () => {
//     setModalVisiblee(true);
//   };
//   const togglePasswordVisibilityy = () => {
//     setPasswordVisiblee(!passwordVisiblee);
//     setSecureTextEntryy(!secureTextEntryy);
//   };
//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//     setSecureTextEntry(!secureTextEntry);
//   };

//   const handleLogin = () => {
//     if (Id == '') {
//       Toast.show({
//         type: 'error',
//         text1: 'Id should not be blank',
//       });
//       return;
//     }

//     if (Id.length < 10) {
//       Toast.show({
//         type: 'error',
//         text1: 'Please enter a valid Id',
//       });
//       return;
//     }

//     if (password == '') {
//       Toast.show({
//         type: 'error',
//         text1: 'Password should not be blank',
//       });
//       return;
//     }

//     if (password.length < 6) {
//       Toast.show({
//         type: 'error',
//         text1: 'Password should be atleast 6 characters long',
//       });
//       return;
//     } else {
//       handleLoginUnlock();
//     }
//   };
//   const handleSignUpModal = () => {
//     navigation.navigate('Signup');
//   };
//   const handleLoginUnlock = () => {
//     navigation.navigate('Loginblocked');
//     //navigation.navigate('MyTabs');
//     //onOpenScanner();
//   };

//   const [backPressCount, setBackPressCount] = useState(0);
//   useFocusEffect(
//     useCallback(() => {
//       const handleBackPress = () => {
//         BackHandler.exitApp();
//         return true;
//       };
//       const subscription = BackHandler.addEventListener(
//         'hardwareBackPress',
//         handleBackPress,
//       );
//       return () => subscription.remove();
//     }, [backPressCount]),
//   );

//   const windowWidth = Dimensions.get('window').width;
//   const windowHeight = Dimensions.get('window').height;
//   const isSmallScreen = windowWidth < 500;

//   const onBarcodeScan = qrvalue => {
//     setQrvalue(qrvalue);
//     setOpenScanner(false);
//     navigation.navigate('Successcheckin', {result: qrvalue});
//   };

//   const onOpenScanner = () => {
//     if (Platform.OS === 'android') {
//       async function requestCameraPermission() {
//         try {
//           const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.CAMERA,
//             {
//               title: 'Camera Permission',
//               message: 'App needs permission for camera access',
//             },
//           );
//           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             setQrvalue('');
//             setOpenScanner(true);
//           } else {
//             Alert.alert('CAMERA permission denied');
//           }
//         } catch (err) {
//           Alert.alert('Camera permission err', err);
//           console.warn(err);
//         }
//       }
//       requestCameraPermission();
//     } else {
//       setQrvalue('');
//       setOpenScanner(true);
//     }
//   };

//   console.log('QR result for demo: ', qrvalue);

//   return (
//     <ImageBackground style={styles.imageBg} source={IMAGES.loginBg}>
//       {openScanner ? (
//         <View style={styles.scannerContainer}>
//           <CameraScreen
//             showFrame={true}
//             scanBarcode={true}
//             laserColor={'blue'}
//             frameColor={'blue'}
//             colorForScannerFrame={'black'}
//             onReadCode={event =>
//               onBarcodeScan(event.nativeEvent.codeStringValue)
//             }
//           />
//         </View>
//       ) : (
//         <View style={styles.mainContainer}>
//           <View style={styles.questionContainer}>
//             <TouchableOpacity>
//               <Image
//                 resizeMode="contain"
//                 source={IMAGES.questionIcon}
//                 style={styles.questionIconStyle}
//               />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.appTextContainer}>
//             <Image
//               resizeMode="contain"
//               source={IMAGES.appText}
//               style={styles.appTextStyle}
//             />

//             <View style={styles.countryparentContainer}>
//               <TextInputGlobal
//                 editable={false}
//                 Svg={
//                   <TouchableOpacity
//                     onPress={toggleCountryCodeVisibility}
//                     style={styles.countrychildContainer}>
//                     <CountryPicker
//                       visible={countryCodeVisible}
//                       withCallingCode
//                       withFilter
//                       countryCode={selectedCountry}
//                       withFlagButton
//                       withCallingCodeButton
//                       onSelect={onSelect}
//                       containerButtonStyle={styles.countryContainer}
//                       withCloseButton
//                     />
//                   </TouchableOpacity>
//                 }
//               />
//               <TextInputWithLabel
//                 value={Id}
//                 onChangeText={e => setId(e)}
//                 placeHolder={'ID'}
//                 placeholderTextColor={COLORS.GREY}
//                 keyboardType={'numeric'}
//                 maxLength={10}
//                 inputStyle={styles.idContainer}
//               />
//             </View>

//             <View>
//               <TextInputWithLabel
//                 value={password}
//                 onChangeText={e => setPassword(e)}
//                 secureTextEntry={isVisible}
//                 rightIcon={isVisible ? IMAGES.showEye : IMAGES.hideEye}
//                 onPressRight={() => setVisible(!isVisible)}
//                 placeHolder={'Enter your password'}
//                 placeholderTextColor={COLORS.GREY}
//                 inputStyle={styles.passwordContainer}
//               />
//             </View>
//           </View>
//           <View style={styles.forgetextContainer}>
//             <AppTextForget
//               onPress={() => openModal()}
//               textForgetTitleStyle={styles.forgetext}
//               title={`Did you forget your password?`}
//             />
//           </View>
//           <View style={styles.loginbuttonContainer}>
//             <AppButton
//               onPress={() => handleLogin()}
//               btnText={'Enter'}
//               btnStyle={styles.loginbutton}
//             />
//           </View>

//           <View style={styles.signupbuttonContainer}>
//             <AppText
//               onPress={() => handleSignUpModal()}
// textTitleStyle={styles.signupTextone}
// textSubTitleStyle={styles.signupTextwo}
//               signUpTitle={`You don't have an account yet?`}
//               signUpSubTitle={'Sign Up'}
//             />
//           </View>

//           <TouchableOpacity
//             style={styles.qrContainer}
//             //onPress={onOpenScanner}
//             onPress={() => navigation.navigate('MyTabs')}>
//             <Image style={styles.qrIcon} source={IMAGES.qrCodeIcon} />
//           </TouchableOpacity>

//           <View style={styles.socialnetworkheadingContainer}>
//             <AppText
//               textTitleStyle={styles.socialnetworkheading}
//               signUpTitle={'Follow us on our social networks'}
//             />
//           </View>

//           <View style={styles.socialnetworkparentContainer}>
//             <View style={styles.socialnetworkchildContainer}>
//               <TouchableOpacity>
//                 <Image
//                   source={IMAGES.fbIcon}
//                   resizeMode="center"
//                   style={styles.socialnetworkIcon}
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity>
//                 <Image
//                   source={IMAGES.twitterIcon}
//                   resizeMode="center"
//                   style={styles.socialnetworkIcon}
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity>
//                 <Image
//                   source={IMAGES.linkedinIcon}
//                   resizeMode="center"
//                   style={styles.socialnetworkIcon}
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity>
//                 <Image
//                   source={IMAGES.instaIcon}
//                   resizeMode="center"
//                   style={styles.socialnetworkIcon}
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       )}

//       {/* FORGOT PASSWORD MODAL */}

//       <Modal
//         visible={modalVisible}
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}>
//         <View
//           style={[styles.container, styles.modalBackground]}
//           onPress={() => setModalVisible(false)}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             style={styles.forgotscrollContainer}>
//             <View style={styles.forgotContainer}>
//               <TouchableOpacity
//                 style={styles.crossiconContainer}
//                 onPress={() => setModalVisible(false)}>
//                 <Image style={styles.crossicon} source={IMAGES.crossIcon} />
//               </TouchableOpacity>
//               <Text style={styles.forgotText}>Forgot Password</Text>
//               <Text style={styles.forgotDesc}>
//                 Enter your email for the verification process, we will send 4
//                 digits code to your email.
//               </Text>

//               <View style={[styless.vwphone, styles.emailContainer]}>
//                 <Text style={styles.emailText}>E-mail</Text>
//                 <TextInputForgot
//                   Svg={
//                     <TouchableOpacity style={globalStylesForgot.TextInput} />
//                   }
//                   state={email}
//                   setState={setEmail}
//                 />
//               </View>
//               <View style={styles.buttonContainer}>
//                 <AppButton
//                   onPress={openModall}
//                   btnText={'Continue'}
//                   btnStyle={styles.buttonText}
//                 />
//               </View>
//             </View>
//           </ScrollView>
//         </View>
//       </Modal>

//       {/* ------------------ */}

//       {/* CODE MODAL */}

//       <Modal visible={modalVisiblee} animationType="slide">
//         <View
//           style={[styless.container, styless.modalBackground]}
//           onPress={() => setModalVisiblee(false)}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             style={styles.codescrollContainer}>
//             <View style={styles.codeContainer}>
//               <TouchableOpacity
//                 style={styles.crossicontwoContainer}
//                 onPress={() => setModalVisiblee(false)}>
//                 <Image style={styles.crossicontwo} source={IMAGES.crossIcon} />
//               </TouchableOpacity>
//               <Text style={styles.codeHeading}>Enter 4 Digits Code</Text>
//               <Text style={styles.codeDesc}>
//                 Enter the 4 digits code that you received on your email.
//               </Text>

//               <SafeAreaView style={styless.root}>
//                 <CodeField
//                   ref={ref}
//                   value={value}
//                   onChangeText={setValue}
//                   cellCount={CELL_COUNT}
//                   rootStyle={styless.codeFieldRoot}
//                   keyboardType="number-pad"
//                   textContentType="oneTimeCode"
//                   renderCell={({index, symbol, isFocused}) => (
//                     <Text
//                       key={index}
//                       style={[styless.cell, isFocused && styless.focusCell]}
//                       onLayout={getCellOnLayoutHandler(index)}>
//                       {symbol || (isFocused ? <Cursor /> : null)}
//                     </Text>
//                   )}
//                 />
//               </SafeAreaView>

//               <TouchableOpacity
//                 style={styles.buttonContainertwo}
//                 onPress={openModalll}>
//                 <Text style={styles.buttonTextwo}>Continue</Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         </View>
//       </Modal>

//       {/* ------------------ */}

//       {/* RESET MODAL */}

//       <Modal
//         visible={modalVisibleee}
//         animationType="slide"
//         onRequestClose={() => setModalVisibleee(false)}>
//         <View
//           style={[styless.container, styless.modalBackground]}
//           onPress={() => setModalVisibleee(false)}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             style={styles.resetscrollContainer}>
//             <View style={styles.resetContainer}>
//               <Text style={styles.resetHeading}>Reset Password</Text>
//               <Text style={styles.resetDesc}>
//                 Set the new password for your account so you can login and
//                 access all the features.
//               </Text>

//               <View style={[styless.vwphone, styles.passwordmodalContainer]}>
//                 <Text style={styles.passwordmodalText}>Password</Text>
//                 <TextInputReset
//                   Svg={<TouchableOpacity style={styless.txtin} />}
//                   state={resetpass}
//                   setState={setResetpass}
//                   secureTextEntry={secureTextEntry}
//                 />
//                 <TouchableOpacity
//                   style={styles.eyeIconContainer}
//                   onPress={togglePasswordVisibility}>
//                   {passwordVisible ? (
//                     <Image
//                       source={IMAGES.hideEye}
//                       resizeMode="center"
//                       style={styles.eyeIcon}
//                     />
//                   ) : (
//                     <Image
//                       source={IMAGES.showEye}
//                       resizeMode="center"
//                       style={styles.eyeIcon}
//                     />
//                   )}
//                 </TouchableOpacity>
//               </View>

//               <View style={[styless.vwphone, styles.inputContainer]}>
//                 <Text style={styles.input}>Confirm Password</Text>
//                 <TextInputReset
//                   Svg={<TouchableOpacity style={styles.txtin} />}
//                   state={resetconfirm}
//                   setState={setResetconfirm}
//                   secureTextEntry={secureTextEntryy}
//                 />
//                 <TouchableOpacity
//                   style={styles.eyeIconContainer}
//                   onPress={togglePasswordVisibilityy}>
//                   {passwordVisiblee ? (
//                     <Image
//                       source={IMAGES.hideEye}
//                       resizeMode="center"
//                       style={styles.eyeIcon}
//                     />
//                   ) : (
//                     <Image
//                       source={IMAGES.showEye}
//                       resizeMode="center"
//                       style={styles.eyeIcon}
//                     />
//                   )}
//                 </TouchableOpacity>
//               </View>

//               <TouchableOpacity
//                 style={styles.buttonContainerModal}
//                 onPress={() => setModalVisibleee(false)}
//                 //onPress={handleReset}
//               >
//                 <Text style={styles.buttonTextModal}>Reset Password</Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         </View>
//       </Modal>

//       {/* ------------------ */}
//     </ImageBackground>
//   );
// };
// const styles = StyleSheet.create({
// imageBg: {
//   width: '100%',
//   height: '100%',
// },
// scannerContainer: {flex: 1},
// mainContainer: {
//   flex: 1,
//   //backgroundColor: 'rgba(255, 119, 0, 0.6)',
//   backgroundColor: COLORS.ORANGE,
//   //marginBottom: moderateVerticalScale(20),
// },
// appTextContainer: {
//   justifyContent: 'center',
//   alignItems: 'center',
// },
// appTextStyle: {
//   height: moderateScale(25),
//   width: moderateScale(220),
//   marginTop: moderateVerticalScale(60),
// },
// questionContainer: {
//   alignItems: 'flex-end',
//   bottom: moderateScale(20),
// },
// questionIconStyle: {
//   height: moderateScale(25),
//   width: moderateScale(60),
//   marginTop: moderateVerticalScale(40),
//   marginEnd: moderateScale(10),
// },
// countryparentContainer: {
//   flexDirection: 'row',
//   marginTop: moderateVerticalScale(30),
// },
// countrychildContainer: {
//   width: moderateScale(85),
//   marginLeft: moderateScale(10),
//   alignSelf: 'center',
// },
// countryContainer: {
//   justifyContent: 'center',
//   alignContent: 'center',
// },
// idContainer: {
//   width: moderateScale(177),
//   marginEnd: moderateScale(6),
//   height: moderateScale(50),
//   backgroundColor: COLORS.WHITE,
//   borderRadius: moderateScale(10),
//   shadowColor: COLORS.BLACK,
//   shadowOffset: {width: 0, height: 2},
//   shadowOpacity: 0.2,
//   elevation: 10,
// },
// passwordContainer: {
//   width: moderateScale(312),
//   height: moderateScale(50),
//   backgroundColor: COLORS.WHITE,
//   borderRadius: moderateScale(10),
//   shadowColor: COLORS.BLACK,
//   shadowOffset: {width: 0, height: 2},
//   shadowOpacity: 0.2,
//   elevation: 10,
// },
// forgetextContainer: {
//   marginTop: moderateVerticalScale(15),
//   justifyContent: 'center',
//   alignItems: 'center',
// },
// forgetext: {
//   fontFamily: FONTS.MONTSERRAT_REGULAR,
// },
// loginbuttonContainer: {
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginTop: moderateVerticalScale(20),
// },
// loginbutton: {
//   borderRadius: 10,
//   fontFamily: FONTS.MONTSERRAT_REGULAR,
// },
// signupbuttonContainer: {
//   marginTop: moderateVerticalScale(20),
// },
// signupTextone: {
//   fontFamily: FONTS.MONTSERRAT_REGULAR,
// },
// signupTextwo: {
//   fontFamily: FONTS.MONTSERRAT_BOLD,
// },
// qrContainer: {
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginTop: moderateScale(40),
// },
// qrIcon: {
//   width: moderateScale(80),
//   height: moderateScale(80),
// },
// socialnetworkheadingContainer: {
//   marginTop: moderateVerticalScale(30),
// },
// socialnetworkheading: {
//   fontFamily: FONTS.MONTSERRAT_REGULAR,
// },
// socialnetworkparentContainer: {
//   marginTop: moderateVerticalScale(10),
// },
// socialnetworkchildContainer: {
//   justifyContent: 'center',
//   alignItems: 'center',
//   flexDirection: 'row',
// },
// socialnetworkIcon: {
//   height: moderateScale(30),
//   width: moderateScale(30),
//   margin: moderateScale(3),
// },

// // forgot modal

// forgotscrollContainer: {
//   //backgroundColor: '#f1f1f1',
//   backgroundColor: COLORS.WHITE,
//   borderRadius: 20,
//   marginTop: '45%',
//   alignSelf: 'center',
//   width: '80%',
// },
// forgotContainer: {
//   backgroundColor: 'transparent',
//   borderRadius: 20,
//   paddingBottom: 310,
//   //marginTop: '-25%',
//   alignItems: 'center',
//   justifyContent: 'center',
// },
// crossiconContainer: {
//   marginHorizontal: moderateScale(20),
//   alignSelf: 'flex-end',
//   alignItems: 'center',
//   marginTop: verticalScale(15),
// },
// crossicon: {
//   // marginRight: widthPercentageToDP('4%'),
//   zIndex: 1,
//   height: 20,
//   width: 20,
// },
// forgotText: {
//   marginTop: 50,
//   color: 'black',
//   //alignSelf: 'flex-start',
//   fontFamily: FONTS.MONTSERRAT_REGULAR,
//   //fontWeight: 'bold',
//   fontSize: 19,
//   zIndex: 1,
//   top: -10,
// },
// forgotDesc: {
//   color: COLORS.GREY,
//   fontFamily: FONTS.MONTSERRAT_REGULAR,
//   //fontWeight: '600',
//   fontSize: 15,
//   //width: 345,
//   width: '80%',
//   top: 10,
//   zIndex: 1,
//   lineHeight: 18,
// },
// emailContainer: {
//   width: 350,
//   alignSelf: 'center',
//   justifyContent: 'center',
//   marginLeft: -265,
//   marginTop: 45,
//   marginBottom: 5,
//   backgroundColor: 'transparent',
//   zIndex: 1,
//   top: 40,
// },
// emailText: {
//   color: COLORS.BLACK,
//   fontFamily: FONTS.MONTSERRAT_REGULAR,
//   //fontWeight: '600',
//   fontSize: 15,
//   marginHorizontal: moderateScale(10),
//   marginVertical: -10,
// },
// buttonContainer: {
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginTop: moderateVerticalScale(40),
// },
// buttonText: {
//   borderRadius: 10,
//   fontFamily: FONTS.MONTSERRAT_REGULAR,
// },

// //code modal

// codescrollContainer: {
//   //backgroundColor: '#f1f1f1',
//   backgroundColor: COLORS.WHITE,
//   borderRadius: 20,
//   marginTop: '65%',
//   alignSelf: 'center',
//   width: '80%',
// },
// codeContainer: {
//   //backgroundColor: '#f1f1f1',
//   backgroundColor: COLORS.WHITE,
//   borderRadius: 20,
//   paddingBottom: 310,
// },
// crossicontwoContainer: {
//   marginHorizontal: moderateScale(3),
//   alignSelf: 'flex-end',
//   alignItems: 'center',
//   marginTop: verticalScale(15),
// },
// crossicontwo: {
//   zIndex: 1,
//   height: 20,
//   width: 20,
//   marginEnd: moderateScale(20),
// },
// codeHeading: {
//   marginTop: 50,
//   color: COLORS.BLACK,
//   //alignSelf: 'flex-start',
//   fontFamily: FONTS.MONTSERRAT_REGULAR,
//   //fontWeight: 'bold',
//   fontSize: 19,
//   //marginLeft: 34,
//   marginHorizontal: '11%',
//   zIndex: 1,
//   top: -10,
// },
// codeDesc: {
//   alignSelf: 'flex-start',
//   color: COLORS.GREY,
//   fontFamily: FONTS.MONTSERRAT_REGULAR,
//   //fontWeight: '600',
//   fontSize: 15,
//   //width: 345,
//   //marginHorizontal: 30,
//   //marginLeft: 35,
//   width: '80%',
//   marginHorizontal: '11%',
//   top: 10,
//   zIndex: 1,
//   lineHeight: 18,
// },
// buttonContainertwo: {
//   width: 332,
//   alignSelf: 'center',
//   height: 50,
//   //backgroundColor: '#F57F17',
//   backgroundColor: COLORS.ORANGE,
//   borderRadius: 12,
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginHorizontal: 10,
//   marginBottom: 0,
//   top: 10,
//   zIndex: 1,
//   left: 2,
// },
// buttonTextwo: {
//   fontSize: 19,
//   color: COLORS.WHITE,
//   //fontWeight: 'bold',
//   fontFamily: FONTS.MONTSERRAT_BOLD,
// },

// //reset modal

// resetscrollContainer: {
//   //backgroundColor: '#f1f1f1',
//   backgroundColor: COLORS.WHITE,
//   borderRadius: 20,
//   marginTop: '45%',
//   alignSelf: 'center',
//   width: '80%',
// },
// resetContainer: {
//   //backgroundColor: '#f1f1f1',
//   backgroundColor: COLORS.WHITE,
//   borderRadius: 20,
//   paddingBottom: 310,
//   justifyContent: 'center',
//   alignItems: 'center',
// },
// resetHeading: {
//   marginTop: 50,
//   color: COLORS.BLACK,
//   alignSelf: 'flex-start',
//   fontFamily: FONTS.MONTSERRAT_REGULAR,
//   //fontWeight: 'bold',
//   fontSize: 19,
//   //marginLeft: 34,
//   marginHorizontal: '11%',
//   zIndex: 1,
//   top: -10,
// },
// resetDesc: {
//   alignSelf: 'flex-start',
//   color: COLORS.GREY,
//   fontFamily: FONTS.MONTSERRAT_REGULAR,
//   //fontWeight: '600',
//   fontSize: 15,
//   //width: 345,
//   //marginHorizontal: 30,
//   width: '80%',
//   marginHorizontal: '11%',
//   //marginLeft: 35,
//   top: 10,
//   zIndex: 1,
//   lineHeight: 18,
// },
// passwordmodalContainer: {
//   width: 350,
//   alignSelf: 'center',
//   justifyContent: 'center',
//   marginLeft: -265,
//   marginTop: 45,
//   marginBottom: 5,
//   backgroundColor: 'transparent',
//   zIndex: 1,
//   top: 40,
// },
// passwordmodalText: {
//   color: 'black',
//   fontFamily: FONTS.MONTSERRAT_REGULAR,
//   //fontWeight: '600',
//   fontSize: 15,
//   marginHorizontal: 10,
//   marginVertical: -10,
// },
// eyeIconContainer: {bottom: 58, left: 290},
// eyeIcon: {
//   height: 20,
//   width: 20,
//   //marginLeft: 5,
//   marginHorizontal: verticalScale(5),
// },
// inputContainer: {
//   width: 350,
//   alignSelf: 'center',
//   justifyContent: 'center',
//   marginLeft: -265,
//   marginTop: 45,
//   marginBottom: 5,
//   backgroundColor: 'transparent',
//   zIndex: 1,
//   top: 40,
// },
// input: {
//   color: COLORS.BLACK,
//   fontFamily: FONTS.MONTSERRAT_REGULAR,
//   //fontWeight: '600',
//   fontSize: 15,
//   marginHorizontal: 10,
//   marginVertical: -10,
// },
// buttonContainerModal: {
//   width: 332,
//   alignSelf: 'center',
//   height: 50,
//   //backgroundColor: '#F57F17',
//   backgroundColor: COLORS.ORANGE,
//   borderRadius: 12,
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginHorizontal: 10,
//   marginBottom: 0,
//   top: 50,
//   zIndex: 1,
//   left: 2,
// },
// buttonTextModal: {
//   fontSize: 19,
//   color: COLORS.WHITE,
//   fontFamily: FONTS.MONTSERRAT_BOLD,
// },
// });

// export default Login;
