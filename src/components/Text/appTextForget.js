import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { FONTS } from '../../constants/fonts';
import { COLORS } from '../../constants/colors';

const AppTextForget = ({ title, onPress, textForgetTitleStyle, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text style={{ ...styles.textForgetTitleStyle, ...textForgetTitleStyle }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  textForgetTitleStyle: {
    fontSize: scale(12),
    color: COLORS.WHITE,
    fontFamily: FONTS.MONTSERRAT_SEMI_BOLD,
  },
});

export default AppTextForget;
