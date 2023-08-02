import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from 'react-native-size-matters';

import { COLORS } from '../../constants/colors';
import { IMAGES } from '../../constants/images';

export default function splashScreen() {
  return (
    <LinearGradient
      colors={[COLORS.ORANGEDARK, COLORS.ORANGELIGHT]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>
      <TouchableOpacity style={styles.textContainer}>
        <Image
          resizeMode="center"
          source={IMAGES.appText}
          style={styles.appTextStyle}
        />
      </TouchableOpacity>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTextStyle: {
    height: moderateScale(25),
    width: moderateScale(220),
  },
});