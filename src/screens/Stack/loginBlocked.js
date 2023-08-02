import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';
import { IMAGES } from '../../constants/images';
import AppButton from '../../components/Button/AppButton';
import AppText from '../../components/Text/appText';
import AppTextForget from '../../components/Text/appTextForget';
import TextInputCode from '../../styles/countrycode/TextInputCode';
import TextInputWithLabel from '../../components/TextInput/textinputWithLabel';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useNavigation } from '@react-navigation/native';

const LoginBlocked = () => {
  const [value, setValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisiblee, setModalVisiblee] = useState(false);
  const [modalVisibleee, setModalVisibleee] = useState(false);
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [resetpass, setResetpass] = useState('');
  const [resetconfirm, setResetconfirm] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [selectedCountryCode, setSelectedCountryCode] = useState('1');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [isVisible, setVisible] = useState(true);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const CELL_COUNT = 4;
  const navigation = useNavigation();
  const [countryCodeVisible, setCountryCodeVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
    setModalVisiblee(false);
    setModalVisibleee(false);
  };

  const openModalll = () => {
    setModalVisible(false);
    setModalVisiblee(false);
    setModalVisibleee(true);
  };

  const onSelect = country => {
    setSelectedCountry(country.cca2);
    setSelectedCountryCode(country.callingCode[0]);
  };

  const handleUserBlocked = () => {
    navigation.navigate('BlockedModal');
  };
  return (
    <ImageBackground style={styles.imagebg} source={IMAGES.loginBg}>
      <View style={styles.child}>
        <View style={styles.appTextContainer}>
          <Image
            resizeMode="contain"
            source={IMAGES.appText}
            style={styles.appTextStyle}
          />

          <View style={styles.countrycodeparentContainer}>
            <TextInputCode
              Svg={
                <View style={styles.countrycodechildContainer}>
                  <Image
                    source={IMAGES.countrycodeIcon}
                    style={styles.countrycodeImage}
                  />
                </View>
              }
            />
            <TextInputWithLabel
              value={mobileNumber}
              onChangeText={e => setMobileNumber(e)}
              placeHolder={'ID'}
              placeholderTextColor={COLORS.GREY}
              keyboardType={'numeric'}
              editable={false}
              inputStyle={styles.countrycodeInput}
            />
          </View>

          <View>
            <TextInputWithLabel
              value={password}
              onChangeText={e => setPassword(e)}
              placeHolder={'Enter your password'}
              placeholderTextColor={COLORS.GREY}
              editable={false}
              inputStyle={styles.passwordInput}
            />
          </View>
        </View>
        <View style={styles.forgetextContainer}>
          <AppTextForget
            disabled={true}
            textForgetTitleStyle={styles.forgetext}
            title={`Did you forget your password?`}
          />
        </View>
        <View style={styles.loginbuttonContainer}>
          <AppButton
            disabled={true}
            onPress={() => handleUserBlocked()}
            btnText={'Enter'}
            btnStyle={styles.loginbutton}
          />
        </View>

        <View style={styles.signupbuttonContainer}>
          <AppText
            disabled={true}
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
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  imagebg: {
    width: '100%',
    height: '100%',
  },
  child: {
    flex: 1,
    backgroundColor: 'rgba(255, 119, 0, 0.6)',
  },
  appTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateVerticalScale(60),
  },
  appTextStyle: {
    height: moderateScale(25),
    width: moderateScale(220),
    marginTop: moderateVerticalScale(60),
  },
  appTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateVerticalScale(60),
  },
  countrycodeparentContainer: {
    flexDirection: 'row',
    marginTop: moderateVerticalScale(30),
  },
  countrycodechildContainer: {
    width: moderateScale(85),
    marginLeft: moderateScale(10),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countrycodeImage: {
    height: moderateScale(50),
    width: moderateScale(110),
    marginHorizontal: moderateScale(-10),
    marginVertical: moderateScale(-15),
  },
  countrycodeInput: {
    width: moderateScale(177),
    marginEnd: moderateScale(6),
    height: moderateScale(50),
    backgroundColor: COLORS.PINK,
    borderRadius: moderateScale(10),
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 10,
  },
  passwordInput: {
    width: moderateScale(312),
    height: moderateScale(50),
    backgroundColor: COLORS.PINK,
    borderRadius: moderateScale(10),
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 10,
    marginStart: moderateScale(3),
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
    marginTop: moderateScale(50),
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
});

export default LoginBlocked;
