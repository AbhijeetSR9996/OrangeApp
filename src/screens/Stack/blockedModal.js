import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {
  moderateScale,
  scale,
  verticalScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import AppButton from '../../components/Button/AppButton';
import {IMAGES} from '../../constants/images';
import {FONTS} from '../../constants/fonts';
import {COLORS} from '../../constants/colors';

const BlockedModal = ({navigation}) => {
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
    <ImageBackground style={styles.container} source={IMAGES.blockedBg}>
      <SafeAreaView style={styles.safearea}>
        <Image
          source={IMAGES.blockedtitle}
          resizeMode="center"
          style={styles.image}
        />
        <Text style={styles.text}>
          We have blocked your user due to several failed attempts to the App.
          This happens because you entered the password and/or your ID
          incorrectly. To unlock your user, fill out the form with your
          information so that they can enable your user again. Please note that
          the estimated unlock time is 15 minutes.
        </Text>

        <View style={styles.buttonContainer}>
          <AppButton
            onPress={() => navigation.navigate('Unlockform')}
            btnText={'Form'}
            btnStyle={styles.btnText}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default BlockedModal;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  safearea: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
    elevation: 8,
    width: 320,
    marginVertical: verticalScale(150),
  },
  image: {height: 30, width: 270},
  text: {
    alignSelf: 'center',
    color: COLORS.GREY,
    fontSize: scale(12),
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //width: 260,
    width: moderateScale(250),
    textAlign: 'justify',
    lineHeight: 16,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateVerticalScale(10),
  },
  btnText: {
    borderRadius: 10,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    width: moderateScale(150),
  },
});
