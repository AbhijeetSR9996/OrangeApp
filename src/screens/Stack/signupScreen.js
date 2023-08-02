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
} from 'react-native';
import TextInputGlobal from '../../styles/signup/TextInputGlobal';
import CheckBox from '@react-native-community/checkbox';
import DocumentPicker from 'react-native-document-picker';
import SelectDropdown from 'react-native-select-dropdown';
import CountryPicker from 'react-native-country-picker-modal';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { IMAGES } from '../../constants/images';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';
import AppText from '../../components/Text/appText';
import AppButton from '../../components/Button/AppButton';
import TextInputWithLabel from '../../components/TextInput/textinputWithLabel';
import {
  getAllCities,
  getAllCountry,
  getAllState,
  validateSignUP,
} from '../../API_Services/Call_API';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const Signup = ({ navigation, route }) => {
  const [country, setCountry] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [city, setCity] = useState([]);

  //const [id, setId] = useState('');
  const [mobile, setMobile] = useState('');

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setVisible] = useState(true);
  const [repeatpassword, setRepeatassword] = useState('');
  const [isVisiblee, setVisiblee] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [attach_photo, setAttach_photo] = useState();
  const [identity_document, setIdentity_document] = useState();
  const [attach_passport, setAttach_passport] = useState();
  const [attach_work_visa, setAttach_work_visa] = useState();

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredCountry, setFilteredCountry] = useState([]);
  //const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedState, setSelectedState] = useState({});
  //const [selectedCity, setSelectedCity] = useState({});
  const [selectedCity, setSelectedCity] = useState(null);
  const [filteredCity, setFilteredCity] = useState([]);

  //for fetching names
  const [countryname, setCountryName] = useState();
  const [statename, setStateName] = useState();
  const [cityname, setCityName] = useState(null);

  //-----------for signup----------//
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [passwordVisiblee, setPasswordVisiblee] = useState(false);
  const [secureTextEntryy, setSecureTextEntryy] = useState(true);

  //---------for country code picker---------//
  const toggleCountryCodeVisibility = () => {
    setCountryCodeVisible(!countryCodeVisible);
  };
  const onSelect = country => {
    setSelectCountry(country.cca2);
    setSelectedCountryCode(country.callingCode[0]);
  };
  const [selectedCountryCode, setSelectedCountryCode] = useState('1');
  const [selectCountry, setSelectCountry] = useState('US');
  const [countryCodeVisible, setCountryCodeVisible] = useState(false);
  //-------------------------------

  useEffect(() => {
    getCountry();
    getState();
    getCities();
  }, [selectedCountry, selectedState, selectedCity]);

  const getCountry = async () => {
    try {
      const response = await getAllCountry();
      if (response?.status) {
        const data = response?.all_country;
        //console.log('data ', data);
        setCountry(data);
        setFilteredCountry(data);
      } else {
        console.warn('All Country API Error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getState = async () => {
    try {
      let id = selectedCountry.id;
      let name = selectedCountry.name;
      setCountryName(name);
      const response = await getAllState(id);
      if (response?.status) {
        const data = response?.all_states;
        setStateData(data);
      } else {
        console.warn('All State API Error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCities = async () => {
    try {
      let id = selectedState.id;
      let name = selectedState.name;
      setStateName(name);
      const response = await getAllCities(id);
      if (response?.status) {
        const data = response?.all_city;
        setCity(data);
        setFilteredCity(data);
      }
      else {
        console.warn('All State API Error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchCountry = (text) => {
    // Filter the country data based on the search text
    const filteredDataCountry = country.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCountry(filteredDataCountry);
  };

  const handleSearchCity = (text) => {
    // Filter the country data based on the search text
    const filteredDataCity = city.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCity(filteredDataCity);
  };

  //-------------for combining code with phone number
  console.log('new', `${selectedCountryCode}${mobile}`);
  let updatePhone = `${selectedCountryCode}${mobile}`;
  console.log('update_phone_signup', updatePhone);
  //-----------------------


  const handleRegister = () => {
    let data = new FormData();
    data.append('country', countryname);
    data.append('state', statename);
    //data.append('city', selectedCity?.id);
    //data.append('city', cityname);
    data.append('city', selectedCity?.name);
    data.append('id', updatePhone);
    data.append('name', name);
    data.append('surname', surname);
    data.append('phone', phone);
    data.append('mail', email);
    data.append('password', password);
    data.append('repeat_password', repeatpassword);
    data.append('identity_document', identity_document);
    data.append('attach_passport', attach_passport);
    data.append('attach_work_visa', attach_work_visa);
    data.append('attach_photo', attach_photo);

    validateSignUP(data)
      .then(response => {
        if (response?.status) {
          Toast.show({
            type: 'success',
            text1: response?.message,
          });
          navigation.navigate('Login');
        } else {
          Toast.show({
            type: 'error',
            text1: response?.message,
          });
          //console.warn('ID/Email Must be Unique');
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        // Code to execute after the promise resolves or rejects
      });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    setSecureTextEntry(!secureTextEntry);
  };

  const togglePasswordVisibilityy = () => {
    setPasswordVisiblee(!passwordVisiblee);
    setSecureTextEntryy(!secureTextEntryy);
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
    //console.log("onclick---", isChecked);
  };

  const strongRegex = new RegExp('^[a-z0-9_.+-]+@[a-z0-9-]+.[a-z0-9-.]+$');

  const handleUnlocking = () => {
    if (!selectedCountry) {
      Toast.show({
        type: 'error',
        text1: 'Please select your country.',
      });
      return;
    } else if (!selectedState) {
      Toast.show({
        type: 'error',
        text1: 'Please select your state.',
      });
      return;
    } else if (!selectedCity) {
      Toast.show({
        type: 'error',
        text1: 'Please select your city.',
      });
      return;
    } else if (mobile == '') {
      Toast.show({
        type: 'error',
        text1: 'ID is required.',
      });
      return;
    } else if (mobile.length < 8) {
      Toast.show({
        type: 'error',
        text1: 'Minimum 8 digits allowed.',
      });
      return;
    } else if (name == '') {
      Toast.show({
        type: 'error',
        text1: 'Name is required.',
      });
      return;
    } else if (surname == '') {
      Toast.show({
        type: 'error',
        text1: 'Surname is required.',
      });
      return;
    } else if (mobile === phone) {
      Toast.show({
        type: 'error',
        text1: 'Alternate Phone No. & ID should not be same.',
      });
      return;
    } else if (email == '') {
      Toast.show({
        type: 'error',
        text1: 'Email is required.',
      });
      return;
    } else if (!strongRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Enter a valid email.',
      });
      return;
    } else if (password == '') {
      Toast.show({
        type: 'error',
        text1: 'Password is required.',
      });
      return;
    } else if (password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Minimum 6 character is allowed.',
      });
      return;
    } else if (repeatpassword == '') {
      Toast.show({
        type: 'error',
        text1: 'Repeat Password is required.',
      });
      return;
    } else if (repeatpassword.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Minimum 6 character is allowed.',
      });
      return;
    } else if (password != repeatpassword) {
      Toast.show({
        type: 'error',
        text1: 'Password does not match.',
      });
      return;
    } else if (identity_document == null) {
      Toast.show({
        type: 'error',
        text1: 'Identity document is required.',
      });
      return;
    } else if (attach_passport == null) {
      Toast.show({
        type: 'error',
        text1: 'Passport is required.',
      });
      return;
    } else if (attach_work_visa == null) {
      Toast.show({
        type: 'error',
        text1: 'Visa is required.',
      });
      return;
    } else if (attach_photo == null) {
      Toast.show({
        type: 'error',
        text1: 'Photo is required.',
      });
      return;
    } else if (isChecked == false) {
      Toast.show({
        type: 'error',
        text1: 'Please agree to Terms & Conditions.',
      });
      return;
    } else {
      handleRegister();
    }
  };

  // -----------image start--

  const selectImage = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      setAttach_photo(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        Toast.show({
          type: 'error',
          text1: 'User cancelled the upload',
        });
      else console.log(err);
    }
  };

  // -----------image end--

  //------for Document1 start---
  const selectPdf = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      setIdentity_document(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        Toast.show({
          type: 'error',
          text1: 'User cancelled the upload',
        });
      else console.log(err);
    }
  };
  //------for Document1 end---

  //------for Document2 start---
  const selectPdff = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      setAttach_passport(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        Toast.show({
          type: 'error',
          text1: 'User cancelled the upload',
        });
      else console.log(err);
    }
  };
  //------for Document2 end---

  //------for Document3 start---
  const selectPdfff = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      const { uri, name } = res;
      setAttach_work_visa(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        Toast.show({
          type: 'error',
          text1: 'User cancelled the upload',
        });
      else console.log(err);
    }
  };
  //------for Document3 end---

  return (
    <ImageBackground
      style={styles.bgContainer}
      source={IMAGES.unlockformBg}
      imageStyle={styles.bg}>
      <ImageBackground style={styles.bgContainer} source={IMAGES.splashBg}>
        <View style={styles.headingContainer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.goBack()}>
            <Image style={styles.icon} source={IMAGES.backIcon} />
          </TouchableOpacity>
          <Image style={styles.headingText} source={IMAGES.signupText} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}>
          <View style={styles.mainContainer}>

            {/* COUNTRY DROPDOWN */}

            <View style={[styles.vwphone, styles.countryContainer]}>
              <View style={styles.socialnetworkheadingContainer}>
                <AppText
                  textTitleStyle={styles.socialnetworkheading}
                  signUpTitle={`Country*`}
                />
              </View>

              <SelectDropdown
                data={filteredCountry}
                search
                searchPlaceHolder='Search...'
                searchPlaceHolderColor={COLORS.BLACK}
                searchInputStyle={styles.searchInput}
                onChangeSearchInputText={handleSearchCountry}
                onSelect={(selectedItem, index) => {
                  setSelectedCountry(selectedItem);
                }}
                buttonStyle={styles.dropdown3BtnStyle}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={styles.dropdown3BtnChildStyle}>
                      <Text style={styles.dropdown3BtnTxt}>
                        {selectedItem ? selectedItem.name : ''}
                      </Text>
                    </View>
                  );
                }}
                renderDropdownIcon={isOpened => {
                  return isOpened ? null : (
                    <Image source={IMAGES.dropdownIcon} style={styles.dropdownIcon} />
                  );
                }}
                dropdownIconPosition={'right'}
                rowStyle={styles.dropdown3RowStyle}
                renderCustomizedRowChild={(item, index) => {
                  return (
                    <View style={styles.dropdown3RowChildStyle}>
                      <Image
                        style={styles.dropdownRowImage}
                      />
                      <Text style={[styles.dropdown3RowTxt]}>{item.name}</Text>
                    </View>
                  );
                }}
              />

            </View>

            {/* STATE DROPDOWN */}

            <View style={[styles.vwphone, styles.countryContainer]}>

              <View style={styles.socialnetworkheadingContainer}>
                <AppText
                  textTitleStyle={styles.socialnetworkheading}
                  signUpTitle={`State / Department*`}
                />
              </View>


              <SelectDropdown
                data={stateData}
                search
                searchPlaceHolder='Search...'
                searchPlaceHolderColor={COLORS.BLACK}
                searchInputStyle={styles.searchInput}
                onSelect={(selectedItem, index) => {
                  setSelectedState(selectedItem);
                }}
                buttonStyle={styles.dropdown3BtnStyle}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={styles.dropdown3BtnChildStyle}>
                      <Text style={styles.dropdown3BtnTxt}>
                        {selectedItem ? selectedItem.name : ''}
                      </Text>
                    </View>
                  );
                }}
                renderDropdownIcon={isOpened => {
                  return isOpened ? (
                    ''
                  ) : (
                    <Image
                      source={IMAGES.dropdownIcon}
                      style={styles.dropdownIcon}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                rowStyle={styles.dropdown3RowStyle}
                renderCustomizedRowChild={(item, index) => {
                  return (
                    <View style={styles.dropdown3RowChildStyle}>
                      <Image
                        //source={item.image}
                        style={styles.dropdownRowImage}
                      />
                      <Text style={styles.dropdown3RowTxt}>{item.name}</Text>
                    </View>
                  );
                }}
              />
            </View>

            {/* CITY DROPDOWN */}

            <View style={[styles.vwphone, styles.countryContainer]}>

              <View style={styles.socialnetworkheadingContainer}>
                <AppText
                  textTitleStyle={styles.socialnetworkheading}
                  signUpTitle={`City*`}
                />
              </View>


              <SelectDropdown
                data={filteredCity}
                search
                searchPlaceHolder='Search...'
                searchPlaceHolderColor={COLORS.BLACK}
                searchInputStyle={styles.searchInput}
                onChangeSearchInputText={handleSearchCity}
                onSelect={(selectedItem, index) => {
                  setSelectedCity(selectedItem);
                  console.log('Selected City Name:', selectedItem?.name);
                  //setCityName(selectedItem.name);
                  console.log('CityName:', selectedItem);
                }}
                buttonStyle={styles.dropdown3BtnStyle}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={styles.dropdown3BtnChildStyle}>
                      <Text style={styles.dropdown3BtnTxt}>
                        {selectedItem ? selectedItem.name : ''}
                      </Text>
                    </View>
                  );
                }}
                renderDropdownIcon={isOpened => {
                  return isOpened ? (
                    ''
                  ) : (
                    <Image
                      source={IMAGES.dropdownIcon}
                      style={styles.dropdownIcon}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                rowStyle={styles.dropdown3RowStyle}
                renderCustomizedRowChild={(item, index) => {
                  return (
                    <View style={styles.dropdown3RowChildStyle}>
                      <Image
                        //source={item.image}
                        style={styles.dropdownRowImage}
                      />
                      <Text style={[styles.dropdown3RowTxt]}>{item.name}</Text>
                    </View>
                  );
                }}
              />
            </View>


            <View style={[styles.vwphone, styles.nameContainer,{marginTop: verticalScale(35),}]}>
              <View
                style={[styles.socialnetworkheadingContainer,{top: verticalScale(0),}]}>
                <AppText
                  textTitleStyle={styles.socialnetworkheading}
                  signUpTitle="ID*"
                  textSubTitleStyle={styles.socialnetworkheadingidd}
                  signUpSubTitle="(Phone No.)"
                />
              </View>
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
                        countryCode={selectCountry}
                        withFlagButton
                        withCallingCodeButton
                        onSelect={onSelect}
                        containerButtonStyle={styles.countrycodeContainer}
                        withCloseButton
                      />
                    </TouchableOpacity>
                  }
                />
                <TextInputWithLabel
                  inputStyle={styles.idContainer}
                  onChangeText={e => setMobile(e)}
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
            </View>

            <View style={[styles.vwphone, styles.nameContainer]}>
              <View
                style={[
                  styles.socialnetworkheadingContainer,
                  styles.socialnetworkid,
                ]}>
                <AppText
                  textTitleStyle={styles.socialnetworkheading}
                  signUpTitle={`Names*`}
                />
              </View>

              <View>
                <TextInputWithLabel
                  inputStyle={styles.inputfield}
                  onChangeText={e => setName(e)}
                />
              </View>
            </View>
            <View style={[styles.vwphone, styles.phoneContainer]}>
              <View
                style={[
                  styles.socialnetworkheadingContainer,
                  styles.socialnetworkid,
                ]}>
                <AppText
                  textTitleStyle={styles.socialnetworkheading}
                  signUpTitle={`Surnames*`}
                />
              </View>

              <View>
                <TextInputWithLabel
                  inputStyle={styles.inputfield}
                  onChangeText={e => setSurname(e)}
                />
              </View>
            </View>
            <View style={[styles.vwphone, styles.mailContainer]}>
              <View
                style={[
                  styles.socialnetworkheadingContainer,
                  styles.socialnetworkid,
                ]}>
                <AppText
                  textTitleStyle={styles.socialnetworkheading}
                  signUpTitle={`Alternate Phone No.`}
                />
              </View>

              <View>
                <TextInputWithLabel
                  inputStyle={styles.inputfield}
                  onChangeText={e => setPhone(e)}
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
            </View>
            <View style={[styles.vwphone, styles.mailContainer]}>
              <View
                style={[
                  styles.socialnetworkheadingContainer,
                  styles.socialnetworkmail,
                ]}>
                <AppText
                  textTitleStyle={styles.socialnetworkheading}
                  signUpTitle={`Mail*`}
                />
              </View>

              <View>
                <TextInputWithLabel
                  inputStyle={styles.inputfield}
                  onChangeText={e => setEmail(e)}
                />
              </View>
            </View>
            <View style={[styles.vwphone, styles.passwordContainer]}>
              <View
                style={[
                  styles.socialnetworkheadingContainer,
                  styles.socialnetworkpass,
                ]}>
                <AppText
                  textTitleStyle={styles.socialnetworkheading}
                  signUpTitle={`Password*`}
                />
              </View>

              <View>
                <TextInputWithLabel
                  inputStyle={styles.inputfield}
                  value={password}
                  onChangeText={e => setPassword(e)}
                  secureTextEntry={isVisible}
                  rightIcon={isVisible ? IMAGES.showEye : IMAGES.hideEye}
                  onPressRight={() => setVisible(!isVisible)}
                />
              </View>
            </View>
            <View style={[styles.vwphone, styles.repeatepasswordContainer]}>
              <View
                style={[
                  styles.socialnetworkheadingContainer,
                  styles.socialnetworkpass,
                ]}>
                <AppText
                  textTitleStyle={styles.socialnetworkheading}
                  signUpTitle={`Repeat password*`}
                />
              </View>

              <View>
                <TextInputWithLabel
                  inputStyle={styles.inputfield}
                  value={repeatpassword}
                  onChangeText={e => setRepeatassword(e)}
                  secureTextEntry={isVisiblee}
                  rightIcon={isVisiblee ? IMAGES.showEye : IMAGES.hideEye}
                  onPressRight={() => setVisiblee(!isVisiblee)}
                />
              </View>
            </View>

{/* Attachments */}

            <View style={[styles.vwphone, styles.firstattachmentextContainer]}>
              <View
                style={[
                  styles.socialnetworkheadingContainer,
                  ,
                  styles.socialnetworkheadingContainerdoc,
                ]}>
                <AppText
                  textTitleStyle={styles.socialnetworkheading}
                  signUpTitle={`Attach identity document`}
                />
                <AppText
                  textTitleStyle={styles.socialnetworkheading}
                  signUpTitle={`(pdf, jpg, png)*`}
                />
              </View>
            </View>

            <View style={[styles.vwphone, styles.parentButtonContainer,
            { marginBottom: verticalScale(20), marginTop: verticalScale(10) },]}>
              <View style={styles.loginbuttonContainer}>
                <AppButton
                  onPress={selectPdf}
                  btnText={'Select File'}
                  btnStyle={styles.loginbutton}
                />
              </View>
              <Text style={styles.uploadFileText}>
                {identity_document?.name}
              </Text>
            </View>

            <View style={[styles.vwphone, styles.secondattachmentextContainer]}>
              <View
                style={[
                  styles.socialnetworkheadingContainer,
                  ,
                  styles.socialnetworkheadingContainerdoc,
                ]}>
                <AppText
                  textTitleStyle={styles.socialnetworkheading}
                  signUpTitle={`Attach passport (pdf, jpg, png)*`}
                />
              </View>
            </View>

            <View style={[styles.vwphone, styles.parentButtonContainerTwo, { marginBottom: verticalScale(20) },]}>
              <View
                style={[
                  styles.loginbuttonContainer,
                ]}>
                <AppButton
                  onPress={selectPdff}
                  btnText={'Select File'}
                  btnStyle={styles.loginbutton}
                />
              </View>
              <Text style={styles.uploadFileText}>{attach_passport?.name}</Text>
            </View>

            <View
              style={[
                styles.vwphone,
                styles.parentButtonContainerThree,
                { marginTop: verticalScale(-20), alignItems: 'flex-start' },
              ]}>
              <AppText
                textTitleStyle={styles.socialnetworkheading}
                signUpTitle={`Attach Work Visa (pdf, jpg, png)*`}
              />
             
            </View>

            <View
              style={[
                styles.vwphone,
                styles.parentButtonContainerFour,
                { marginTop: verticalScale(20) },
              ]}>
              <View style={styles.loginbuttonContainer}>
                <AppButton
                  onPress={selectPdfff}
                  btnText={'Select File'}
                  btnStyle={styles.loginbutton}
                />
              </View>
              <Text style={styles.uploadFileTextTwo}>
                {attach_work_visa?.name}
              </Text>
            </View>

            <View
              style={[
                styles.vwphone,
                styles.parentButtonContainerFive,
                { marginTop: verticalScale(-30), alignItems: 'flex-start' },
              ]}>
              <AppText
                textTitleStyle={styles.socialnetworkheading}
                signUpTitle={`Attach photo (pdf, jpg, png)*`}
              />
            </View>

            <View
              style={[
                styles.vwphone,
                styles.parentButtonContainerSix,
                { marginBottom: verticalScale(20) },
              ]}>
              <View
                style={[
                  styles.loginbuttonContainer,
                  { marginTop: moderateVerticalScale(10) },
                ]}>
                <AppButton
                  onPress={selectImage}
                  btnText={'Select File'}
                  btnStyle={styles.loginbutton}
                />
              </View>
              <Text style={styles.uploadFileText}>{attach_photo?.name}</Text>
            </View>

            <View style={[styles.vwphone, styles.checkboxparentContainer]}>
              <View>
                <CheckBox
                  value={isChecked}
                  onValueChange={handleToggle}
                  tintColors={styles.checkboxColor}
                  style={styles.checkboxchildContainer}
                />
              </View>
              <Text style={styles.checkboxTextOne}>Accept</Text>

              <TouchableOpacity>
                <Text style={styles.checkboxTextTwo}>terms and conditions</Text>
              </TouchableOpacity>
            </View>

            <View
              style={[styles.vwphone, styles.registerbuttonparentContainer]}>
              <View style={styles.registerbuttonContainer}>
                <AppButton
                  //onPress={() => handleRegister()}
                  onPress={() => handleUnlocking()}
                  btnText={'To register'}
                  btnStyle={styles.registerbutton}
                />
              </View>
            </View>

            <View style={[styles.vwphone, styles.footerTextContainer]}>
              <AppText
                onPress={() => navigation.navigate('Login')}
                textTitleStyle={styles.signupTextone}
                textSubTitleStyle={styles.signupTextwo}
                signUpTitle={`Do you already have an account?`}
                signUpSubTitle={'Enter'}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  );
};

