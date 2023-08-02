import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';

const TextInputWithLabel = ({
  label,
  placeHolder,
  placeholderTextColor,
  inputStyle = {},
  rightIcon,
  value,
  onChangeText,
  onPressRight,
  keyboardType,
  maxLength,
  editable,
  ...props
}) => {
  return (
    <View style={{ ...styles.inputStyle, ...inputStyle }}>
      <Text style={styles.labelTextStyle}>{label}</Text>
      <View style={styles.flexView}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholder={placeHolder}
          placeholderTextColor={placeholderTextColor}
          maxLength={maxLength}
          style={styles.inlineStyle}
          editable={editable}
          autoComplete="off"
          {...props}
        />
        {!!rightIcon ? (
          <TouchableOpacity activeOpacity={0.8} onPress={onPressRight}>
            <Image style={styles.rightIcon} source={rightIcon} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    alignSelf: 'center',
    borderRadius: moderateScale(4),
    backgroundColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    color: COLORS.GREY,
  },
  inlineStyle: {
    paddingVertical: moderateVerticalScale(8),
    fontSize: scale(16),
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    marginStart: moderateScale(10),
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    fontSize: scale(12),
    bottom: moderateVerticalScale(15),
    color: COLORS.BLACK,
  },
  labelTextStyle: {
    fontSize: scale(14),
  },
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightIcon: {
    tintColor: COLORS.BLACK,
    bottom: moderateScale(18),
    width: moderateScale(20),
    height: moderateScale(20),
    marginEnd: moderateScale(18),
  },
});

export default TextInputWithLabel;
