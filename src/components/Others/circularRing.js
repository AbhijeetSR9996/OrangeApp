import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { moderateScale } from 'react-native-size-matters';
import { IMAGES } from '../../constants/images';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';

const CircularRing = () => {
  return (
    <View style={styles.container}>
      <CircularProgress
        //initialValue={10}
        value={50}
        radius={75}
        inActiveStrokeOpacity={0.1}
        activeStrokeWidth={10}
        inActiveStrokeWidth={10}
        activeStrokeColor={COLORS.ORANGE}
        progressValueColor={COLORS.WHITELIGHT}
        progressValueStyle={styles.progressVal}
        maxValue={100}
        valuePrefix={'Profile '}
        valuePrefixStyle={styles.valPrefix}
        valueSuffix={'%'}
        valueSuffixStyle={styles.valSuffix}
        title={'complete'}
        titleColor={COLORS.WHITELIGHT}
        titleStyle={styles.titleStyle}
        progressValueFontSize={20}
      />
      <Image style={styles.imageStyle} source={IMAGES.dummyDp} />
    </View>
  );
};

export default CircularRing;

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    marginBottom: '-10%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  progressVal: {
    fontSize: 19,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    top: '85%',
    right: '130%',
  },
  valPrefix: {
    color: COLORS.WHITELIGHT,
    fontSize: 19,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    top: '85%',
    right: '130%',
  },
  valSuffix: {
    color: COLORS.WHITELIGHT,
    fontSize: 19,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    top: '85%',
    right: '130%',
  },
  titleStyle: {
    fontSize: 19,
    color: COLORS.WHITELIGHT,
    fontFamily: FONTS.MONTSERRAT_REGULAR,
    top: '64%',
    //left: '49%',
    marginLeft: moderateScale(140),
  },
  imageStyle: {
    flex: 1,
    height: 120,
    width: 120,
    alignItems: 'center',
    borderRadius: 70,
    bottom: '50%',
  },
});
