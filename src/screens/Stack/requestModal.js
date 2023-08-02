import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  moderateScale,
  scale,
  verticalScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {IMAGES} from '../../constants/images';
import {COLORS} from '../../constants/colors';
import {FONTS} from '../../constants/fonts';
import AppText from '../../components/Text/appText';

const RequestModal = ({navigation}) => {
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
    <ImageBackground
      style={styles.bgContainer}
      source={IMAGES.requestmodalBg}
      imageStyle={styles.bgImage}>
      <ImageBackground
        style={styles.img}
        //source={IMAGES.splashBg}
      >
        <View style={styles.headingContainer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate('Login')}>
            <Image style={styles.icon} source={IMAGES.backIcon} />
          </TouchableOpacity>

          <Image style={styles.unlockText} source={IMAGES.unlockblurText} />
        </View>
        <View style={styles.bodyContainer}>
          <SafeAreaView style={styles.modalContainer}>
            <Image
              source={IMAGES.requestTitle}
              resizeMode="center"
              style={styles.modalImage}
            />
            <View style={styles.socialnetworkheadingContainer}>
              <AppText
                textTitleStyle={styles.socialnetworkheading}
                signUpTitle={`We have successfully received your request to unlock your user. We will give you a solution as soon as possible, however remember to be aware of your Email, App or SMS, since the information will arrive there to continue with the process.`}
              />
            </View>
            {/* <Text style={styles.modalText}>
              We have successfully received your request to unlock your user. We
              will give you a solution as soon as possible, however remember to
              be aware of your Email, App or SMS, since the information will
              arrive there to continue with the process.
            </Text> */}
          </SafeAreaView>
          <View style={styles.parentimageContainer} />
          <View style={styles.childimageContainer}>
            <Image style={styles.image} source={IMAGES.requestblurTitle} />
          </View>
        </View>
      </ImageBackground>
    </ImageBackground>
  );
};

export default RequestModal;

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    flexGrow: 1,
  },
  bgImage: {
    //bottom: '53%',
    bottom: verticalScale(360),
  },
  img: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: 'rgba(255, 119, 0, 0.7)',
    //backgroundColor: COLORS.ORANGE,
  },
  headingContainer: {
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    marginTop: moderateVerticalScale(20),
    zIndex: 1,
  },
  iconContainer: {
    marginHorizontal: moderateScale(30),
    backgroundColor: 'transparent',
    width: moderateScale(85),
  },
  icon: {
    height: moderateScale(15),
    width: moderateScale(10),
    borderRadius: 10,
  },
  unlockText: {
    height: moderateScale(50),
    width: moderateScale(140),
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 60,
    bottom: 5,
  },
  bodyContainer: {
    flex: 1,
    //flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: '-5%',
    //marginVertical: '57%',
    //marginLeft: '5%',
    marginHorizontal: '0%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    opacity: 0.99,
    zIndex: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    //marginVertical: '27%',
    marginVertical: verticalScale(80),
    //marginLeft: '5%',
    marginHorizontal: moderateScale(3),
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
    elevation: 8,
    alignSelf: 'center',
    width: moderateScale(315),
    bottom: verticalScale(50),
    zIndex: 2,
  },
  modalImage: {
    height: verticalScale(30),
    width: moderateScale(220),
    marginTop: moderateVerticalScale(10),
  },
  modalText: {
    //marginBottom: 10,
    //bottom: 30,
    alignSelf: 'center',
    color: COLORS.GREY,
    fontSize: 13,
    fontFamily: FONTS.MONTSERRAT_SEMI_BOLD,
    width: 255,
    textAlign: 'justify',
    lineHeight: 16,
  },
  parentimageContainer: {
    width: 325,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    //marginTop: -50,
    backgroundColor: COLORS.WHITE,
    height: 50,
    left: 132,
    top: -185,
    borderRadius: 10,
    zIndex: 1,
    opacity: 0.4,
    elevation: 5,
  },
  childimageContainer: {
    width: 325,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    //backgroundColor: '#F57F17',
    backgroundColor: COLORS.ORANGEDARK,
    height: 50,
    left: 135,
    //marginBottom:'10%',
    top: '-10%',
    borderRadius: 10,
    zIndex: 1,
    opacity: 0.8,
    elevation: 5,
    zIndex: 0,
  },
  image: {
    //height: 50,
    alignSelf: 'center',
    marginTop: 20,
    //marginHorizontal: 10,
    height: 50,
    width: 150,
  },
  socialnetworkheadingContainer: {
    //marginTop: moderateVerticalScale(0),
  },
  socialnetworkheading: {
    color: COLORS.GREYDARK,
    fontSize: scale(13),
    fontFamily: FONTS.MONTSERRAT_SEMI_BOLD,
    //width: 255,
    width: moderateScale(250),
    textAlign: 'justify',
    //lineHeight: 16,
  },
});