export default Signup;

const styles = StyleSheet.create({
  vwphone: {
    height: 67,
    width: 215,
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
  dropdown3BtnStyle: {
    width: '94%',
    padding: 5,
    backgroundColor: COLORS.WHITE,
    marginTop: 15,
    marginHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: COLORS.WHITE,
    //marginBottom: 25,
    elevation: 5,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: 0,
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    //paddingHorizontal: -5,
    borderRadius: 10,
    marginHorizontal: -7,
  },
  dropdown3BtnTxt: {
    color: COLORS.BLACK,
    textAlign: 'center',
    //fontWeight: '600',
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //marginHorizontal: 7,
  },
  dropdown3RowStyle: {
    //backgroundColor: 'rgba(178, 37, 204, 0.05)',
    borderBottomColor: COLORS.WHITE,
    height: 50,
    borderRadius: 10,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 7,
    borderRadius: 10,
    backgroundColor: 'rgba(178, 37, 204, 0.02)',
  },
  dropdown3RowTxt: {
    color: COLORS.BLACK,
    textAlign: 'center',
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    //fontWeight: '600',
  },
  bgContainer: {
    flex: 1,
    flexGrow: 1,
  },
  bg: { bottom: '58%' },
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
    width: 10,
    borderRadius: 10,
  },
  headingText: {
    height: 30,
    width: 100,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 40,
    top: -10,
  },
  scrollContainer: {
    marginTop: '15%',
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  mainContainer: {
    borderRadius: 20,
    paddingBottom: 90,
  },
  countryContainer: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: 25,
    marginBottom: 5,
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 20,
  },
  countryText: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    fontSize: 20,
    marginHorizontal: 15,
    marginVertical: -5,
  },
  vwphone: {
    height: 67,
    width: 215,
    //backgroundColor: COLORS.WHITE,
    bottom: 67,
    left: 135,
  },
  txtin: {
    flexDirection: 'row',
    alignItems: 'center',
    top: '30%',
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    color: 'grey',
  },
  dropdown3BtnStyle: {
    width: '94%',
    padding: 5,
    backgroundColor: COLORS.WHITE,
    marginTop: 15,
    marginHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: COLORS.WHITE,
    //marginBottom: 25,
    elevation: 5,
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    //paddingHorizontal: -5,
    borderRadius: 10,
    marginHorizontal: -7,
  },
  dropdown3BtnTxt: {
    color: 'black',
    textAlign: 'center',
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    marginHorizontal: 20,
  },
  dropdown3RowStyle: {
    //backgroundColor: 'rgba(178, 37, 204, 0.05)',
    borderBottomColor: COLORS.WHITE,
    height: 50,
    borderRadius: 10,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 7,
    borderRadius: 10,
    backgroundColor: 'rgba(178, 37, 204, 0.02)',
  },
  dropdown3RowTxt: {
    color: 'black',
    textAlign: 'center',
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    marginHorizontal: 15,
  },
  dropdownIcon: {
    height: 10,
    width: 10,
    marginHorizontal: verticalScale(15),
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
    //elevation: 10,
  },

  idText: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
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
    top: 20,
  },
  nameText: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    fontSize: 20,
    marginHorizontal: 15,
    marginVertical: -10,
  },
  surnameContainer: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    fontSize: 20,
    marginHorizontal: 15,
    marginVertical: -10,
  },
  phoneContainer: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: 20,
    marginBottom: 5,
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 30,
  },
  phoneText: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
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
    marginBottom: 15,
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 30,
  },
  mailText: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    fontSize: 20,
    marginHorizontal: 15,
    marginVertical: -10,
  },
  passwordContainer: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: 35,
    marginBottom: 5,
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 25,
  },
  repeatepasswordContainer: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: 25,
    marginBottom: 7,
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 30,
  },
  passwordText: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    fontSize: 20,
    marginHorizontal: 15,
    marginVertical: -10,
  },
  passIconContainer: { bottom: 58, left: 290 },
  passIcon: {
    height: 20,
    width: 20,
    //marginLeft: 5,
    marginHorizontal: verticalScale(5),
  },
  firstattachmentextContainer: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: verticalScale(-10),
    marginBottom: 5,
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 30,
  },
  secondattachmentextContainer: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: verticalScale(-20),
    marginBottom: 5,
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 30,
  },
  firstattachmentext: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    fontSize: 19,
    marginHorizontal: 15,
    marginVertical: -10,
    //width: 335
  },
  secondattachmentext: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    fontSize: 19,
    marginHorizontal: 15,
    marginVertical: 5,
    //width: 335
  },
  parentButtonContainer: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: 5,
    marginBottom: verticalScale(10),
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 20,
  },
  parentButtonContainerTwo: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: verticalScale(0),
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 22,
  },
  parentButtonContainerThree: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: verticalScale(0),
    marginBottom: 5,
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 25,
  },
  parentButtonContainerFour: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: 2,
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 16,
    marginBottom: verticalScale(5),
  },
  parentButtonContainerFive: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: verticalScale(-25),
    marginBottom: 5,
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 30,
  },
  parentButtonContainerSix: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: 2,
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 18,
  },
  childButtonContainer: {
    width: 150,
    alignSelf: 'center',
    height: 50,
    //backgroundColor: '#F57F17',
    backgroundColor: COLORS.ORANGE,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 15,
    elevation: 0,
  },
  childButtonContainerTwo: {
    width: 150,
    alignSelf: 'center',
    height: 50,
    //backgroundColor: '#F57F17',
    backgroundColor: COLORS.ORANGE,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: -2,
    elevation: 0,
  },
  buttonText: {
    fontSize: 19,
    color: COLORS.WHITE,
    fontFamily: FONTS.MONTSERRAT_BOLD,
  },
  uploadFileText: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    fontSize: 13,
    //marginHorizontal: 15,
    marginTop: moderateScale(5),
    //width: 335,
    alignSelf: 'center',
  },
  uploadFileTextTwo: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    fontSize: 13,
    //marginHorizontal: 15,
    marginTop: 5,
    //width: 335,
    alignSelf: 'center',
  },
  checkboxparentContainer: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: verticalScale(-30),
    marginBottom: 5,
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkboxchildContainer: {
    borderWidth: 1,
    borderRadius: 5,
    width: 30,
    height: 30,
    elevation: 8,
    top: 1,
    left: 5,
  },
  checkboxColor: {
    true: 'green',
    false: COLORS.GREYDARK,
    //false: COLORS.GREY,
  },
  checkboxTextOne: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    fontSize: scale(16),
    marginHorizontal: 15,
    marginVertical: -10,
    //width: 335
  },
  checkboxTextTwo: {
    //color: '#FF7F00',
    color: COLORS.ORANGE,
    fontFamily: FONTS.MONTSERRAT_SEMI_BOLD,
    fontSize: scale(16),
    marginHorizontal: -9,
    marginVertical: -10,
    //width: 335
  },
  registerbuttonparentContainer: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: 5,
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 30,
  },
  registerbuttonchildContainer: {
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
  registerButtonText: {
    fontSize: 19,
    color: COLORS.WHITE,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
  },
  footerTextContainer: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -265,
    marginTop: -10,
    marginBottom: -30,
    backgroundColor: 'transparent',
    zIndex: 1,
    top: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  footerTextOne: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    fontSize: 18,
    marginHorizontal: 0,
    marginVertical: -10,
    //width: 335
  },
  footerTexTwo: {
    //color: '#FF7F00',
    color: COLORS.ORANGE,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    fontSize: 18,
    marginHorizontal: 0,
    marginVertical: -10,
    //width: 335
  },
  socialnetworkheadingContainer: {
    alignItems: 'flex-start',
    top: verticalScale(0),
  },
  socialnetworkheadingContainerdoc: { marginTop: verticalScale(-30) },
  socialnetworkheading: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    fontSize: scale(18),
    marginHorizontal: moderateScale(15),
    top: verticalScale(5),
  },
  socialnetworkheadingid: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    fontSize: scale(18),
    marginHorizontal: moderateScale(15),
    top: verticalScale(0),
  },
  socialnetworkheadingidd: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    fontSize: scale(13),
    marginHorizontal: moderateScale(-18),
    top: verticalScale(8)
  },
  socialnetworkid: { marginTop: verticalScale(-15) },
  socialnetworkmail: { marginTop: verticalScale(-40) },
  socialnetworkpass: { marginTop: verticalScale(-60) },
  inputfield: {
    width: moderateScale(315),
    height: moderateScale(50),
    backgroundColor: COLORS.WHITE,
    borderRadius: moderateScale(10),
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
    marginTop: verticalScale(15),
  },
  inputfieldforid: {
    width: moderateScale(177),
    height: moderateScale(50),
    backgroundColor: COLORS.WHITE,
    borderRadius: moderateScale(10),
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
    marginTop: verticalScale(15),
    marginLeft: moderateScale(135),
    top: verticalScale(-78),
  },
  loginbuttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateVerticalScale(-15),
  },
  loginbutton: {
    borderRadius: moderateScale(10),
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    width: moderateScale(150),
  },
  registerbuttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateVerticalScale(-15),
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 10,
  },
  registerbutton: {
    borderRadius: moderateScale(10),
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    width: moderateScale(310),
  },
  signupTextone: {
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    fontSize: 18,
  },
  signupTextwo: {
    color: COLORS.ORANGE,
    fontFamily: FONTS.MONTSERRAT_SEMI_BOLD,
    fontSize: 18,
  },
  countryparentContainer: {
    flexDirection: 'row',
    elevation: 0
  },
  countrychildContainer: {
    width: moderateScale(85),
    marginLeft: moderateScale(10),
    alignSelf: 'center',
    elevation: 0
  },
  countrycodeContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    elevation: 0
  },
});
