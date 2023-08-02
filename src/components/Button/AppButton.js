import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';

const AppButton = ({ btnText, btnStyle, onPress, img, btnTextStyle }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{ ...styles.btnStyle, ...btnStyle }}>
      {!!img ? (
        <Image style={{ tintColor: COLORS.WHITE }} source={img} />
      ) : (
        <Text style={{ ...styles.btnTextStyle, ...btnTextStyle }}>{btnText}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    height: moderateScale(48),
    backgroundColor: COLORS.ORANGE,
    borderRadius: moderateScale(4),
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(310),
  },
  btnTextStyle: {
    fontSize: scale(12),
    color: COLORS.WHITE,
    fontSize: scale(16),
    fontFamily: FONTS.MONTSERRAT_SEMI_BOLD,
  },
});

export default AppButton;


