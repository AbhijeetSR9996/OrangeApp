import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants/colors';
import {FONTS} from '../../constants/fonts';
import {scale} from 'react-native-size-matters';

const AppText = ({
  signUpTitle,
  signUpSubTitle,
  textTitleStyle,
  textSubTitleStyle,
  disabled,
  onPress,
}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <Text style={{...styles.textTitleStyle, ...textTitleStyle}}>
        {signUpTitle}
      </Text>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Text style={{...styles.textSubTitleStyle, ...textSubTitleStyle}}>
          {''} {signUpSubTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textTitleStyle: {
    color: COLORS.WHITE,
    fontFamily: FONTS.MONTSERRAT_SEMI_BOLD,
    fontSize: scale(13),
  },
  textSubTitleStyle: {
    color: COLORS.WHITE,
    fontFamily: FONTS.MONTSERRAT_BOLD,
    fontSize: scale(13),
  },
});

export default AppText;
