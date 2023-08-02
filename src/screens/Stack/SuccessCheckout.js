import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import AppButton from '../../components/Button/AppButton';
import AppText from '../../components/Text/appText';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';
import { IMAGES } from '../../constants/images';
import { AuthContext } from '../../API_Services/Context';

const SuccessCheckOut = ({ navigation, route }) => {
  const { signOut } = useContext(AuthContext);
  const { result } = route.params;

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    openModal();
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ImageBackground style={styles.bgContainer} source={IMAGES.qrpopupBg}>
      <View style={styles.mainContainer}>
        <View style={styles.headingContainer}>
          <AppText
            textTitleStyle={styles.headingText}
            signUpTitle={'You are successfully'}
          />
          <AppText
            textTitleStyle={styles.headingText}
            signUpTitle={'checked-out!'}
          />
        </View>

        <View style={styles.headingContainer}>
          <AppText
            textTitleStyle={styles.dataText}
            signUpTitle={'Date: ' + result.data.date}
          />
          <AppText
            textTitleStyle={styles.dataText}
            signUpTitle={'Time: ' + result.data.time}
          />
          {/* <AppText
            textTitleStyle={styles.dataText}
            signUpTitle={'Lat: ' + result.data.latitude}
            signUpSubTitle={'Long: ' + result.data.longitude}
          /> */}
          <AppText
            textTitleStyle={styles.dataTextloc}
            signUpTitle={'Address: ' + result.data.location}
          />
        </View>

        <View style={styles.modalContainer}>
          <Image source={IMAGES.tickIcon} style={styles.imageTick} />
          <Image source={IMAGES.modaldesc} style={styles.imageText} />
          <View style={styles.buttonContainer}>
            <AppButton
              //onPress={() => navigation.navigate('TabNav')}
              onPress={() => signOut()}
              btnText={'Confirm'}
              btnStyle={styles.buttonText}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SuccessCheckOut;

const styles = StyleSheet.create({
  bgContainer: {
    width: '100%',
    height: '100%',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 119, 0, 0.6)',
  },
  headingContainer: {
    marginTop: moderateVerticalScale(80),
  },
  headingText: {
    fontFamily: FONTS.MONTSERRAT_SEMI_BOLD,
    fontSize: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: verticalScale(100),
  },
  dataText: {
    fontFamily: FONTS.MONTSERRAT_BOLD,
    fontSize: 15,
    marginVertical: verticalScale(5),
  },
  dataTextloc: {
    fontFamily: FONTS.MONTSERRAT_BOLD,
    fontSize: 15,
    textAlign: 'center',
    top: verticalScale(5),
  },
  imageTick: {
    height: 80,
    width: 80,
    marginTop: verticalScale(20),
  },
  imageText: {
    height: 60,
    width: 300,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateVerticalScale(10),
  },
  buttonText: {
    borderRadius: 10,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 10,
  },
});
