import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Image,
  SafeAreaView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import TextInputWithLabel from '../../components/TextInput/textinputWithLabel';
import AppText from '../../components/Text/appText';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
//import Checkboxx from '../../components/Others/checkBoxx';
import DocumentPicker from 'react-native-document-picker';
// import * as ImagePicker from 'react-native-image-picker';
import { IMAGES } from '../../constants/images';
import CircularProgress from 'react-native-circular-progress-indicator';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';
import {
  getUserProfile,
  updateUserProfile,
  updateProfileImage,
} from '../../API_Services/Call_API';
import AppButton from '../../components/Button/AppButton';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    getdetails();
  }, []);

  const getdetails = async () => {
    const response = await getUserProfile();
    if (response?.status) {
      setName(response?.Profile_data?.name);
      setSurname(response?.Profile_data?.surname);
      setPhone(response?.Profile_data?.id);
      setEmail(response?.Profile_data?.mail);
      setUserImage(response?.Profile_data?.profile);
    } else {
      Toast.show({
        type: 'error',
        text1: response?.message,
      })
    }
  };

  const handleProfileUpdate = async () => {
    const data = {
      name: name,
      surname: surname,
      phone: phone,
      mail: email,
    };
    const response = await updateUserProfile(data);
    if (response?.status) {
      Toast.show({
        type: 'success',
        text1: response?.message,
      })
      navigation.goBack();
    } else {
      Toast.show({
        type: 'error',
        text1: response?.message ? response?.message : "Please Try Again!",
      })
    }
  };

  const selectImage = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setUserImage(res.uri);
      handleUpdateProfileImage(res)
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        Toast.show({
          type: 'error',
          text1: 'User cancelled the upload',
        });
      else console.log(err);
    }
  };

  const handleUpdateProfileImage = async (res) => {
    let data = new FormData();
    data.append('profile', res);
    const response = await updateProfileImage(data)
    if (response?.status) {
      Toast.show({
        type: 'success',
        text1: response?.message,
      })
      getdetails()
    } else {
      Toast.show({
        type: 'error',
        text1: response?.message ? response?.message : "Please Try Again!",
      })
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardavoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'null'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.containerprofile}>
            <CircularProgress
              //initialValue={10}
              value={100}
              radius={75}
              inActiveStrokeOpacity={0.1}
              activeStrokeWidth={10}
              inActiveStrokeWidth={10}
              activeStrokeColor={COLORS.ORANGE}
              progressValueColor={COLORS.WHITELIGHT}
              progressValueStyle={styles.progressVal}
              maxValue={100}
              valuePrefix={'Profile '}
              valuePrefixStyle={styles.valPrefix}
              valueSuffix={'%'}
              valueSuffixStyle={styles.valSuffix}
              title={' complete'}
              //titleColor={COLORS.WHITELIGHT}
              titleStyle={styles.titleStyle}
              progressValueFontSize={20}
            />
            <TouchableOpacity style={styles.imageStyle} onPress={() => selectImage()}>
              <Image source={userImage ? { uri: userImage } : IMAGES.dummyDp} style={styles.imagePic} />
            </TouchableOpacity>
          </View>

          <View style={[styles.vwphone, styles.nameContainer]}>
            <View style={styles.socialnetworkheadingContainer}>
              <AppText
                textTitleStyle={styles.socialnetworkheading}
                signUpTitle={'Names*'}
              />
            </View>
            <View>
              <TextInputWithLabel
                value={name}
                onChangeText={e => setName(e)}
                inputStyle={styles.inputfield}
              />
            </View>
          </View>
          <View style={[styles.vwphone, styles.surnameContainer]}>
            <View style={styles.socialnetworkheadingContainertwo}>
              <AppText
                textTitleStyle={styles.socialnetworkheading}
                signUpTitle={'Surnames*'}
              />
            </View>
            <View>
              <TextInputWithLabel
                value={surname}
                onChangeText={e => setSurname(e)}
                inputStyle={styles.inputfield}
              />
            </View>
          </View>
          <View style={[styles.vwphone, styles.surnameContainer]}>
            <View style={styles.socialnetworkheadingContainertwo}>
              <AppText
                textTitleStyle={styles.socialnetworkheading}
                signUpTitle={'Phone*'}
              />
            </View>
            <View>
              <TextInputWithLabel
                editable={false}
                value={"+" + phone}
                onChangeText={e => setPhone(e)}
                inputStyle={styles.inputfield}
              />
            </View>
          </View>
          <View style={[styles.vwphone, styles.surnameContainer]}>
            <View style={styles.socialnetworkheadingContainertwo}>
              <AppText
                textTitleStyle={styles.socialnetworkheading}
                signUpTitle={'Email*'}
              />
            </View>
            <View>
              <TextInputWithLabel
                editable={false}
                value={email}
                onChangeText={e => setEmail(e)}
                inputStyle={styles.inputfield}
              />
            </View>
          </View>

          <View style={styles.loginbuttonContainer}>
            <AppButton
              onPress={() => handleProfileUpdate()}
              btnText={'Update Profile'}
              btnStyle={styles.loginbutton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: COLORS.WHITE,
  },
  keyboardavoid: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    flexGrow: 1,
  },
  nameContainer: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -275,
    marginTop: 125,
    backgroundColor: 'transparent',
  },
  name: {
    marginBottom: -10,
    //bottom: 15,
    alignSelf: 'flex-start',
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //fontWeight: '600',
    marginHorizontal: 15,
    fontSize: 20,
  },
  surnameContainer: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -275,
    marginTop: 50,
    backgroundColor: 'transparent',
  },
  surname: {
    marginTop: -40,
    marginBottom: -10,
    //bottom: 15,
    alignSelf: 'flex-start',
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //fontWeight: '600',
    marginHorizontal: 15,
    fontSize: 20,
  },
  surnameinput: { backgroundColor: COLORS.ORANGE },
  documentContainer: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -275,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  document: {
    marginTop: -70,
    marginBottom: 0,
    //bottom: 15,
    alignSelf: 'flex-start',
    marginHorizontal: 15,
    fontSize: 20,
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //fontWeight: '600',
  },
  downloadContainer: {
    alignItems: 'center',
    marginBottom: moderateVerticalScale(10),
    backgroundColor: COLORS.WHITEGRAIN,
    height: 50,
    width: 50,
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 10,
    marginLeft: 70,
  },
  download: {
    height: 35,
    width: 35,
    alignSelf: 'center',
  },
  downloadimage: { position: 'absolute' },
  checkboxContainer: {
    alignItems: 'center',
    bottom: moderateVerticalScale(60),
    marginBottom: moderateVerticalScale(70),
    backgroundColor: 'transparent',
    height: 80,
    width: 160,
    justifyContent: 'space-between',
    borderRadius: 10,
    marginLeft: 170,
  },
  idContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  id: {
    marginBottom: 20,
    top: 10,
    alignSelf: 'center',
    fontSize: 18,
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //fontWeight: '600',
    //width:200,
    //flexShrink:10
    letterSpacing: 0,
  },
  idnumber: {
    marginBottom: 20,
    top: 10,
    alignSelf: 'center',
    fontSize: 18,
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //fontWeight: '600',
    //width:200,
    //flexShrink:10
    letterSpacing: -1,
  },
  cityContainer: {
    marginBottom: 20,
    top: 10,
    alignSelf: 'center',
    fontSize: 18,
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //fontWeight: '600',
    //width:200,
    //flexShrink:10
    letterSpacing: -1,
  },
  city: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -275,
    marginTop: -75,
    backgroundColor: 'transparent',
  },
  vwphone: {
    height: 67,
    width: 215,
    bottom: 67,
    left: 135,
  },
  font1: {
    fontSize: 16,
  },
  txtin: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
    top: '30%',
  },
  socialnetworkheadingContainer: {
    marginTop: moderateVerticalScale(0),
    marginBottom: moderateVerticalScale(10),
    alignItems: 'flex-start',
  },
  socialnetworkheadingContainertwo: {
    marginTop: moderateVerticalScale(-10),
    marginBottom: moderateVerticalScale(10),
    alignItems: 'flex-start',
  },
  socialnetworkheadingContainerthree: {
    marginTop: moderateVerticalScale(-40),
    marginBottom: moderateVerticalScale(10),
    alignItems: 'flex-start',
  },
  socialnetworkheadingContainerfour: {
    marginTop: moderateVerticalScale(10),
    marginBottom: moderateVerticalScale(10),
    alignItems: 'flex-start',
  },
  socialnetworkheading: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //fontWeight: '600',
    marginHorizontal: moderateScale(10),
    fontSize: 20,
  },
  inputfield: {
    width: moderateScale(315),
    height: moderateScale(50),
    backgroundColor: '#fff1e6',
    borderRadius: moderateScale(10),
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 0,
  },
  loginbuttonContainer: {
    alignItems: 'center',
    marginBottom: moderateVerticalScale(50),
    marginTop: -moderateVerticalScale(30),
  },
  loginbutton: {
    borderRadius: moderateScale(10),
    fontFamily: FONTS.MONTSERRAT_REGULAR,
  },
  containerprofile: {
    marginTop: '10%',
    marginBottom: '-10%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  progressVal: {
    fontSize: 19,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //fontWeight: '600',
    top: '85%',
    right: '130%',
  },
  valPrefix: {
    color: COLORS.WHITELIGHT,
    fontSize: 19,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //fontWeight: '600',
    top: '85%',
    right: '130%',
  },
  valSuffix: {
    color: COLORS.WHITELIGHT,
    fontSize: 19,
    fontFamily: FONTS.MONTSERRAT_BOLD,
    //fontWeight: '600',
    top: '85%',
    right: '130%',
  },
  titleStyle: {
    fontSize: 19,
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_SEMI_BOLD,
    //fontWeight: '600',
    top: '64%',
    //left: '49%',
    marginLeft: moderateScale(125),
  },
  imageStyle: {
    flex: 1,
    height: 120,
    width: 120,
    alignItems: 'center',
    //backgroundColor: '#FF8000',
    borderRadius: 70,
    bottom: '50%',
  },
  imagePic: {
    //flex: 1,
    height: 120,
    width: 120,
    //alignItems: 'center',
    //backgroundColor: '#FF8000',
    borderRadius: 70,
    //bottom: '50%',
  },
});