import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
  Alert,
} from 'react-native';
import TextInputGlobal from '../../styles/unlockform/TextInputGlobal';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { IMAGES } from '../../constants/images';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';

const { HEIGHT, WIDTH } = Dimensions.get('window');

const Unlockform = ({ navigation }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');

  const strongRegex = new RegExp(
    '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
  );

  const handleUnlocking = () => {
    if (id == '') {
      Alert.alert('Error', 'ID is required.');
      return;
    } else if (id.length < 10) {
      Alert.alert('Error', 'Enter a valid ID.');
    } else if (name == '') {
      Alert.alert('Error', 'Name is required.');
      return;
    } else if (surname == '') {
      Alert.alert('Error', 'Surname is required.');
    } else if (email == '') {
      Alert.alert('Error', 'Email is required.');
    } else if (!strongRegex.test(email)) {
      Alert.alert('Error', 'Enter a valid email.');
    } else {
      navigation.navigate('RequestModal');
    }
  };

  return (
    <ImageBackground
      style={styles.bgContainer}
      source={IMAGES.unlockformBg}
      imageStyle={styles.image}>
      <ImageBackground style={styles.imageBg} source={IMAGES.splashBg}>
        <View style={styles.headingContainer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.goBack()}>
            <Image style={styles.icon} source={IMAGES.backIcon} />
          </TouchableOpacity>
          <Image style={styles.unlockTxt} source={IMAGES.unlockText} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}>
          <View style={styles.bodyContainer}>
            <View style={[styles.vwphone, styles.idContainer]}>
              <Text style={styles.idText}>ID</Text>
              <TextInputGlobal
                Svg={<TouchableOpacity style={styles.txtin} />}
                state={id}
                setState={setId}
                maxLength={10}
                keyboardType={'numeric'}
              />
            </View>
            <View style={[styles.vwphone, styles.nameContainer]}>
              <Text style={styles.nameText}>Names</Text>
              <TextInputGlobal
                Svg={<TouchableOpacity style={styles.txtin} />}
                state={name}
                setState={setName}
              />
            </View>
            <View style={[styles.vwphone, styles.surnameContainer]}>
              <Text style={styles.surnameText}>Surnames</Text>
              <TextInputGlobal
                Svg={<TouchableOpacity style={styles.txtin} />}
                state={surname}
                setState={setSurname}
              />
            </View>
            <View style={[styles.vwphone, styles.mailContainer]}>
              <Text style={styles.mailText}>Mail</Text>
              <TextInputGlobal
                Svg={<TouchableOpacity style={styles.txtin} />}
                state={email}
                setState={setEmail}
              />
            </View>
            <View style={[styles.vwphone, styles.parentbuttonContainer]}>
              <TouchableOpacity
                style={styles.childbuttonContainer}
                onPress={() => navigation.navigate('RequestModal')}
              //onPress={handleUnlocking}
              >
                <Text style={styles.buttonText}>Send request</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  );
};

export default Unlockform;

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    flexGrow: 1,
  },
  image: { bottom: '58%' },
  imageBg: {
    flex: 1,
    flexGrow: 1,
  },
  headingContainer: {
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    //backgroundColor: 'red',
    flexDirection: 'column',
    marginTop: 20,
  },
  iconContainer: {
    marginHorizontal: 30,
    backgroundColor: 'transparent',
    width: '85%',
  },
  icon: {
    height: 15,
    width: 15,
    borderRadius: 10,
  },
  unlockTxt: {
    height: 50,
    width: 140,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 40,
    top: 20,
  },
  vwphone: {
    height: 67,
    width: 215,
    //backgroundColor:'white',
    bottom: 67,
    left: 135,
  },
  txtin: {
    flexDirection: 'row',
    alignItems: 'center',
    top: '30%',
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    color: COLORS.GREY,
  },
  scrollContainer: {
    marginTop: '15%',
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    //borderRadius: 20,
  },
  bodyContainer: {
    borderRadius: 20,
    paddingBottom: 90,
  },
  idContainer: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: 45,
    marginBottom: 5,
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 25,
  },
  idText: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //fontWeight: '600',
    fontSize: 20,
    marginHorizontal: 15,
    marginVertical: -10,
  },
  nameContainer: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: 25,
    marginBottom: 5,
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 30,
  },
  nameText: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //fontWeight: '600',
    fontSize: 20,
    marginHorizontal: 15,
    marginVertical: -10,
  },
  surnameContainer: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: 30,
    marginBottom: 7,
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 30,
  },
  surnameText: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //fontWeight: '600',
    fontSize: 20,
    marginHorizontal: 15,
    marginVertical: -10,
  },
  mailContainer: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 30,
  },
  mailText: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //fontWeight: '600',
    fontSize: 20,
    marginHorizontal: 15,
    marginVertical: -10,
  },
  parentbuttonContainer: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: 30,
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 30,
  },
  childbuttonContainer: {
    width: 330,
    alignSelf: 'center',
    height: 50,
    //backgroundColor: '#F57F17',
    backgroundColor: COLORS.ORANGE,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 15,
    elevation: 5,
  },
  buttonText: {
    fontSize: 19,
    color: COLORS.WHITE,
    //fontWeight: 'bold',
    fontFamily: FONTS.MONTSERRAT_BOLD,
  },
});
